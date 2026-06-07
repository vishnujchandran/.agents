#!/usr/bin/env node
/*
  WebShield v2 - Web App Security Skill Scanner
  Focus: Next.js + Supabase
*/

const fs = require('fs');
const path = require('path');

const VERSION = '2.0.0';
const SEVERITY_ORDER = { low: 1, medium: 2, high: 3, critical: 4 };

const DEFAULT_IGNORE_DIRS = new Set([
  '.git', '.next', 'node_modules', 'dist', 'build', 'coverage', '.turbo', '.vercel', 'out'
]);

const TEXT_EXTENSIONS = new Set([
  '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.json', '.md', '.yml', '.yaml',
  '.env', '.sql', '.txt', '.toml', '.ini'
]);

const AUTH_GUARD_PATTERNS = [
  /auth\.getUser\s*\(/,
  /getUser\s*\(/,
  /getSession\s*\(/,
  /createServerClient\s*\(/,
  /requireAuth\s*\(/,
  /verifySession\s*\(/,
  /verifyJwt\s*\(/,
  /next-auth/i,
  /clerk/i
];

const WEBHOOK_VERIFY_PATTERNS = [
  /x-signature/i,
  /svix/i,
  /webhookSecret/i,
  /timingSafeEqual\s*\(/,
  /verify\s*\(/,
  /crypto\./i
];

const rules = [
  {
    id: 'WS-001',
    title: 'Hardcoded sensitive keys or tokens',
    severity: 'critical',
    category: 'Secrets Management',
    appliesTo: ['all'],
    regex: /(SUPABASE_SERVICE_ROLE_KEY|SUPABASE_SECRET|SERVICE_ROLE_KEY|JWT_SECRET|PRIVATE_KEY|OPENAI_API_KEY|ANTHROPIC_API_KEY)\s*[=:]\s*['\"][^'\"]{10,}['\"]/g,
    remediation: 'Move secrets to secure environment variables. Never commit secrets in source files.',
    fixSnippet: 'Use process.env.* and inject secrets only via environment/secret manager.'
  },
  {
    id: 'WS-017',
    title: 'Potential secret exposed via NEXT_PUBLIC_* environment variable',
    severity: 'critical',
    category: 'Secrets Management',
    appliesTo: ['nextjs'],
    regex: /NEXT_PUBLIC_[A-Z0-9_]*(SECRET|TOKEN|PRIVATE|SERVICE_ROLE|PASSWORD)[A-Z0-9_]*/g,
    remediation: 'Do not expose sensitive values via NEXT_PUBLIC_ vars. Keep secrets server-side only.',
    fixSnippet: 'Rename to server-only env var and access only in server runtime code.'
  },
  {
    id: 'WS-002',
    title: 'Service role key referenced in client/browser code',
    severity: 'critical',
    category: 'Supabase AuthZ',
    appliesTo: ['nextjs', 'supabase'],
    regex: /(NEXT_PUBLIC_)?SUPABASE_SERVICE_ROLE_KEY|service_role/g,
    filePathRegex: /(app\/|pages\/|components\/|src\/components\/|src\/app\/)/,
    remediation: 'Service role key must only be used in trusted server-side contexts. Use anon key in browser code.',
    fixSnippet: 'Use NEXT_PUBLIC_SUPABASE_ANON_KEY in browser code and keep service role key only on server/edge protected paths.'
  },
  {
    id: 'WS-003',
    title: 'Use of dangerouslySetInnerHTML (potential XSS)',
    severity: 'high',
    category: 'XSS',
    appliesTo: ['nextjs'],
    regex: /dangerouslySetInnerHTML\s*=\s*\{\s*\{\s*__html\s*:/g,
    remediation: 'Avoid raw HTML rendering. If needed, sanitize input with a strict allowlist sanitizer before rendering.',
    fixSnippet: 'Prefer rendering safe markdown/components. If unavoidable, sanitize with DOMPurify (server-safe setup) and strict allowlist.'
  },
  {
    id: 'WS-004',
    title: 'Dynamic code execution pattern (eval/new Function)',
    severity: 'high',
    category: 'Code Injection',
    appliesTo: ['all'],
    regex: /\beval\s*\(|\bnew\s+Function\s*\(/g,
    remediation: 'Remove dynamic code execution and use safe parsing or explicit function maps.',
    fixSnippet: 'Replace eval/new Function with structured parser or map of allowed operations.'
  },
  {
    id: 'WS-005',
    title: 'Potential SSRF sink from user-controlled URL',
    severity: 'high',
    category: 'SSRF',
    appliesTo: ['nextjs'],
    regex: /fetch\s*\(\s*(req\.|request\.|params\.|searchParams\.|body\.|input\.|url\.)/g,
    remediation: 'Validate URL against strict allowlist and deny internal/private addresses before outbound requests.',
    fixSnippet: 'Parse URL, verify protocol+hostname against allowlist, and block localhost/private IP ranges.'
  },
  {
    id: 'WS-006',
    title: 'Potential open redirect from untrusted input',
    severity: 'high',
    category: 'Access Control',
    appliesTo: ['nextjs'],
    regex: /(redirect\(|NextResponse\.redirect\(|router\.push\()\s*(req\.|request\.|searchParams\.|params\.|url\.|query\.)/g,
    remediation: 'Use allowlisted redirect destinations or signed return URLs.',
    fixSnippet: 'Allow only same-origin relative paths or allowlisted domains for redirects.'
  },
  {
    id: 'WS-007',
    title: 'Upload handler may miss content-type/size validation',
    severity: 'medium',
    category: 'File Upload',
    appliesTo: ['nextjs'],
    regex: /(formData\(\)|request\.formData\(\)|req\.files|multipart\/form-data)/g,
    remediation: 'Add strict MIME type, extension, size limits, and malware scanning where applicable.',
    fixSnippet: 'Validate MIME+extension, max bytes, and generate random server-side filenames.'
  },
  {
    id: 'WS-010',
    title: 'Raw SQL execution pattern',
    severity: 'high',
    category: 'Injection',
    appliesTo: ['supabase'],
    regex: /(\.query\s*\(|\$queryRawUnsafe\s*\(|execute\s*\(\s*`|query\s*\(\s*`)/g,
    remediation: 'Use parameterized queries and avoid unsafe/raw query APIs with user-controlled input.',
    fixSnippet: 'Switch to parameterized query API and never concatenate user input into SQL.'
  }
];

function parseArgs(argv) {
  const args = {
    path: '.',
    format: 'both', // md | json | both | sarif | all
    out: 'security-report',
    failOn: 'critical',
    include: '',
    exclude: '',
    ignoreFile: '.webshield-ignore'
  };

  for (let i = 2; i < argv.length; i += 1) {
    const cur = argv[i];
    const next = argv[i + 1];

    if (cur === '--path' && next) { args.path = next; i++; }
    else if (cur === '--format' && next) { args.format = next.toLowerCase(); i++; }
    else if (cur === '--out' && next) { args.out = next; i++; }
    else if (cur === '--fail-on' && next) { args.failOn = next.toLowerCase(); i++; }
    else if (cur === '--include' && next) { args.include = next.toLowerCase(); i++; }
    else if (cur === '--exclude' && next) { args.exclude = next.toLowerCase(); i++; }
    else if (cur === '--ignore-file' && next) { args.ignoreFile = next; i++; }
    else if (cur === '--help' || cur === '-h') {
      printHelp();
      process.exit(0);
    }
  }

  if (!SEVERITY_ORDER[args.failOn]) {
    console.error(`Invalid --fail-on value: ${args.failOn}`);
    process.exit(2);
  }

  if (!['md', 'json', 'both', 'sarif', 'all'].includes(args.format)) {
    console.error(`Invalid --format value: ${args.format}`);
    process.exit(2);
  }

  return args;
}

function printHelp() {
  console.log(`\nWebShield v2 - CLI\n\nUsage:\n  webshield --path . --format all --out security-report --fail-on high\n  node ./bin/webapp-sec-scan.js --path . --format all --out ./security-report --fail-on high\n\nOptions:\n  --path <dir>            Target project root (default: .)\n  --format <type>         md | json | both | sarif | all (default: both)\n  --out <filePrefix>      Output file path/prefix (default: security-report)\n  --fail-on <sev>         low | medium | high | critical (default: critical)\n  --include <tag>         Force include tags: nextjs|supabase\n  --exclude <tag>         Exclude tags: nextjs|supabase\n  --ignore-file <file>    Suppression file path relative to scan root (default: .webshield-ignore)\n`);
}

function isTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (TEXT_EXTENSIONS.has(ext)) return true;
  const base = path.basename(filePath).toLowerCase();
  return base.startsWith('.env');
}

function walk(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (DEFAULT_IGNORE_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(full, list);
    } else if (e.isFile() && isTextFile(full)) {
      if (/^security-report\.(md|json|sarif)$/.test(e.name)) continue;
      list.push(full);
    }
  }
  return list;
}

function detectStack(root, files) {
  const tags = new Set();
  const pkgPath = path.join(root, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
      if (deps.next) tags.add('nextjs');
      if (deps['@supabase/supabase-js'] || deps['@supabase/ssr']) tags.add('supabase');
    } catch (_) {}
  }

  for (const f of files) {
    const rel = f.replace(root + path.sep, '');
    if (/next\.config\.(js|mjs|ts)/.test(rel) || /middleware\.(js|ts)/.test(rel) || /^app\//.test(rel) || /^pages\//.test(rel)) tags.add('nextjs');
    if (/supabase|\bsql\b|migration/i.test(rel)) tags.add('supabase');
  }

  tags.add('all');
  return tags;
}

function lineNumberAt(content, idx) {
  return content.slice(0, idx).split('\n').length;
}

function readIgnoreRules(root, ignoreFile) {
  const p = path.join(root, ignoreFile);
  if (!fs.existsSync(p)) return [];
  const rows = fs.readFileSync(p, 'utf8').split('\n').map(s => s.trim()).filter(Boolean).filter(s => !s.startsWith('#'));

  // formats:
  // WS-003
  // WS-003|src/legacy/
  return rows.map(r => {
    const [id, pathHint] = r.split('|').map(s => (s || '').trim());
    return { id, pathHint };
  });
}

function isSuppressed(finding, suppressions) {
  return suppressions.some(s => {
    if (s.id !== finding.id) return false;
    if (!s.pathHint) return true;
    return finding.file.includes(s.pathHint);
  });
}

function checkNextConfigHeaders(root) {
  const candidates = ['next.config.js', 'next.config.mjs', 'next.config.ts'];
  for (const c of candidates) {
    const p = path.join(root, c);
    if (!fs.existsSync(p)) continue;
    const content = fs.readFileSync(p, 'utf8');
    const hasHeadersFn = /headers\s*:\s*async\s*\(/.test(content) || /async\s+headers\s*\(/.test(content);
    const hasAnyHeaderKeyword = /(Content-Security-Policy|X-Frame-Options|Strict-Transport-Security|X-Content-Type-Options|Referrer-Policy)/i.test(content);
    return !(hasHeadersFn && hasAnyHeaderKeyword);
  }
  return true;
}

function routeFileKind(relPath) {
  if (/^app\/api\/.+\/route\.(ts|js)$/.test(relPath)) return 'app-router';
  if (/^pages\/api\/.+\.(ts|js)$/.test(relPath)) return 'pages-router';
  return null;
}

function parseHandlers(content) {
  const methods = [];
  const m1 = content.matchAll(/export\s+async\s+function\s+(GET|POST|PUT|PATCH|DELETE)\s*\(/g);
  for (const m of m1) methods.push(m[1]);

  const m2 = content.matchAll(/\b(GET|POST|PUT|PATCH|DELETE)\s*:\s*async\s*\(/g);
  for (const m of m2) methods.push(m[1]);

  return Array.from(new Set(methods));
}

function hasAuthGuard(content) {
  return AUTH_GUARD_PATTERNS.some(r => r.test(content));
}

function hasWebhookVerify(content) {
  return WEBHOOK_VERIFY_PATTERNS.some(r => r.test(content));
}

function hasZodValidation(content) {
  return /from\s+['\"]zod['\"]|\.safeParse\s*\(|\.parse\s*\(/.test(content);
}

function analyzeRouteAuthMatrix(root, files) {
  const matrix = [];

  for (const fp of files) {
    const rel = path.relative(root, fp);
    const kind = routeFileKind(rel);
    if (!kind) continue;

    const content = fs.readFileSync(fp, 'utf8');
    const methods = parseHandlers(content);
    if (!methods.length) continue;

    const auth = hasAuthGuard(content);
    const webhookLike = /webhook|hooks/i.test(rel);
    const webhookVerified = webhookLike ? hasWebhookVerify(content) : true;
    const hasBodyParse = /request\.json\s*\(|req\.body|formData\s*\(|request\.formData\s*\(/.test(content);
    const zodValidationDetected = hasBodyParse ? hasZodValidation(content) : true;

    matrix.push({
      file: rel,
      kind,
      methods,
      mutatingMethods: methods.filter(m => ['POST', 'PUT', 'PATCH', 'DELETE'].includes(m)),
      authGuardDetected: auth,
      webhookLike,
      webhookVerified,
      zodValidationDetected
    });
  }

  return matrix;
}

function analyzeSupabaseRLS(root, files) {
  const sqlFiles = files.filter(f => path.extname(f).toLowerCase() === '.sql');
  const tables = new Map();

  for (const fp of sqlFiles) {
    const rel = path.relative(root, fp);
    const content = fs.readFileSync(fp, 'utf8');

    const createMatches = Array.from(content.matchAll(/create\s+table\s+(if\s+not\s+exists\s+)?([a-zA-Z0-9_.\"]+)/gi));
    for (const m of createMatches) {
      const raw = (m[2] || '').replace(/"/g, '');
      const table = raw.includes('.') ? raw.split('.').pop() : raw;
      if (!table) continue;

      if (!tables.has(table)) {
        tables.set(table, {
          table,
          createdIn: rel,
          rlsEnabled: false,
          policiesDetected: 0
        });
      }

      const entry = tables.get(table);
      if (new RegExp(`alter\\s+table\\s+([a-zA-Z0-9_.\"]+\\.)?${table}\\s+enable\\s+row\\s+level\\s+security`, 'i').test(content)) {
        entry.rlsEnabled = true;
      }

      const policyMatches = Array.from(content.matchAll(new RegExp(`create\\s+policy\\s+.+\\s+on\\s+([a-zA-Z0-9_.\"]+\\.)?${table}`, 'gi')));
      entry.policiesDetected += policyMatches.length;
    }
  }

  return Array.from(tables.values());
}

function runScan(args) {
  const root = path.resolve(args.path);
  if (!fs.existsSync(root)) throw new Error(`Path does not exist: ${root}`);

  const files = walk(root);
  const stackTags = detectStack(root, files);

  if (args.include) args.include.split(',').map(s => s.trim()).filter(Boolean).forEach(s => stackTags.add(s));
  if (args.exclude) args.exclude.split(',').map(s => s.trim()).filter(Boolean).forEach(s => stackTags.delete(s));

  const suppressions = readIgnoreRules(root, args.ignoreFile);
  const findings = [];

  // v2: package/deployment posture checks (pnpm + vercel)
  const pkgPath = path.join(root, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      const packageManager = String(pkg.packageManager || '');
      if (packageManager.startsWith('pnpm') && !fs.existsSync(path.join(root, 'pnpm-lock.yaml'))) {
        const f = {
          id: 'WS-018',
          title: 'packageManager is pnpm but pnpm-lock.yaml is missing',
          severity: 'medium',
          category: 'Supply Chain',
          file: 'package.json',
          line: 1,
          snippet: `packageManager=${packageManager}`,
          remediation: 'Commit pnpm-lock.yaml to ensure deterministic and auditable dependency builds.',
          fixSnippet: 'Run pnpm install and commit pnpm-lock.yaml.'
        };
        if (!isSuppressed(f, suppressions)) findings.push(f);
      }

      const hasVercel = (pkg.dependencies && pkg.dependencies['next']) || fs.existsSync(path.join(root, 'vercel.json'));
      if (hasVercel && !fs.existsSync(path.join(root, '.env.example'))) {
        const f = {
          id: 'WS-019',
          title: 'Vercel project appears to miss .env.example baseline',
          severity: 'low',
          category: 'Configuration Hygiene',
          file: '.',
          line: 1,
          snippet: 'No .env.example found',
          remediation: 'Keep non-secret environment variable contract in .env.example for safer deployments.',
          fixSnippet: 'Add .env.example with required keys only (no secrets).'
        };
        if (!isSuppressed(f, suppressions)) findings.push(f);
      }
    } catch (_) {}
  }

  // v2: React Hook Form + Zod posture checks
  for (const filePath of files) {
    const relPath = path.relative(root, filePath);
    if (!/\.(tsx|ts|jsx|js)$/.test(relPath)) continue;

    const content = fs.readFileSync(filePath, 'utf8');
    const usesRHF = /from\s+['\"]react-hook-form['\"]|useForm\s*\(/.test(content);
    const hasResolverField = /resolver\s*:\s*zodResolver\s*\(/.test(content);
    const importsZodResolver = /from\s+['\"]@hookform\/resolvers\/zod['\"]|zodResolver\s*\(/.test(content);

    if (usesRHF && !(hasResolverField || importsZodResolver)) {
      const f = {
        id: 'WS-020',
        title: 'React Hook Form detected without obvious Zod resolver',
        severity: 'medium',
        category: 'Input Validation',
        file: relPath,
        line: 1,
        snippet: 'useForm(...) found without zodResolver',
        remediation: 'Use Zod schema-based validation for form input before submission.',
        fixSnippet: 'const form = useForm({ resolver: zodResolver(schema) })'
      };
      if (!isSuppressed(f, suppressions)) findings.push(f);
    }
  }

  for (const filePath of files) {
    const relPath = path.relative(root, filePath);
    const content = fs.readFileSync(filePath, 'utf8');

    for (const rule of rules) {
      const applicable = rule.appliesTo.some(tag => stackTags.has(tag));
      if (!applicable) continue;
      if (rule.filePathRegex && !rule.filePathRegex.test(relPath)) continue;

      const regex = new RegExp(rule.regex.source, rule.regex.flags);
      let match;
      while ((match = regex.exec(content)) !== null) {
        const finding = {
          id: rule.id,
          title: rule.title,
          severity: rule.severity,
          category: rule.category,
          file: relPath,
          line: lineNumberAt(content, match.index),
          snippet: (match[0] || '').slice(0, 180),
          remediation: rule.remediation,
          fixSnippet: rule.fixSnippet || ''
        };

        if (isSuppressed(finding, suppressions)) continue;
        findings.push(finding);
      }
    }
  }

  // v2: Route auth matrix + derived findings
  const routeAuthMatrix = analyzeRouteAuthMatrix(root, files);
  for (const route of routeAuthMatrix) {
    if (route.mutatingMethods.length && !route.authGuardDetected) {
      const f = {
        id: 'WS-008',
        title: 'API route with mutating method lacks obvious auth/session guard',
        severity: 'high',
        category: 'Authentication',
        file: route.file,
        line: 1,
        snippet: `${route.mutatingMethods.join(', ')} handler(s) detected; no obvious auth guard pattern`,
        remediation: 'Enforce authentication + authorization checks on every mutating API route.',
        fixSnippet: 'Add server-side user/session check at handler start and verify ownership/role before mutation.'
      };
      if (!isSuppressed(f, suppressions)) findings.push(f);
    }

    if (route.webhookLike && !route.webhookVerified) {
      const f = {
        id: 'WS-009',
        title: 'Webhook-like endpoint without obvious signature verification',
        severity: 'high',
        category: 'Integrity',
        file: route.file,
        line: 1,
        snippet: 'Webhook-like route detected; no signature verification pattern found',
        remediation: 'Verify webhook signatures with constant-time comparison before processing payload.',
        fixSnippet: 'Read raw body, compute expected HMAC, and compare with header signature using timingSafeEqual.'
      };
      if (!isSuppressed(f, suppressions)) findings.push(f);
    }

    if (route.mutatingMethods.length && !route.zodValidationDetected) {
      const f = {
        id: 'WS-014',
        title: 'Mutating API route appears to parse input without Zod validation',
        severity: 'medium',
        category: 'Input Validation',
        file: route.file,
        line: 1,
        snippet: `${route.mutatingMethods.join(', ')} handler(s) parse input; no obvious zod parse/safeParse pattern`,
        remediation: 'Validate request payloads with Zod (or equivalent) before business logic/database writes.',
        fixSnippet: 'Define schema, run schema.safeParse(payload), return 400 on invalid input, then continue.'
      };
      if (!isSuppressed(f, suppressions)) findings.push(f);
    }
  }

  // v2: Next.js security headers check
  if (stackTags.has('nextjs') && checkNextConfigHeaders(root)) {
    const f = {
      id: 'WS-011',
      title: 'Missing robust Next.js security headers configuration',
      severity: 'medium',
      category: 'Security Headers',
      file: 'next.config.*',
      line: 1,
      snippet: 'No robust headers() configuration detected',
      remediation: 'Add strict security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).',
      fixSnippet: 'Define async headers() in next.config and set baseline hardening headers for all routes.'
    };
    if (!isSuppressed(f, suppressions)) findings.push(f);
  }

  // v2: Supabase Storage usage checks
  for (const filePath of files) {
    const relPath = path.relative(root, filePath);
    const content = fs.readFileSync(filePath, 'utf8');

    if (/storage\.from\s*\([^)]*\)\.upload\s*\(/.test(content) && /upsert\s*:\s*true/.test(content)) {
      const f = {
        id: 'WS-015',
        title: 'Supabase Storage upload uses upsert:true (overwrite risk)',
        severity: 'medium',
        category: 'Storage Security',
        file: relPath,
        line: 1,
        snippet: 'storage.from(...).upload(..., { upsert: true })',
        remediation: 'Avoid blind overwrite unless explicitly required and authorized.',
        fixSnippet: 'Use unique object keys and keep upsert:false by default for user uploads.'
      };
      if (!isSuppressed(f, suppressions)) findings.push(f);
    }

    if (/getPublicUrl\s*\(/.test(content)) {
      const f = {
        id: 'WS-016',
        title: 'Supabase public URL usage detected (verify bucket data sensitivity)',
        severity: 'low',
        category: 'Storage Security',
        file: relPath,
        line: 1,
        snippet: 'storage.from(...).getPublicUrl(...)',
        remediation: 'Ensure public buckets do not contain sensitive/private data. Use signed URLs for protected content.',
        fixSnippet: 'Use createSignedUrl for private assets and enforce access checks in server routes.'
      };
      if (!isSuppressed(f, suppressions)) findings.push(f);
    }
  }

  // v2: Supabase RLS deep checks
  const rlsMatrix = analyzeSupabaseRLS(root, files);
  for (const row of rlsMatrix) {
    if (!row.rlsEnabled) {
      const f = {
        id: 'WS-012',
        title: `Supabase table '${row.table}' appears without RLS enablement`,
        severity: 'high',
        category: 'Authorization',
        file: row.createdIn,
        line: 1,
        snippet: `create table ${row.table}`,
        remediation: 'Enable RLS on user-facing tables and add explicit policies.',
        fixSnippet: `ALTER TABLE ${row.table} ENABLE ROW LEVEL SECURITY;\nCREATE POLICY "allow_own_rows" ON ${row.table} FOR SELECT USING (auth.uid() = user_id);`
      };
      if (!isSuppressed(f, suppressions)) findings.push(f);
    } else if (row.policiesDetected === 0) {
      const f = {
        id: 'WS-013',
        title: `Supabase table '${row.table}' has RLS enabled but no policies detected`,
        severity: 'medium',
        category: 'Authorization',
        file: row.createdIn,
        line: 1,
        snippet: `RLS enabled, policies=0 for ${row.table}`,
        remediation: 'Create explicit least-privilege SELECT/INSERT/UPDATE/DELETE policies.',
        fixSnippet: `CREATE POLICY "read_own" ON ${row.table} FOR SELECT USING (auth.uid() = user_id);`
      };
      if (!isSuppressed(f, suppressions)) findings.push(f);
    }
  }

  const counts = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const f of findings) counts[f.severity] += 1;

  const score = Math.max(0, 100 - (counts.critical * 20 + counts.high * 8 + counts.medium * 3 + counts.low));
  const shouldFail = findings.some(f => SEVERITY_ORDER[f.severity] >= SEVERITY_ORDER[args.failOn]);

  const summary = {
    scanner: `webshield@${VERSION}`,
    scannedAt: new Date().toISOString(),
    root,
    detectedStack: Array.from(stackTags).filter(s => s !== 'all'),
    filesScanned: files.length,
    findings: findings.length,
    counts,
    score,
    failOn: args.failOn,
    shouldFail,
    ignoreFile: args.ignoreFile,
    suppressionsLoaded: suppressions.length
  };

  return { summary, findings, routeAuthMatrix, rlsMatrix };
}

function toMarkdown(report) {
  const { summary, findings, routeAuthMatrix, rlsMatrix } = report;
  const lines = [];

  lines.push('# WebShield v2 Security Scan Report');
  lines.push('');
  lines.push(`- **Scanner:** ${summary.scanner}`);
  lines.push(`- **Scanned At:** ${summary.scannedAt}`);
  lines.push(`- **Project Root:** ${summary.root}`);
  lines.push(`- **Detected Stack:** ${summary.detectedStack.join(', ') || 'unknown'}`);
  lines.push(`- **Files Scanned:** ${summary.filesScanned}`);
  lines.push(`- **Risk Score (0-100):** ${summary.score}`);
  lines.push(`- **Findings:** ${summary.findings}`);
  lines.push(`- **By Severity:** Critical ${summary.counts.critical} | High ${summary.counts.high} | Medium ${summary.counts.medium} | Low ${summary.counts.low}`);
  lines.push(`- **Policy Gate (${summary.failOn}+):** ${summary.shouldFail ? 'FAIL' : 'PASS'}`);
  lines.push(`- **Suppressions:** ${summary.suppressionsLoaded} from ${summary.ignoreFile}`);
  lines.push('');

  if (routeAuthMatrix.length) {
    lines.push('## Route Auth Matrix (v2)');
    lines.push('');
    lines.push('| File | Methods | Mutating | Auth Guard | Webhook Verify | Zod Validation |');
    lines.push('|---|---|---|---|---|---|');
    for (const r of routeAuthMatrix) {
      lines.push(`| ${r.file} | ${r.methods.join(',')} | ${r.mutatingMethods.join(',') || '-'} | ${r.authGuardDetected ? 'YES' : 'NO'} | ${r.webhookLike ? (r.webhookVerified ? 'YES' : 'NO') : 'N/A'} | ${r.zodValidationDetected ? 'YES' : 'NO'} |`);
    }
    lines.push('');
  }

  if (rlsMatrix.length) {
    lines.push('## Supabase RLS Matrix (v2)');
    lines.push('');
    lines.push('| Table | Created In | RLS Enabled | Policies Detected |');
    lines.push('|---|---|---|---|');
    for (const r of rlsMatrix) {
      lines.push(`| ${r.table} | ${r.createdIn} | ${r.rlsEnabled ? 'YES' : 'NO'} | ${r.policiesDetected} |`);
    }
    lines.push('');
  }

  if (!findings.length) {
    lines.push('✅ No findings detected by current WebShield rule set.');
    lines.push('');
    return lines.join('\n');
  }

  lines.push('## Findings');
  lines.push('');
  lines.push('| ID | Severity | Category | File:Line | Title |');
  lines.push('|---|---|---|---|---|');
  for (const f of findings) {
    lines.push(`| ${f.id} | ${f.severity.toUpperCase()} | ${f.category} | ${f.file}:${f.line} | ${f.title} |`);
  }
  lines.push('');

  lines.push('## Detailed Remediation + Suggested Fix');
  lines.push('');
  findings.forEach((f, idx) => {
    lines.push(`### ${idx + 1}) ${f.id} — ${f.title}`);
    lines.push(`- **Severity:** ${f.severity.toUpperCase()}`);
    lines.push(`- **Location:** ${f.file}:${f.line}`);
    lines.push(`- **Trigger:** \`${String(f.snippet || '').replace(/`/g, '\\`')}\``);
    lines.push(`- **Fix Guidance:** ${f.remediation}`);
    if (f.fixSnippet) lines.push(`- **Suggested Patch Hint:** ${f.fixSnippet}`);
    lines.push('');
  });

  lines.push('---');
  lines.push('Generated by WebShield v2');
  return lines.join('\n');
}

function toSarif(report) {
  const { findings, summary } = report;

  const levelMap = {
    critical: 'error',
    high: 'error',
    medium: 'warning',
    low: 'note'
  };

  const rulesMap = new Map();
  for (const f of findings) {
    if (!rulesMap.has(f.id)) {
      rulesMap.set(f.id, {
        id: f.id,
        name: f.title,
        shortDescription: { text: f.title },
        fullDescription: { text: f.remediation },
        properties: { category: f.category, severity: f.severity }
      });
    }
  }

  const results = findings.map(f => ({
    ruleId: f.id,
    level: levelMap[f.severity] || 'warning',
    message: { text: `${f.title} | ${f.remediation}` },
    locations: [{
      physicalLocation: {
        artifactLocation: { uri: f.file },
        region: { startLine: f.line || 1 }
      }
    }]
  }));

  return {
    version: '2.1.0',
    $schema: 'https://json.schemastore.org/sarif-2.1.0.json',
    runs: [{
      tool: {
        driver: {
          name: 'WebShield',
          version: VERSION,
          informationUri: 'https://owasp.org/',
          rules: Array.from(rulesMap.values())
        }
      },
      invocations: [{
        executionSuccessful: true,
        commandLine: 'webshield scan',
        properties: {
          score: summary.score,
          failOn: summary.failOn,
          shouldFail: summary.shouldFail
        }
      }],
      results
    }]
  };
}

function writeReports(args, report) {
  const outBase = path.resolve(args.out);

  if (args.format === 'json' || args.format === 'both' || args.format === 'all') {
    fs.writeFileSync(`${outBase}.json`, JSON.stringify(report, null, 2), 'utf8');
  }

  if (args.format === 'md' || args.format === 'both' || args.format === 'all') {
    fs.writeFileSync(`${outBase}.md`, toMarkdown(report), 'utf8');
  }

  if (args.format === 'sarif' || args.format === 'all') {
    fs.writeFileSync(`${outBase}.sarif`, JSON.stringify(toSarif(report), null, 2), 'utf8');
  }
}

function main() {
  try {
    const args = parseArgs(process.argv);
    const report = runScan(args);
    writeReports(args, report);

    const { summary } = report;
    console.log(`\nWebShield scan complete: ${summary.findings} findings (C:${summary.counts.critical} H:${summary.counts.high} M:${summary.counts.medium} L:${summary.counts.low})`);
    console.log(`Score: ${summary.score} | Gate (${summary.failOn}+): ${summary.shouldFail ? 'FAIL' : 'PASS'}`);
    console.log(`Output: ${path.resolve(args.out)} + formats(${args.format})`);

    process.exit(summary.shouldFail ? 1 : 0);
  } catch (err) {
    console.error(`Scan failed: ${err.message}`);
    process.exit(2);
  }
}

main();
