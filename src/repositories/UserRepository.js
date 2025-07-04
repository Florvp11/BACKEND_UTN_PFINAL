import User from "../models/UserModels.js";

class UserRepo {


    async create({ name, password, email }) {
        try {

            const user = new User({ name, password, email });
            await user.save(); // guarda el usuario en la base de datos
            console.log("usuario creado exitosamente");
        } catch (error) {
            console.log("ERROR dentro de UserRepo.create:", error);
            throw error;
        }
    }



    async getAll() {
        const users = await User.find();
        return users;
    }


    async findByMail({ email }) {
        return await User.findOne({ email: email })

    }

    async verifyUserMail({ email }) {//segundo buscamos al ususario por mail en la base de datos
        const userFound = await this.findByMail({ email })
        if (!userFound) {
            throw { status: 404, message: "Usuario no encontrado" };
        }
        if (userFound.verified) { //tercero verificamos que no este validado el mail
            throw { status: 400, message: "El usuario ya ha sido verificado" }
        }
        else {

            //cuarto (si el tercero da falso ) cambiamos el usuario de no verificado a verificado
            const updatedUser = await User.findByIdAndUpdate( //necesito pasarle el id del usuario, luego entre llaves lo q quiero actualizar.
                userFound._id,
                { $set: { verified: true } }, //actualizo el usuario
                {
                    runValidators: true, //valido los campos, buena practicas. SIEMPRE QUE SE HACE UN UPDATE SE DEBE VALIDAR
                    new: true //devuelve el usuario actualizado
                }


            )
            return updatedUser;
        }

    }

    // creamos el metodo que busca al usuario por mail


}
const userRepo = new UserRepo(); //instancio el repositorio de usuarios

export default userRepo;
