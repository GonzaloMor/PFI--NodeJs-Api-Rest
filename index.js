import express from "express"; // Importamos la libreria express.
import routesProducts from "./src/routes/products.routes.js"; // Importamos las rutas (endpoints).
import routesAuth from "./src/routes/auth.routes.js"  // Importamos las rutas de autenticacion.
import { errorHandler } from "./src/middlewares/errorHandler.js";  //Importamos el manejador de errores.
import cors from "cors";  //Importamos la libreria Cors para la seguridad de las solicitudes.

const app = express();  // Asignamos a app la instancia de express.

const PORT = process.env.PORT || 3000; // Asignamos el puerto donde se correra el servidor local (usando variable de entorno o 3000 por defecto).

const corsConfig = {  // Objeto de configuración para el Middleware CORS (Cross-Origin Resource Sharing).    
    origin: ['http://localhost:3000/', 'https://midominio.com/'],  // Dominios o URLs específicas permitidas para acceder a la API
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos para las solicitudes
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras HTTP permitidas en la solicitud (por ej. para enviar tokens de autenticación)
    exposedHeaders: ['Content-Length'], // Cabeceras de respuesta que el navegador del cliente podrá exponer/ver
    credentials: true,  // Habilitar el envío de cookies o credenciales de autenticación en la solicitud
    maxAge: 600,  // Tiempo (en segundos) que la respuesta preflight OPTIONS puede ser cacheada
    optionsSuccessStatus: 204  // Código de estado HTTP para una respuesta preflight (OPTIONS) exitosa
}

app.use(cors(corsConfig));  // Middleware que aplica la política CORS a la aplicación, usando la configuración definida.

app.use(express.json());  // Middleware que lee y convierte el cuerpo JSON de la solicitud a un objeto JavaScript (req.body).

app.use("/api", routesProducts);  // Middleware que vincula las rutas de productos al prefijo "/api".

app.use("/api", routesAuth); // Middleware que vincula las rutas de autenticacion al prefijo "/api".

app.use((req, res, next) => {  // Middleware a nivel de aplicación (se ejecuta para todas las solicitudes después de las rutas anteriores).
    console.log(`Datos received at: ${req.method} ${req.url}`);  // Imprimimos información sobre la solicitud recibida (método y URL).
    next();  // Llamamos a next() para pasar el control al siguiente middleware o ruta.
});

app.use((req, res, next) => {  // Middleware final para capturar cualquier solicitud cuya URL no haya coincidido con las rutas definidas, enviando un estado 404
    const error = new Error()  // 1. Creamos el objeto Error tipificado.
    error.message = `Recurso no encontrado o ruta inválida...`
    error.internalCode = "ERROR_I (RouteNotFound)"
    error.statusCode = 404 
    next(error)  // 4. Propagamos el error al middleware central de manejo de errores (errorHandler).
});

app.use(errorHandler)  // Middleware de Manejo de Errores Central.

app.listen(PORT, () => {  // Iniciamos el servidor para que escuche en el puerto asignado
    console.log(`Servidor corriendo en http://localhost:${PORT}`);  // Imprimimos un mensaje en la consola indicando que el servidor se ha iniciado correctamente y su URL
});

