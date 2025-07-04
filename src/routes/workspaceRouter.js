import express from 'express'
import workspaceController from '../controller/workspacesController.js'
import authorizationMiddleware from '../middlewares/authMiddleware.js'



const workspaceRouter = express.Router()

workspaceRouter.post(
    '/',
    authorizationMiddleware, //primero paso por la autentificacion
    workspaceController.create //segundo creo el WS
)
workspaceRouter.delete(
    '/:workspace_id',
    authorizationMiddleware,
    workspaceController.delete
)

workspaceRouter.get('/', authorizationMiddleware, workspaceController.getAllbyMember)
export default workspaceRouter


