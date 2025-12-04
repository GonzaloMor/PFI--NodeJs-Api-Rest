
export function errorHandler(err, req, res, next) {  // Middleware central de manejo de errores.
    const statusCode = err.statusCode || 500;   // Si el error tiene un statusCode, lo usamos. De lo contrario, asumimos que es un error de servidor desconocido o fallo de código (500).
    // Usamos 500 para evitar que errores inesperados expongan el servidor o cuelguen la respuesta.
    res.status(statusCode).json({  // Aseguramos que el cliente reciba una respuesta HTTP con el código adecuado. 
        error: true,  // Indicador de que esta es una respuesta de error.
        statusCode,  // El statusCode final que se envió en la cabecera HTTP.
        code: err.internalCode || "ERROR_UNEXPECTED",  // Código interno de la aplicación (ERROR_M, ERROR_C) para el debug. 
        message: err.statusCode === 500 && !err.internalCode ? "Fallo de servicio inesperado. Intente más tarde." : err.message,
        // Mensaje del error (el que se definió en la capa que lanzó el error).
        // Si el error es desconocido, proporcionamos un mensaje seguro para el cliente.
    });
}
