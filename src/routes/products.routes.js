import express from "express"; // Importamos la librería Express.

import {  // Importamos las funciones controladoras.
   getAllproductsController,
   getProductByIdController, 
   addNewProductController, 
   delProductByIdController, 
   editProductByIdController
} from "../controllers/products.controllers.js";

import { authentication } from "../middlewares/authentication.js";  // Importamos el middleware de autenticación.

const routes = express.Router();  // Creamos una instancia de Router, que es un objeto de Express para manejar rutas modulares y montables.

// Definimos las rutas (endpoints).
// Método: GET (para obtener recursos)
// Path: "/products" (la URL completa será generalmente "/api/products")
// Handler: Cuando se accede a esta ruta, se ejecuta la función getAllproductsController.
routes.get("/products", getAllproductsController);
routes.get("/products/:id", getProductByIdController);
routes.post("/products/create", authentication, addNewProductController);  // La función 'authentication' se ejecuta primero para validar el JWT.
routes.delete("/products/:id", authentication, delProductByIdController);
routes.patch("/products/:id", authentication, editProductByIdController);

export default routes;  // Exportamos el objeto 'routes' para que pueda ser utilizado/aplicado por la aplicación principal (index.js).