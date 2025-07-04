import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from "../dictionarie/availableRoles.dictionary.js";
import workspace_members_repository from "../repositories/workspaceMembersRepository.js";
import workspacesRepo from "../repositories/WorkspaceRepository.js"


class WorkspaceController {
    async create(request, response) {
        try {

            const { name, description } = request.body
            const { id } = request.user;

            if (!id) {
                throw { status: 400, message: "No se encontró el id del usuario en el token" }
            }

            const workspaceCreated = await workspacesRepo.create({ name, description, owner_id: id }) //crea un workspace
            await workspace_members_repository.create({
                workspace_id: workspaceCreated.id,
                user_id: id,
                role: AVAILABLE_ROLES_WORKSPACE_MEMBERS.ADMIN
            }) //al crear el ws crea un miembro, el usuario que creo el ws es admin.Se agrega a la lista de miembros como ADMIN.


            response.status(201).json({
                ok: true,
                message: 'Workspace creado exitosamente!!!!',
                status: 201,
            })
        }
        catch (error) {
            if (error.status) {
                response.status(error.status).json({
                    message: error.message,
                    status: error.status,
                    ok: false
                })
                return
            }
            else {
                console.log('Error desconocido en controller:', error)
                response.status(500).json({
                    message: 'Error interno del servidor',
                    ok: false
                })
            }
        }
    }


    async delete(request, response) {
        try {
            const workspace_id = request.params.workspace_id //Debe ser igual al param que pusimos en routes
            const user_id = request.user.id
            await workspacesRepo.deleteWorkspaceFromOwner(user_id, workspace_id)

            response.status(200).json(
                {
                    ok: true,
                    message: 'Workspace eliminado correctamente',
                    status: 200,
                    data: {}
                }
            )
            return
        } catch (error) {

            if (error.status) {
                response.status(error.status).send(
                    {
                        message: error.message,
                        status: error.status,
                        ok: false
                    }
                )
                return
            } else {
                console.error('Hubo un error', error)
                response.status(500).json(
                    {
                        message: 'Error interno del servidor',
                        ok: false
                    }
                )
            }
        };
    }


    async getAllbyMember(request, response) { //lista de workspaces
        const { id } = request.user
        //devuelve la lista a de todos los WS's a los que pertenece un miembro
        const workspaces = await workspace_members_repository.getAllbyUserID(id)
        response.json({
            ok: true,
            status: 200,
            message: 'List of workspaces',
            data: {
                workspaces: workspaces
            }
        })
    }



}

const workspaceController = new WorkspaceController
export default workspaceController