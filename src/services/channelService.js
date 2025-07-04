import channelRepository from "../repositories/channelRepository.js";
import workspacesRepo from "../repositories/WorkspaceRepository.js";

class ChannelService {
    /**
     * Crea un nuevo canal en el workspace especificado.
     * 
     * @param {string} workspace_Id - El id del workspace donde se creará el canal.
     * @param {string} name - El nombre del canal a crear.
     * @return {Object.channels} - Un objeto que contiene la lista actualizada de canales en el workspace.

     * 
     * @throws {Object} - Si el nombre del canal ya existe o no cumple con las validaciones.
     * @throws {Object.status} {number} - El código de estado de la respuesta (400).
     * @throws {Object.message} {string} - El mensaje de error.
     * 
     * @throws {Object} - Si el workspace no existe.
     * @throws {Object.status} {number} - El código de estado de la respuesta (404).
     * @throws {Object.message} {string} - El mensaje de error.
     */

    async create(name, workspace_id) {
        const maxChar = 50;
        if (typeof name !== 'string' ||
            name.length >= { maxChar }) {
            throw {
                status: 400,
                message: `El nombre debe ser un string con menos de ${maxChar} caracteres`
            }
        }

        const doesExist = await channelRepository.findByName(workspace_id, name);
        if (doesExist) {
            throw {
                status: 400,
                message: "El nombre del canal ya esta en uso"
            }
        }

        const defaultIsPrivate = false;
        const channel = await channelRepository.create(workspace_id, name, defaultIsPrivate);

        const channels = await channelRepository.getAllByWorkspace(workspace_id);
        return { channels };

    }
    async getAllByWorkspaceId(workspace_Id) {
        return await channelRepository.getAllByWorkspace(workspace_Id);
    }
}
const channelService = new ChannelService()
export default channelService;
