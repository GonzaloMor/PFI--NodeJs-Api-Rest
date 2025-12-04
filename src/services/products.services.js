import {  // Importamos las funciones de la capa models (que interactua directamente con la DB)
  getAllProductsModel,
  addNewProductModel,
  delProductByIdModel,
  editProductByIdModel
} from "../models/products.models.js"

export const getAllProductsService = async () => {  // Funcion servicio para obtener todos los productos.
  const allProducts = await getAllProductsModel()  // Llama directamente al Modelo para obtener los datos.
  return allProducts; // Devuelve los productos obtenidos
};

export const getProductByIdService = async (id) => {  // Funcion servicio para obtener un producto específico por su ID.
  const error = new Error() // Creamos una nueva instancia de error
  const products = await getAllProductsModel() // // Llama directamente al Modelo para obtener todos los productos.
  const productFound = products.find(product => product.id == id);  // Buscamos (find) el producto en la lista de todos los productos (products)
  if (productFound) {  // Si se encuentra el producto, se retorna.
    return productFound
  } else {  // Si no se encuentra, lanzamos un error 404 Not Found.
    error.message = `Producto con el ID:${id} no existe...`
    error.internalCode = "ERROR_S (getProductById)"
    error.statusCode = 404
    throw error  // Lanzamos el error 
  }
};

export const addNewProductService = async (productToAdd) => {  // Funcio servicio para agregar un nuevo producto.
  const newProduct = await addNewProductModel(productToAdd)  // Llama al Modelo para ejecutar la inserción en la DB.
  return newProduct // Retornamos el producto agregado
}

export const delProductByIdService = async (id) => {  // Funcion servicio para eliminar un producto por su ID.
  await getProductByIdService(id);  // Si el producto NO existe, getProductByIdService lanzará el error 404 y la ejecución se detendrá aquí, yendo al catch del Controlador.
  return await delProductByIdModel(id)  // Llama al Modelo para ejecutar la eliminación.
}

export const editProductByIdService = async (id, productToUpdated) => {   
  await getProductByIdService(id)  // Si el producto no existe, getProductByIdService lanza el error 404 y el flujo se detiene aquí.
  return await editProductByIdModel(id, productToUpdated)  // Si el código llega aquí, el producto existe, procedemos con la actualización.
}
