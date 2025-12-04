import { generateToken } from "../data/token.js"; // importamos la funcion ara generar el token

const default_user = {  // Usuario de prueba definido directamente en el controlador para simular la base de datos de usuarios.
    email: "test@gmail.com",
    password: "123456"
};

export async function login(req, res) {  // Funcion controlador para manejar el inicio de sesión de un usuario.
    const { email, password } = req.body;  // Extraemos las credenciales del cuerpo de la solicitud (req.body).
    if (email && password) {  // Confirmamos de la existencia de credenciales (Validación de entrada).
        if (email === default_user.email && password === default_user.password) {  // Verificación de credenciales válidas (simulación de verificación en DB). 
            const user = { email: email, id: "123" }  // Credenciales correctas: Preparamos el payload del usuario.
            const token = await generateToken(user);  // Generamos el JSON Web Token (JWT) para la sesión
            res.json({ token });  // Respuesta exitosa (200 OK) devolviendo el token al cliente.
        } else {  // Credenciales incorrectas (usuario o contraseña no coinciden).
            const error = new Error()
            error.message = "Usuario no autorizado... "
            error.internalCode = "ERROR_A_C (login)"
            error.statusCode = 401  // Error 401 Unauthorized: Las credenciales son inválidas.
            throw error // Lanzamos el error para ser capturado.
        }
    } else {  // Credenciales faltantes (email o password no fueron enviados en el body).
        const error = new Error()
        error.message = "Se requiere Email y password para iniciar sesion... "
        error.internalCode = "ERROR_A_C2 (login)"
        error.statusCode = 401  // Error 401 Unauthorized: Faltan credenciales para la autenticación.
        throw error // Lanzamos el error para ser capturado.
    }
}
