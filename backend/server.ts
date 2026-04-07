import { renderPage, servePublicAsset } from "./site";

const PORT = Number(process.env.PORT) || 3113;
const LOGS_API = process.env.LOGS_API || "http://localhost:3000";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function fragmentLogs(): Promise<Response> {
  try {
    const res = await fetch(`${LOGS_API}/blogs`);
    if (!res.ok) {
      throw new Error(`Backend returned ${res.status}`);
    }

    const logs: { id: number; header: string; body: string; createdAt: string }[] = await res.json();

    if (!logs.length) {
      return new Response('<p class="font-mono text-on-surface-variant text-sm">No posts yet.</p>', {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    const html = logs
      .map((log) => {
        const date = new Date(log.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        const preview = log.body.length > 120 ? `${log.body.slice(0, 120)}...` : log.body;

        return `
        <article class="bg-surface-container-low border border-outline-variant/30 p-6 space-y-3 hover:border-primary-container/50 transition-colors group">
          <div class="flex items-center justify-between">
            <span class="font-mono text-[10px] text-primary-container/60 uppercase tracking-widest">${date}</span>
            <span class="material-symbols-outlined text-sm text-on-surface-variant/40 group-hover:text-primary-container transition-colors">article</span>
          </div>
          <h3 class="font-headline font-bold text-white text-xl group-hover:text-primary-container transition-colors">${escapeHtml(log.header)}</h3>
          <p class="text-on-surface-variant font-body text-sm leading-relaxed">${escapeHtml(preview)}</p>
        </article>`;
      })
      .join("");

    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      `<div class="bg-error-container/20 border border-error/30 p-4 font-mono text-sm text-error">
        <span class="material-symbols-outlined text-sm mr-2">error</span>
        Error loading posts: ${escapeHtml(msg)}
      </div>`,
      { headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }
}

Bun.serve({
  port: PORT,
  async fetch(req) {
    const { pathname } = new URL(req.url);

    if (pathname === "/api/logs" || pathname === "/fragments/logs") {
      return fragmentLogs();
    }

    if (pathname.startsWith("/public/")) {
      return servePublicAsset(pathname);
    }

    const page = await renderPage(pathname);
    if (page) {
      return page;
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`\x1b[32m✓ Server running at http://localhost:${PORT}\x1b[0m`);
console.log(`  Logs API: ${LOGS_API}`);
