import jwt from 'jsonwebtoken'
import { ENVIRONMENT } from '../environment.js'



//Middleware es una funcion que se ejecuta entre medio de un proceso
//Entre la request y la respons quiero checkear si laa  request  es de tipo json y de asi guardar en el body el json de la consulta
//Entre la request y la respons quiero checkear si un token pasado por header es valido

const authorizationMiddleware = (request, response, next) => {
    try {
        const authorizationHeader = request.headers['authorization']
        const authorization_type = authorizationHeader.split(' ')[0]
        const authorizationToken = authorizationHeader.split(' ')[1]
        const authorization_token_payload = jwt.verify(authorizationToken, ENVIRONMENT.JWT_SECRET_KEY)
        //todos los datos que habia en authhorization token se guardan en REQUEST.USER
        request.user = authorization_token_payload
        console.log(request.user)
        next()
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            response.status(401).send({
                ok: false,
                message: 'Token invalido',
                status: 401
            })
        }
        else {
            response.status(500).send(
                {
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                }
            )
        }
    }
}

export default authorizationMiddleware