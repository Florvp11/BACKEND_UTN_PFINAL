import Workspace from "../models/WorkspaceModel.js";

class WorkspacesRepo {
    /**
     *
     * @param {string} data.name - El nombre del workspace.
     * @param {string} data.owner_id - El id del usuario propietario del workspace.
     * @param {string} [data.description] - La descripcion del workspace.
     */
    async create({ name, owner_id, description }) { //crea el ws, lo guarda y lo devuelve.
        const workspace = new Workspace({
            name,
            description,
            owner_id,
        });
        await workspace.save();
        return workspace;

    }


    async deleteWorkspaceFromOwner(owner_id, workspace_id) {

        //Aca eliminamos el workspace solo si el owner_id es el recibido por parametro
        const result = await Workspace.findOneAndDelete({ owner_id, _id: workspace_id })
        //Si el result es null, significa que no se elimino el workspace
        if (!result) {
            throw { status: 404, message: 'El workspace a eliminar no existe' }
        }
    }
    async deleteById(workspace_id) {
        return await Workspace.findOneAndDelete({ _id: workspace_id })
    }
    async getById(workspace_id) {
        return await Workspace.findById(workspace_id)
    }

}

const workspacesRepo = new WorkspacesRepo();
export default workspacesRepo;
