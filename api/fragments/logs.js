const LOGS_API = process.env.LOGS_API || "http://localhost:3000";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderLogs(logs) {
  if (!Array.isArray(logs) || logs.length === 0) {
    return '<p class="font-mono text-on-surface-variant text-sm">No posts yet.</p>';
  }

  return logs
    .map((log) => {
      const date = new Date(log.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const preview =
        typeof log.body === "string" && log.body.length > 120
          ? `${log.body.slice(0, 120)}...`
          : log.body || "";

      return `
        <article class="bg-surface-container-low border border-outline-variant/30 p-6 space-y-3 hover:border-primary-container/50 transition-colors group">
          <div class="flex items-center justify-between">
            <span class="font-mono text-[10px] text-primary-container/60 uppercase tracking-widest">${date}</span>
            <span class="material-symbols-outlined text-sm text-on-surface-variant/40 group-hover:text-primary-container transition-colors">article</span>
          </div>
          <h3 class="font-headline font-bold text-white text-xl group-hover:text-primary-container transition-colors">${escapeHtml(log.header || "")}</h3>
          <p class="text-on-surface-variant font-body text-sm leading-relaxed">${escapeHtml(preview)}</p>
        </article>`;
    })
    .join("");
}

module.exports = async (req, res) => {
  try {
    const upstream = await fetch(`${LOGS_API}/blogs`);

    if (!upstream.ok) {
      throw new Error(`Backend returned ${upstream.status}`);
    }

    const logs = await upstream.json();

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(renderLogs(logs));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(`
      <div class="bg-error-container/20 border border-error/30 p-4 font-mono text-sm text-error">
        <span class="material-symbols-outlined text-sm mr-2">error</span>
        Error loading posts: ${escapeHtml(message)}
      </div>
    `);
  }
};
