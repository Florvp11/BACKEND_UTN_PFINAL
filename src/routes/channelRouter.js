import express from 'express';
import channelController from '../controller/channelController.js';
import authorizationMiddleware from '../middlewares/authMiddleware.js';
import workspaceMiddleware from '../middlewares/workspaceMiddleware.js';

const channelRouter = express.Router();

channelRouter.post('/:workspace_id', authorizationMiddleware, workspaceMiddleware, channelController.create)
channelRouter.get('/:workspace_id', authorizationMiddleware, workspaceMiddleware, channelController.getAllByWorkspaceId)

export default channelRouter;