import { extname, join, normalize, sep } from "node:path";

type NavKey = "projects" | "logs" | "cv";
type FooterVariant = "default" | "home";

type PageConfig = {
  title: string;
  fragmentFile: string;
  activeNav?: NavKey;
  brandIsLink?: boolean;
  footerVariant?: FooterVariant;
  includeCvLink?: boolean;
  selectionTextClass?: string;
  showTerminalIcon?: boolean;
};

const ROOT_DIR = join(import.meta.dir, "..");
const PAGES_DIR = join(ROOT_DIR, "pages");
const PUBLIC_DIR = join(PAGES_DIR, "public");

const MIME: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const PAGE_CONFIGS: Record<string, PageConfig> = {
  "/": {
    title: "begenchgeldyev",
    fragmentFile: "index.html",
    brandIsLink: false,
    footerVariant: "home",
    includeCvLink: true,
    selectionTextClass: "selection:text-on-primary-fixed",
  },
  "/cv": {
    title: "CV — BEGENCH_GELDYEV@ROOT:~$",
    fragmentFile: "cv.html",
    activeNav: "cv",
    brandIsLink: true,
    footerVariant: "default",
    includeCvLink: true,
    showTerminalIcon: true,
  },
  "/logs": {
    title: "LOGS — BEGENCH_GELDYEV@ROOT:~$",
    fragmentFile: "logs.html",
    activeNav: "logs",
    brandIsLink: true,
    footerVariant: "default",
    showTerminalIcon: true,
  },
  "/projects": {
    title: "PROJECTS — BEGENCH_GELDYEV@ROOT:~$",
    fragmentFile: "projects.html",
    activeNav: "projects",
    brandIsLink: true,
    footerVariant: "default",
    showTerminalIcon: true,
  },
};

const SHARED_HEAD = `
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script src="https://unpkg.com/htmx.org@2.0.4"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<script id="tailwind-config">
  tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          "surface": "#131313",
          "on-tertiary-container": "#00710b",
          "on-surface": "#f2f1f0",
          "on-primary-container": "#002203",
          "inverse-primary": "#006e16",
          "on-primary-fixed-variant": "#00530e",
          "background": "#0a0a0a",
          "surface-container-lowest": "#0e0e0e",
          "surface-container-high": "#2a2a2a",
          "on-tertiary-fixed-variant": "#005306",
          "secondary": "#ffd393",
          "on-tertiary": "#003a03",
          "on-surface-variant": "#d1decb",
          "on-error": "#690005",
          "surface-bright": "#3a3939",
          "on-secondary-fixed": "#281800",
          "primary-fixed-dim": "#00e639",
          "primary-fixed": "#72ff70",
          "surface-variant": "#353534",
          "on-primary-fixed": "#002203",
          "error-container": "#93000a",
          "tertiary": "#eaffdf",
          "on-primary": "#003907",
          "surface-tint": "#00e639",
          "outline-variant": "#4a5d45",
          "on-secondary-container": "#694600",
          "on-error-container": "#ffdad6",
          "inverse-surface": "#e5e2e1",
          "on-secondary-fixed-variant": "#614000",
          "primary-container": "#00ff41",
          "primary": "#ebffe2",
          "tertiary-container": "#7ff670",
          "on-tertiary-fixed": "#002201",
          "on-secondary": "#432c00",
          "on-background": "#f2f1f0",
          "inverse-on-surface": "#313030",
          "surface-dim": "#131313",
          "outline": "#a4b59f",
          "secondary-fixed-dim": "#ffba43",
          "tertiary-fixed": "#85fd75",
          "secondary-container": "#fdaf00",
          "surface-container": "#201f1f",
          "tertiary-fixed-dim": "#69df5c",
          "surface-container-highest": "#353534",
          "error": "#ffb4ab",
          "surface-container-low": "#1c1b1b",
          "secondary-fixed": "#ffddaf"
        },
        fontFamily: {
          "headline": ["Space Grotesk"],
          "body": ["Inter"],
          "label": ["Space Grotesk"],
          "mono": ["JetBrains Mono", "monospace"]
        },
        borderRadius: { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "9999px" },
      },
    },
  }
</script>
<style>
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    vertical-align: middle;
  }
  .scanline {
    width: 100%;
    height: 100px;
    z-index: 100;
    background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,255,65,0.015) 50%, rgba(0,0,0,0) 100%);
    position: fixed;
    pointer-events: none;
    left: 0;
    top: -100px;
    animation: scanline 12s linear infinite;
  }
  @keyframes scanline {
    0% { top: -100px; }
    100% { top: 100%; }
  }
  .blinking-cursor {
    display: inline-block;
    width: 10px;
    height: 1.2em;
    background-color: #00FF41;
    margin-left: 2px;
    animation: blink 1s step-end infinite;
    vertical-align: middle;
  }
  @keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }
  body {
    background-color: #0a0a0a;
    cursor: crosshair;
  }
  #terminal-input {
    -webkit-appearance: none;
    appearance: none;
    font-family: 'JetBrains Mono', monospace !important;
  }
  #terminal-input:focus {
    outline: none;
    box-shadow: none;
    border: none;
  }
  ::-webkit-scrollbar { width: 12px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: #00802a; border-radius: 0; }
  ::-webkit-scrollbar-thumb:hover { background: #00FF41; }
  * { scrollbar-width: thin; scrollbar-color: #1a2e1a #0a0a0a; }
  .custom-scrollbar::-webkit-scrollbar { width: 4px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #353534; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00FF41; }
  .htmx-request .loading-indicator { display: flex !important; }
  .htmx-request.loading-indicator { display: flex !important; }
</style>`;

