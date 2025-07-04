import mongoose from "mongoose";
// el esquema define las valdiaciones q deben hacerce al crear un doc o actualizar

const userSchema = new mongoose.Schema(
    //definicion de esquema

    {
        email: {
            type: String,
            required: true,
            unique: true,
        },

        name: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        verified: {
            type: Boolean,
            required: true,
            default: false
        },

        created_at: {
            type: Date,
            default: new Date(),
        },

        // require tiene que ser un valor no false (null,0,false,nan,undefined,'')
    }
);

// ahora creamos el modelo. es asignarle este esquema a una coleccion.

// defino que la coleccion de users estara atada a esta validacion
const User = mongoose.model("Users", userSchema); //se crea la coleccion USERS en mongoDB y se le asigna este esquema

export default User;
