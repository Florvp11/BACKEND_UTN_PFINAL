import transporter from "../config/mailConfig.js";
import { ENVIRONMENT } from "../environment.js";
import userRepo from "../repositories/UserRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";





const sendVerificationEmail = async ({ email, name, redirect_url }) => {
    const result = await transporter.sendMail(
        {
            from: ENVIRONMENT.GMAIL_USER,
            to: email,
            subject: "prueba de envio de correo",
            html: `
      <div >
        <h1>Bienvenido ${name}</h1>
        <p>
          Necesitamos verificar tu identidad, haz click en el siguiente link para terminar la autenticación:
        </p>
          <a href="${redirect_url}">
            LINK DE VERIFICACIÓN
          </a>
          <span>Este link estará disponible por las siguientes 24HS.</span>
      </div>
    `
        })
}

const createVerificationToken = (email) => {
    return jwt.sign(
        { email },
        ENVIRONMENT.JWT_SECRET_KEY
    );
};
// Función para construir el redirect URL del link de verificación
const buildVerificationRedirectUrl = (token) => {
    return `http://localhost:3000/api/users/verify?verify_token=${token}`;
};


class UserController {

    async register(request, response) {  //debemos mejorar esto con un try catch
        try {
            const { name, email, password } = request.body;
            //validamos q lleguen los datos antes de crear un usuario
            if (!request.body || !name || !email || !password) {
                throw { status: 400, message: "Porfavor, complete todos los campos", ok: false };
            }

            let hashedPassword = await bcrypt.hash(request.body.password, 12)
            await userRepo.create({
                name: request.body.name, //la funcion que se ejecuta cuando se hace una CONSULTA se llama CONTROLADOR
                password: hashedPassword, //ya tenemos la contra encriptada
                email: request.body.email,
            });

            const verificacion_token = jwt.sign({ email: request.body.email }, ENVIRONMENT.JWT_SECRET_KEY, {//valor que solo conozco yo que se encriota y se convierte en un id.

            })
            //enviamos un correo de verificacion
            await sendVerificationEmail({
                name: request.body.name,
                email: request.body.email,
                redirect_url: `http://localhost:3000/api/users/verify?verify_token=${verificacion_token}`
                //creo el link seguro
            })
            response.send({
                message: "Usuario creado exitosamente!! Te enviamos un mail, echale un vistazo!",
                ok: true
            });

        }
        catch (error) {
            console.log("hubo un error : ", error);

            // Si el error es por email duplicado 
            if (error.code === 11000) {
                return response.status(400).send({
                    message: "Este email ya está registrado, porfavor prueba con otro",
                    ok: false
                });
            }

            // Si vos mismo lo lanzaste con un throw { status, message }
            if (error.status) {
                return response.status(error.status).send({
                    message: error.message,
                    ok: false
                });
            }

            // Error desconocido
            return response.status(500).send({
                message: "Disculpanos hubo un error, estamos trabajando en ello!!!",
                ok: false
            });
        }
    }
    // cuando el usuario le da click al link q enviamos a su mail nos llega la consulta al verify: 

    async verify(request, response) { // necesitamos capturar el parametro de consulta, query string verify token 
        try {
            //primero verifico q el token lo emiti yo y q existe ese token. en el modelo de usuarios debe estar lapropiedad verified.
            const verifyToken = request.query.verify_token;
            if (!verifyToken) {
                response.status(400).send({ message: "se necesita el token", ok: false });
                return
            }
            //si el toke exiate lo verificamos 
            const decoded = jwt.verify(verifyToken, ENVIRONMENT.JWT_SECRET_KEY); //devuelve decoded que deberia tener un mail
            console.log({ decoded })

            await userRepo.verifyUserMail({ email: decoded.email }) //por ultimo validamos al usuario

            response.send({
                ok: true,
                message: "Email verificado exitosamente"
            })


        }
        catch (error) {
            console.log("error : ", error)
            if (error.status) {//si el error tiene status respondo con esto , es mi error
                response.status(error.status).send({ message: error.message, ok: false })
                return

            }
            else {
                response.status(500).send({ message: "El token es invalio, hubo un error", ok: false }); //si el error no tiene status respondo con esto
            }

        }

    }

    async login(request, response) {
        try {
            const { email, password } = request.body;
            if (!email) {
                throw { status: 400, message: "El email es requerido" }//si el email no existe
            }
            if (!password) {
                throw { status: 400, message: "La contraseña es requerida" }//si el password no existe
            }
            //paso 1.1 :  buscal al usuario en la db por mail.

            const user = await userRepo.findByMail({ email: email })
            console.log(user.id)
            if (!user) {
                throw { status: 404, message: "User not found" }
            }

            //paso 1.2 :  verificamos si el mail esta verificado

            if (!user.verified) {
                throw { status: 400, message: "Email no verificado, verifiquelo porfavor." }
            }

            //paso 2 : verificar si la password q el  usuario paso coincide con la que tengo en la db 
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw { status: 401, message: "Contraseña incorrecta" }
            }
            //paso 3 : crear un token con los datos no-sensibles del usuario , es decir crear la sesion. 
            const autorizathionToken = jwt.sign({
                email: user.email,
                name: user.name,
                created_at: user.created_at,
                id: user.id
            }, ENVIRONMENT.JWT_SECRET_KEY)
            //paso 4 : responder con el token , le pasamos eltoken al clientee.
            response.send({
                data: { autorizathionToken: autorizathionToken },
                ok: true,
                message: "usuario logeado",
                status: 200
            })

        }
        catch (error) {
            console.log("hubo un error : ", error)
            if (error.status) {
                response.status(error.status).send({ message: error.message, ok: false })
            }
        }

    }

    async sendVerification(request, response) {
        try {
            const { email } = request.body;
            //buscamos en la db al usuario por mail
            const user = await userRepo.findByMail({ email }) // nos traemos al usuario

            //chequeamos q exista el usuario
            if (!user) {
                throw { status: 404, message: "Usuario no encontrado" }
            }
            if (user.verified) {
                throw { status: 400, message: "Email ya verificado" }
            }
            //creamos un token de verificacion para generar la url de verificacion 
            const verToken = createVerificationToken(email)
            const redirect_url = buildVerificationRedirectUrl(verToken);
            await sendVerificationEmail({ email, name: user.name, redirect_url: redirect_url })
            response.send({
                ok: true,
                message: "Se reenvió el mail de verificación correctamente",
                status: 200
            });
        }
        catch (error) {
            console.log("error : ", error)
            if (error.status) {//si el error tiene status respondo con esto , es mi error
                response.status(error.status).send({ message: error.message, ok: false })
                return

            }
            else {
                response.status(500).send({ message: "El token es invalido, hubo un error", ok: false }); //si el error no tiene status respondo con esto
            }

        }

    }






}

const userController = new UserController();

export default userController;