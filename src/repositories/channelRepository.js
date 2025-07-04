

import Channel from '../models/ChannelModel.js';

class ChannelRepository {
    async create(workspaceId, name, isPrivate) {
        try {
            const channel = new Channel({
                name,
                workspace_id: workspaceId,
                private: isPrivate
            });
            await channel.save();
            return channel;
        } catch (error) {
            throw error;
        }
    }

    async findByName(workspaceId, name) {
        try {
            return await Channel.findOne({ name, workspace_id: workspaceId });
        } catch (error) {
            throw error;
        }
    }

    async getAllByWorkspace(workspaceId) {
        try {
            const channels = await Channel.find({ workspace_id: workspaceId });
            return channels;
        }
        catch (error) {
            throw error;
        }
    }

}

const channelRepository = new ChannelRepository();
export default channelRepository;