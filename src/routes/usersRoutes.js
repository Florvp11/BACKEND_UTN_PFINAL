//este archivo 'RUTA' se encarga de manejar la ruta de usuarios
import express from "express";
import userController from "../controller/userController.js";

//creo una ruta que se encarga de manejar usuarios

const usersRouter = express.Router();
//cuando alguien se queira registrar 
usersRouter.post("/register", userController.register);
/*-----------------------cuando alguien verifique su email----------------------------------------*/
usersRouter.get("/verify", userController.verify)
/*----------------------cuando alguien quiera logear------------------------------------*/
usersRouter.post("/login", userController.login)
/*----------------------cuando alguien quiera q le reenviemos el verification mail------------------------------------*/
usersRouter.get("/sendVerification", userController.sendVerification)

export default usersRouter;
