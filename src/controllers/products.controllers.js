import {  // Importamos las funciones de la capa de Servicios, que contienen la lógica de negocio y se comunican con el Modelo.
    getAllProductsService,
    getProductByIdService,
    addNewProductService,
    delProductByIdService,
    editProductByIdService
} from "../services/products.services.js"

export const getAllproductsController = async (req, res, next) => {  // Funcion controlador para obtener todos los productos.
    try {
        const allProducts = await getAllProductsService()  // Llama al servicio para obtener la lista de productos.
        const resData = {
            message: `Estos son todos los productos...`,
            products: allProducts // Devuelve todos los productos.
        };
        res.status(200).json(resData);  // Si se encuentra, respuesta 200 OK con todos los productos.   
    } catch (error) {  // Captura cualquier error lanzado por la capa de Servicios/Modelos (ej. 404, 500) y lo pasa al middleware central de errores (errorHandler).
        return next(error);
    }
};

export const getProductByIdController = async (req, res, next) => {  // Funcion controlador para obtener un producto específico por su ID.
    try {
        const id = req.params.id;  // Extrae el ID del producto de los parámetros de la URL.        
        const product = await getProductByIdService(id)  // Llama al servicio para buscar el producto.
        if (product) { // Verificación de existencia del recurso.
            const resData = {
                message: `Se encontro el producto con id: ${id}...`,
                product: product // Incluye el objeto completo (con ID).
            };
            res.status(200).json(resData);  // Si se encuentra, respuesta 200 OK con el producto encontrado.
        } else { // Si el servicio devuelve null/undefined, lanzamos un error 404 Not Found porque el recurso específico no existe.
            const error = new Error() // Instanciamos un error
            error.message = "Producto no encontrado..."
            error.internalCode = "ERROR_C (getProductById)"
            error.statusCode = 404
            throw error // Se lanza para ser capturado por el catch.
        }
    } catch (error) { // Captura errores lanzados (incluido el 404) y los pasa al errorHandler.
        return next(error);
    }
};

export const addNewProductController = async (req, res, next) => {  // Funcion controlador para agregar un nuevo producto.
    try {
        const productToAdd = req.body;  // Extrae los datos del nuevo producto del cuerpo de la petición.     
        const newProduct = await addNewProductService(productToAdd)  // Llama al servicio para agregar el producto a la base de datos.  
        const resData = {
            message: `Se agregó con éxito el producto...`,
            product: newProduct // Incluye el objeto completo (con ID).
        };
        res.status(201).json(resData);  // Respuesta 201 OK con el producto agregado.
    } catch (error) {  // Delega cualquier error (ej. 400 por validación, 500 por DB) al errorHandler.
        return next(error)
    }
}

export const delProductByIdController = async (req, res, next) => {  //Funcion controlador para eliminar un producto por su ID.
    try {
        const id = req.params.id;  // Guardamos en id el parametro pasado en la URL.            
        if (id) {  // Confirmamos que el ID esté presente en la URL.
            await delProductByIdService(id)  // Llama al servicio para eliminar el producto.
            //res.status(200).send(`El producto con id:${id} ha sido eliminado...`)  // Respuesta 200 OK confirmando la eliminación.
            const resData = {
            message: `El producto con el Id: ${id} ha sido eliminado...`,
            };
        res.status(200).json(resData);  // Respuesta 201 OK con el id del producto eliminado.
        } else {  // Si el ID falta, lanzamos un error 400 Bad Request (solicitud mal formada del cliente).

        }
    } catch (error) {  // Delega errores de servicio (ej. 404 si el ID no existe, 500 por fallo de DB).
        return next(error);
    }
}

export const editProductByIdController = async (req, res, next) => {  //Funcion controlador para editar/actualizar un producto por su ID.
    try {
        const id = req.params.id  // Extrae el ID del producto de los parámetros de la URL.
        const productToUpdated = req.body  // Extrae de body los datos del producto a editar/actualizar    
        if (id && productToUpdated && Object.keys(productToUpdated).length > 0) {  // Confirmamos que el ID y los datos a actualizar existan.                
            await editProductByIdService(id, productToUpdated)  // Llama al servicio para ejecutar la actualización.
            //res.status(200).send(`El producto con el ID:${id} ha sido actualizado...`);  // Respuesta 200 OK confirmando la actualización exitosa.
            const resData = {
            message: `Se actualizo con éxito el producto con id: ${id}...`,
            product: productToUpdated // Incluye el objeto completo (con ID).
        };
        res.status(201).json(resData);  // Respuesta 201 OK con el producto editado/actualizado.
        } else {  // Si faltan datos o el cuerpo está vacío, lanzamos un error 400 Bad Request.                      
            const error = new Error()
            error.message = "Son requeridos ID del producto y los datos a actualizar... "
            error.internalCode = "ERROR_C (editProductById)"
            error.statusCode = 400
            throw error  // Se lanza para ser capturado por el catch.
        }
    } catch (error) {  // Delega cualquier error de servicio (ej. 404, 500) al errorHandler.
        return next(error)
    }
}