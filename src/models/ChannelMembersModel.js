import mongoose from "mongoose";

const channelMembersSchema = new mongoose.Schema({
    member_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    channel_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Channel",
    },
});

const ChannelMember = mongoose.model("Channel_Members", channelMembersSchema); //se crea la coleccion USERS en mongoDB y se le asigna este esquema

export default ChannelMember;
