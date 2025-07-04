import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from "../dictionarie/availableRoles.dictionary.js"
import members_workspace_repository from "../repositories/workspaceMembersRepository.js"
import userRepo from "../repositories/UserRepository.js"

import workspacesRepo from "../repositories/WorkspaceRepository.js"

class MembersWorkspaceController {
    async add(request, response) {
        try {
            //Logica para agregar un nuevo miembro

            const { id } = request.user //Paso 1- Saber el ID de quien esta haciendo la consulta

            const { workspace_id } = request.params //Paso 2: Saber el workspace_id

            const { role, email } = request.body //Paso 3 y 4 : Saber el role y obtener el mail de a quien quiero agregar


            if (
                !Object.values(AVAILABLE_ROLES_WORKSPACE_MEMBERS).includes(role) // me fijo si el rol q me llego esta incluido en los roles disponibles 
            ) {
                throw {
                    status: 400,
                    message: 'Role no valido'
                }
            }

            const user_found = await userRepo.findByMail({ email: email }) // me fijo si el usuario q quiero agregar existe.

            if (!user_found) {
                throw { status: 404, message: 'Usuario no encontrado' }
            }

            // nos aseguramos q el miembro  no este agregado ya al workspace. Evitamos duplicar.

            const members = await members_workspace_repository.getAllbyWorkspaceID(workspace_id) //capturamos la lista de todos los users en el WS

            if (members.find(member => {
                return member.user_id.equals(user_found._id) //si el user q queremos agregar ya esta no lo agregamos
            })) {
                throw {
                    message: 'El usuario ya es miembro de este workspace',
                    status: 400
                }
            }

            //tengo que verificar que soy el owner del workspace para agregar miembros.
            const workspace_found = await workspacesRepo.getById(workspace_id)
            if (!workspace_found) {
                throw {
                    status: 404,
                    message: 'Workspace no existe'
                }
            }

            if (!workspace_found.owner_id.equals(id)) { //si no sos el ADMIN no podes agregar!!!
                throw {
                    status: 403,
                    message: 'No puedes hacer esta accion, no eres dueño del workspace'
                }
            }

            await members_workspace_repository.create({
                user_id: user_found._id,
                workspace_id: workspace_id,
                role: role
            })

            response.status(201).json(
                {
                    ok: true,
                    status: 201,
                    message: 'Miembro añadido exitosamente',
                    data: {}
                }
            )
        }
        catch (error) {
            if (error.status) {
                response.status(error.status).json(
                    {
                        message: error.message,
                        status: error.status,
                        ok: false
                    }
                )
                return
            }
            else {
                console.log('Hubo un error', error)
                response.status(500).json(
                    {
                        message: 'Error interno del servidor',
                        ok: false
                    }
                )
            }
        }
    }
}

const members_workspace_controller = new MembersWorkspaceController()
export default members_workspace_controller