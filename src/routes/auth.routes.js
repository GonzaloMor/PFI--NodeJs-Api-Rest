import express from "express";  // Importamos la librería Express.
import {login} from "../controllers/auth.controllers.js";  // Importamos la función controladora de login desde la capa de Controladores de autenticación.  

const routes = express.Router();  // Creamos una nueva instancia del Router de Express.
routes.post("/login", login); // Definición de la ruta login, y la función `login' cuando se recibe una petición POST en esta ruta.

export default routes  // Exportamos el objeto routes para que pueda ser utilizado por la aplicación principal de Express.