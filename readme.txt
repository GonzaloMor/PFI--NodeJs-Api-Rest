🏆 API RESTful de Gestión de Recursos (Api-Rest-NodeJS)

🌟 Resumen del Proyecto:
Esta API REST implementa las mejores prácticas de arquitectura, seguridad y manejo de errores. La aplicación está construida sobre Express.js y utiliza una arquitectura de Capas 
(Controller, Service, Model) para garantizar la separación de responsabilidades, la escalabilidad y la facilidad de mantenimiento.
El enfoque principal se puso en el manejo riguroso de errores tipificados y la protección de rutas mediante JSON Web Tokens (JWT).

🏗️ Arquitectura y Patrones de Diseño:
El proyecto sigue un patrón de Diseño de Capas (Three-Tier Architecture) para la gestión del flujo de datos:
1. Controlador (controllers/)
Responsabilidad: Manejo de la solicitud HTTP (extraer datos de req) y la respuesta HTTP (códigos de estado y formato JSON/res.json()).
Delegación: Delega la lógica de negocio a los Servicios.
2. Servicio (services/)
Responsabilidad: Contener la lógica de negocio (validaciones, manipulación de datos, verificación de existencia de recursos).
Inyección de Errores: Es la capa donde se generan y lanzan explícitamente los errores tipificados (throw error) con propiedades statusCode y internalCode (ej. 404 Not Found) 
para su manejo centralizado.
3. Modelo (models/)
Responsabilidad: Abstracción de la fuente de datos. Contiene la lógica exclusiva para las operaciones CRUD directas con la base de datos (Ej. Firestore, MongoDB).

🛡️ Seguridad y Manejo de Errores:
1. Middleware de Autenticación (middlewares/authentication.js)
Mecanismo: Valida la existencia y la validez del token JWT enviado en el encabezado Authorization: Bearer <token>.

Manejo de Errores Tipificados:
401 Unauthorized: Si el token falta en la cabecera.
403 Forbidden: Si el token es inválido (corrupto o expirado).

2. Middleware Central de Errores (errorHandler.js)
Función: Captura cualquier error pasado por next(error) o lanzado (throw error) desde cualquier capa de la aplicación.
Respuesta Estándar: Devuelve una respuesta JSON consistente al cliente, utilizando el statusCode adjunto al objeto Error y 
asegurando que los errores internos del servidor (500) sean opacos para el usuario.

📍 Endpoints de la API (v1)
La API opera sobre el path base /api/v1 (asumido).
Método,Ruta,Descripción,Seguridad,Códigos de Respuesta
POST,/auth/login, Autentica al usuario y genera el JWT., Seguridad: Pública, Codigos de respuesta "200, 401"
GET,/products, Obtiene el listado completo de productos.,Seguridad: Pública, Codigos de respuesta "200, 500"
GET,/products/:id, Obtiene un producto por su ID., Seguridad: Pública, Codigos de respuesta "200, 404"
POST,/products/create, Crea un nuevo recurso de producto., Seguridad : JWT (Protegida), Codigos de respuesta "201 Created, 401, 403, 400"
PATCH,/products/:id, Edita un producto por ID., Seguridad : JWT (Protegida), Codigos de respuesta "200, 401, 404, 400"
DELETE,/products/:id, Elimina un producto por ID., Seguridad : JWT (Protegida), Codigos de respuesta "200, 401, 404"