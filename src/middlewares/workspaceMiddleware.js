import workspace_members_repository from "../repositories/workspaceMembersRepository.js";
import workspacesRepo from "../repositories/WorkspaceRepository.js";

const workspaceMiddleware = async (request, response, next) => {
    const workspaceId = request.params.workspace_id;
    const userId = request.user.id;
    try {
        const workspace = await workspacesRepo.getById(workspaceId)
        if (!workspace) {
            throw {
                status: 404,
                message: "Workspace no encontrado"
            }
        }
        const member = await workspace_members_repository.getMemberByWorkspaceIdAndUserId(workspaceId, userId);
        if (!member) {
            throw {
                status: 403,
                message: "No tienes permisos para acceder a este Workspace"
            }
        }
        request.workspace = workspace;
        next();
    }
    catch (error) {
        response.status(error.status).json({
            message: error.message,
            error: error.status,
        });

    }
}

export default workspaceMiddleware;