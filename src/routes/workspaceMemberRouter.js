
import express from 'express'
import authorizationMiddleware from '../middlewares/authMiddleware.js'
import workspace_members_controller from '../controller/workspaceMembersController.js'
const workspaceMembersRouter = express.Router()

workspaceMembersRouter.post(
    '/:workspace_id',
    authorizationMiddleware, //pasa x auth ya que solo puede anadir miembros alguien que este autorizado.
    workspace_members_controller.add
)

export default workspaceMembersRouter