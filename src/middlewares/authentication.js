import jwt from 'jsonwebtoken';  // Importamos la librería para trabajar con JSON Web Tokens (JWT).
import 'dotenv/config';  // Importamos la librería para cargar variables de entorno desde el archivo .env.

const secret_key = process.env.JWT_SECRET_KEY;  // Obtenemos la clave secreta desde las variables de entorno para verificar la firma del token.

export const authentication = (req, res, next) => {  // Funcion para verificar la validez del token JWT en cada solicitud. Determina si el usuario está autenticado y tiene acceso a la ruta.
    const authHeader = req.headers['authorization']  // Intentamos obtener el encabezado de autorización.
    if (authHeader) {  // Verificamos si existe el encabezado de autorización.
        const token = req.headers['authorization'].split(" ")[1];  // Extraemos el token: dividimos por espacio y tomamos el segundo elemento (el token).
        jwt.verify(token, secret_key, (err) => {  // Verificamos el token con la clave secreta.
            if (err) {  // Si jwt.verify devuelve un error (token inválido, alterado o expirado).
                const error = new Error();
                error.message = "Token inválido o expirado. Acceso denegado.";  // Error 403 Forbidden: El cliente envió credenciales, pero no son válidas o no otorgan permiso para la acción.
                error.internalCode = "ERROR_AUTH (authentication)";
                error.statusCode = 403;
                return next(error)  // Pasamos el error al manejador central (Error Handler) y detenemos la ejecución.
            }
            next();  // Si el token es válido, pasamos al siguiente middleware/ruta.
        });
  } else {  // Si el encabezado 'Authorization' no existe (falta el token).        
        const error = new Error()
        error.message = "Usuario no autorizado ... "
        error.internalCode = "ERROR_AUTH (authentication)"
        error.statusCode = 401  // Error 401 Unauthorized: El cliente no proporcionó credenciales válidas. 
        next(error)  // Pasamos el error al manejador central.
    }
}