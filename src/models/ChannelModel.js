import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, //este campo es obligatorio
    },
    workspace_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Workspace",
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    private: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const Channel = mongoose.model("Channels", channelSchema); //se crea la coleccion USERS en mongoDB y se le asigna este esquema

export default Channel;
