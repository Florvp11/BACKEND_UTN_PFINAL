import mongoose from "mongoose";

const channelMessagesSchema = new mongoose.Schema({
    memeberChannel_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ChannelMember",
    },
    channel_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Channel",
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    content: {
        type: String,
        required: true,
    },
});

const ChannelMessage = mongoose.model("ChannelMessages", channelMessagesSchema); //se crea la coleccion USERS en mongoDB y se le asigna este esquema

export default ChannelMessage;
