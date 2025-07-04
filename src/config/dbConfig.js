import mongoose from "mongoose";
import { ENVIRONMENT } from "../environment.js";

//configurar la conexion con mi base de datos en mongoDB

export const connectDB = async () => {
    //necesita tener la uri --> direccion de la base de datos
    try {
        await mongoose.connect(
            `${ENVIRONMENT.DB_URL}/${ENVIRONMENT.DB_NAME}`
        );


        console.log("conexion exitosa");

    } catch (error) {
        console.error("error al conectarse : ", error);
    }
};