function renderNavLink(activeNav: NavKey | undefined, href: string, label: string, key: NavKey) {
  const isActive = activeNav === key;
  const classes = isActive
    ? "font-label uppercase tracking-widest text-xs font-semibold text-primary-container border-b-2 border-primary-container pb-1"
    : "font-label uppercase tracking-widest text-xs font-semibold text-white/80 hover:text-primary-container transition-colors";
  const current = isActive ? ' aria-current="page"' : "";
  return `<a class="${classes}" href="${href}"${current}>${label}</a>`;
}

function renderHeader(config: PageConfig) {
  const brand = config.brandIsLink
    ? `<a href="/" class="text-[#00FF41] font-mono font-bold tracking-widest text-sm hover:opacity-80 transition-opacity">
      begench@127.0.0.1 <span class="hidden sm:inline opacity-60">WHOAMI</span>
    </a>`
    : `<div class="text-[#00FF41] font-mono font-bold tracking-widest text-sm">
      begench@127.0.0.1 <span class="hidden sm:inline opacity-60">WHOAMI</span>
    </div>`;

  const terminal = config.showTerminalIcon
    ? `<span class="material-symbols-outlined cursor-pointer hover:text-primary-container transition-colors">terminal</span>`
    : "";

  return `<header class="bg-background/90 backdrop-blur-sm sticky top-0 z-50 border-b border-outline-variant/30">
  <div class="bg-primary-container h-[2px] w-full"></div>
  <nav class="flex justify-between items-center w-full max-w-6xl mx-auto py-6 px-8">
    ${brand}
    <div class="hidden md:flex items-center gap-10">
      ${renderNavLink(config.activeNav, "/projects", "Projects", "projects")}
      ${renderNavLink(config.activeNav, "/logs", "Logs", "logs")}
      ${renderNavLink(config.activeNav, "/cv", "CV", "cv")}
    </div>
    <div class="flex items-center gap-4">
      ${terminal}
    </div>
  </nav>
</header>`;
}

function renderFooter(config: PageConfig) {
  if (config.footerVariant === "home") {
    return `<footer class="bg-background border-t border-outline-variant/30 py-16 px-8 mt-20">
  <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
    <div class="flex flex-col items-center md:items-start gap-2">
      <div class="text-primary-container font-mono text-xs font-bold tracking-[0.2em] uppercase">
        © 2026 BEGENCH GELDYEV
      </div>
      <div class="text-on-surface-variant font-mono text-xs uppercase">
        begenchgeldyev@gmail.com
      </div>
    </div>
    <div class="flex flex-wrap justify-center gap-8">
      <a class="font-mono text-xs tracking-widest text-on-surface font-bold hover:text-primary-container transition-colors uppercase" href="https://github.com/begenchgeldyev" target="_blank">GitHub</a>
      <a class="font-mono text-xs tracking-widest text-on-surface font-bold hover:text-primary-container transition-colors uppercase" href="https://linkedin.com/in/begench-geldyev" target="_blank">LinkedIn</a>
      <a class="font-mono text-xs tracking-widest text-primary-container underline font-bold uppercase" href="/public/Begench%20Geldyev(CV).pdf" target="_blank">CV.pdf</a>
    </div>
  </div>
</footer>`;
  }

  const cvLink = config.includeCvLink
    ? `<a class="font-mono text-xs tracking-widest text-primary-container underline font-bold uppercase" href="/public/Begench%20Geldyev(CV).pdf" target="_blank">CV.pdf</a>`
    : "";

  return `<footer class="bg-background border-t border-outline-variant/30 py-10 px-8 mt-20">
  <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
    <div class="text-primary-container font-mono text-xs font-bold tracking-[0.2em] uppercase">© 2026 BEGENCH GELDYEV</div>
    <div class="flex flex-wrap justify-center gap-8">
      <a class="font-mono text-xs tracking-widest text-on-surface font-bold hover:text-primary-container transition-colors uppercase" href="https://github.com/begenchgeldyev" target="_blank">GitHub</a>
      <a class="font-mono text-xs tracking-widest text-on-surface font-bold hover:text-primary-container transition-colors uppercase" href="https://linkedin.com/in/begench-geldyev" target="_blank">LinkedIn</a>
      ${cvLink}
    </div>
  </div>
</footer>`;
}

function renderLayout(config: PageConfig, content: string) {
  const selectionTextClass = config.selectionTextClass ?? "selection:text-on-primary-container";
  return `<!DOCTYPE html>
<html class="dark" lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>${config.title}</title>
${SHARED_HEAD}
</head>
<body class="font-body text-on-surface selection:bg-primary-container ${selectionTextClass}">
<div class="scanline"></div>
${renderHeader(config)}
${content}
${renderFooter(config)}
<div class="fixed inset-0 pointer-events-none border-[1px] border-outline-variant/20 z-[60]"></div>
</body>
</html>`;
}

export async function renderPage(pathname: string): Promise<Response | null> {
  const config = PAGE_CONFIGS[pathname];
  if (!config) {
    return null;
  }

  const fragmentPath = join(PAGES_DIR, config.fragmentFile);
  const fragment = Bun.file(fragmentPath);
  if (!(await fragment.exists())) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(renderLayout(config, await fragment.text()), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function servePublicAsset(pathname: string): Promise<Response> {
  let relativePath: string;

  try {
    relativePath = decodeURIComponent(pathname.slice("/public/".length));
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  const assetPath = normalize(join(PUBLIC_DIR, relativePath));
  const inPublicDir = assetPath === PUBLIC_DIR || assetPath.startsWith(`${PUBLIC_DIR}${sep}`);
  if (!inPublicDir) {
    return new Response("Forbidden", { status: 403 });
  }

  const file = Bun.file(assetPath);
  if (!(await file.exists())) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(file, {
    headers: { "Content-Type": MIME[extname(assetPath)] ?? "application/octet-stream" },
  });
}
