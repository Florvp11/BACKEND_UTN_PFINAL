channelRepository

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
}
const channelRepository = new ChannelRepository();
export default channelRepository;