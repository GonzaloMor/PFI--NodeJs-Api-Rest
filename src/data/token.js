import jwt from 'jsonwebtoken';  // Importamos la librería para trabajar con JSON Web Tokens (JWT).
import 'dotenv/config';  // Importamos la librería para cargar variables de entorno desde el archivo .env.

const secret_key = process.env.JWT_SECRET_KEY;  // Obtenemos la clave secreta desde las variables de entorno para firmar el token.

export const generateToken = (userData) => {   // Función que genera un JWT firmado para un usuario específico. El token se utiliza para autenticar solicitudes posteriores al servidor.
  const user = {id: userData.id, email: userData.email};  // Definimos la información que se incluirá en el token.
  const expiration = { expiresIn: '1h' };  // Definimos la expiración del token (Expires In: '1h').
  return jwt.sign(user, secret_key, expiration);  // Creación y Firma del Token: jwt.sign() toma el payload, la clave secreta y las opciones de expiración.
  // El token resultante está firmado y es seguro para ser enviado al cliente.
}
