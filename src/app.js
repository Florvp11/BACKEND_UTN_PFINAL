import { ENVIRONMENT } from "./environment.js";
import { connectDB } from "./config/dbConfig.js";

import express, { request, response } from "express";
import usersRouter from "./routes/usersRoutes.js";
import cors from "cors";
import workspaceRouter from "./routes/workspaceRouter.js";
import workspaceMembersRouter from "./routes/workspaceMemberRouter.js";



connectDB();

const app = express();

app.use(cors())//deshabilita la politica de cors

//configura q nuestraAPI pueda recibir json en un body
app.use(express.json());


//creo una ruta que se encarga de manejar usuarios
app.use("/api/users", usersRouter); //cuando use esa direccion se maneja con userrouters
app.use("/api/workspaces", workspaceRouter); //cuando use esa direccion se maneja con workspacesRouter
app.use("/api/members", workspaceMembersRouter)


app.get("/", (request, response) => {
  response.send("soy una respuesta de express");
});


app.listen(ENVIRONMENT.PORT, () => {
  console.log(`La app se escucha en http://localhost:${ENVIRONMENT.PORT}`);
}).on('error', (err) => {
  console.error('Error al levantar el servidor:', err);
});



//a los metodos de consulta le pasamos ("direccion",la callback --> handler = manejador )





