import channelService from "../services/ChannelService.js";


class ChannelController {
    async create(request, response) {
        try {
            const { name } = request.body;
            const { workspace_id } = request.params;
            console.log(request.params.workspace_id)
            const { channels } = await channelService.create(name, workspace_id);
            response.status(201).json({
                ok: true,
                message: "Canal creado con exito!",
                status: 201,
                data: {
                    channels: channels
                }

            });

        }
        catch (error) {
            if (error.status) {
                response.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status,
                });
            }
            else {
                console.log("Hubo un error ", error);
                response.status(500).json({
                    ok: false,
                    message: error.message,
                    status: 500,
                });

            }

        }
    }

    async getAllByWorkspaceId(request, response) {
        try {
            const { workspace_id } = request.params; //el parametro que capturamos tiene que ser igual al que ponemos en la route
            const channels = await channelService.getAllByWorkspaceId(workspace_id);
            response.status(200).json({
                ok: true,
                message: "Canales obtenidos con exito!",
                status: 200,
                data: {
                    channels: channels
                }
            });

        }
        catch (error) {
            if (error.status) {
                response.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status,
                });
            }
            else {
                console.log("Hubo un error ", error);
                response.status(500).json({
                    ok: false,
                    message: error.message,
                    status: 500,
                });

            }

        }
    }
}

const channelController = new ChannelController();
export default channelController; 