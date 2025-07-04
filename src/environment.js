//configuracion de las variables de entorno

import dotenv from "dotenv"; //require es para importar, me traje la libreria dotenv

dotenv.config(); //carga las V.entorno de la cpu  y de env en la variables process.env

export const ENVIRONMENT = {
    //Esto lo exportamos abajo
    API_KEY: process.env.API_KEY,
    DB_URL: process.env.DB_URL,
    DB_NAME: process.env.DB_NAME,
    PORT: process.env.PORT,
    GMAIL_PASS: process.env.GMAIL_PASS,
    GMAIL_USER: process.env.GMAIL_USER,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    DB_MONGOA_PASSWORD: process.env.DB_MONGOA_PASSWORD,
};
