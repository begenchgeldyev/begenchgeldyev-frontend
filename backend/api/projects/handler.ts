import { container } from "@/app-container"
import { ProjectsController } from "./projects.controller"

export async function handleProjects(req: Request): Promise<Response> {
	const controller = container.resolve(ProjectsController)

	if (req.method === "GET") {
		return controller.get()
	}

	if (req.method === "POST") {
		return controller.post(req)
	}

	return Response.json({ error: "Method Not Allowed" }, { status: 405 })
}
