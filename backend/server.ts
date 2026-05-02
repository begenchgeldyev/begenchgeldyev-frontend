import { handleProjects } from "./api/projects/handler";
import { renderPage, servePublicAsset } from "./site";

const PORT = Number(process.env.PORT) || 8613;

Bun.serve({
	port: PORT,
	routes: {
		"/title": () => {
			const title = ["Javascript Ninja", "VIM enjoyer", "Software Engineer", "Fullstack Developer"];
			const randomTitleIndex = Math.floor(Math.random() * title.length);
			const randomTitle = title.at(randomTitleIndex);
			return Response.json({ title: randomTitle });
		},
		"/projects": (req) => {
			return handleProjects(req);
		},
	},

	async fetch(req) {
		const { pathname } = new URL(req.url);

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

console.log(`Server running at http://localhost:${PORT}`);
