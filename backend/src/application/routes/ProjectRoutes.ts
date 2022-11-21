import {Router} from "express";
import ProjectController from "../controllers/ProjectController";

const projectRouter = Router()
const ctrl = new ProjectController()

projectRouter.get('/projects', ctrl.list)
projectRouter.get('/devs/:ownerId/projects', ctrl.listByDev)
projectRouter.get('/projects/:id', ctrl.getById)
projectRouter.post('/projects', ctrl.create)
projectRouter.patch('/projects/:id/toggle-heart', ctrl.toggleHeart)
projectRouter.put('/projects/:id', ctrl.update)

export default projectRouter
