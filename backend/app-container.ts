import { ProjectsController } from "./api/projects/projects.controller"
import { ProjectsRepository } from "./api/projects/projects.repository"
import { Container } from "./DIContainer"
import { db } from "./db"

export const container = new Container()

container.registerFactory(ProjectsRepository, () => {
	return new ProjectsRepository(db)
})
container.registerFactory(ProjectsController, (c) => {
	return new ProjectsController(c.resolve(ProjectsRepository))
})
