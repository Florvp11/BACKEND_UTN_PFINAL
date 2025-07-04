import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId, //valida q sea un id
        required: true,
        ref: "User", // hace referencia a la coleccion user, esto valida q cuando se cree el workspace  el usuario exista, es decir sea un id valido
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
});

const Workspace = mongoose.model("Workspace", workspaceSchema); // crea el modelo de la coleccion workspaces. Este esquema lo asignamos a una coleccion. Para la coleccion Waorkspaces asigno el esquema WorspaceSchema

export default Workspace;