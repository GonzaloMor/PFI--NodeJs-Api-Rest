// Importamos las funciones específicas de la librería 'firebase/firestore' que necesitaremos.
import {
    doc,        // Referencia a un documento específico
    getDoc,     // Función para leer un documento específico
    collection, // Referencia a una colección
    getDocs,    // Función para leer todos los documentos de una colección
    setDoc,     // Función para crear o sobrescribir un documento específico (con ID definido)
    addDoc,     // Función para agregar un nuevo documento a una colección (con ID generado automáticamente)
    updateDoc,  // Función para actualizar campos de un documento existente
    deleteDoc,  // Función para eliminar un documento
} from "firebase/firestore";

import { db } from "../data/data.js";  // Importamos la referencia a la base de datos Firestore que inicializamos en data.js.


const productsDb = collection(db, "products") // Creamos una referencia a la colección específica de Firestore donde se guardan los productos.
const error = new Error()  // Creamos una nueva instancia de error

export async function getAllProductsModel() {  //Función asíncrona que se encarga de obtener todos los productos desde la base de datos Firestore.
    try {
        const docSnap = await getDocs(productsDb);
        if (!docSnap.empty) { // Verificamos si la colección tiene documentos (no está vacía).
            const allProducts = docSnap.docs.map(doc => { // Mapeamos los documentos a un array de objetos que incluye el ID y los datos del documento.
                const data = doc.data()
                return {
                    id: doc.id, // El ID único del documento en Firestore
                    ...data,    // Propagamos todos los demás campos (nombre, precio, etc.)
                };
            })
            return allProducts
        } else {  // Si la colección está vacía, lanzamos un error 404, el recurso (la lista de productos) no fue encontrado.
            error.message = "La base de datos esta vacia o no existe..."
            error.internalCode = "ERROR_M (getAllProducts1)"
            error.statusCode = 404
            throw error
        }
    } catch (error) {  // Este bloque 'catch' captura errores de infraestructura o conexión (5xx). También puede capturar el error 404 que se lanzó en el bloque 'try'.         
        // Propagamos el error para que sea manejado por la capa de Controllers (usando try...catch/next)
        error.message = "Error al obtener los productos del servidor..."
        error.internalCode = "ERROR_M (getAllProducts2)"
        error.statusCode = 500  // Si es un error inesperado (fallo de conexión a DB, credenciales, etc.), lo tratamos como 500.
        throw error    // Relanzamos el error con las propiedades personalizadas para que sea capturado y manejado por la capa superior (Controllers)
    }
} 

export async function addNewProductModel(productToAdd) {  //Función asíncrona para agregar un nuevo producto a la base de datos Firestore.
    try {
        const docRef = await addDoc(productsDb, productToAdd)  // docRef es la referencia al documento recién creado, incluyendo su ID.
        // console.log(`Doc id: ${docRef.id}, Producto: ${productToAdd.name}`);  // Registro en consola del ID y nombre del producto añadido (útil para debug/logs del servidor).
        return ({ ...productToAdd })  // Devolvemos los datos del producto.
    } catch (error) {  // Este bloque captura cualquier error que ocurra durante la interacción con la DB (Firestore).
        error.message = "Error en el servidor, no se pudo agregar producto..."
        error.internalCode = "ERROR_M (addProduct)"  // Asignamos un código interno para rastreo y depuración en los logs del servidor.
        error.statusCode = 500  // Asignamos el código de estado HTTP 500 (Internal Server Error) para indicar que el fallo fue del lado del servidor/infraestructura.
        throw error    // Relanzamos el error con las propiedades personalizadas para que sea capturado y manejado por la capa superior (Controllers)
    }
}

export async function delProductByIdModel(id) {  //Función asíncrona para eliminar un producto específico de la base de datos por su ID
    try {
        await deleteDoc(doc(productsDb, id));  // Obtenemos la referencia al documento específico y ejecuta la eliminación de ese documento en Firestore
    } catch (error) {  // Este bloque captura errores críticos como fallos de conexión a la DB o de infraestructura.
        error.message = "Error en el servidor, no se pudo eliminar el producto..."  
        error.internalCode = "ERROR_M (delProducts)"   // Asignamos un código interno para rastreo.
        error.statusCode = 500  // Asignamos el código de estado HTTP 500 (Internal Server Error) para indicar un fallo del lado del servidor.
        throw error  // Relanzamos el error para que sea manejado por la capa de Controllers.
    }

}

export async function editProductByIdModel(id, productToUpdated) {  //Función asíncrona para actualizar campos de un producto específico por su ID.
    try {
        const docRef = doc(productsDb, id)  // Obtenemos la referencia al documento específico que se desea actualizar.
        await updateDoc(docRef, productToUpdated)  // Ejecutamos la actualización de los campos en Firestore.
    } catch (error) {  // Este bloque captura errores que ocurran durante la interacción con la DB, 
        error.message = "Error en el servidor, no se pudo actualizazr/editar el producto..."
        error.internalCode = "ERROR_M (editProductById)" // Este bloque captura errores que ocurran durante la interacción con la DB, 
        error.statusCode = 500  // Asignamos el código de estado HTTP 500 (Internal Server Error) para indicar que el fallo fue del lado del servidor/DB. 
        throw error  // Relanzamos el error con las propiedades personalizadas para que sea capturado y manejado por la capa superior (Controllers).
    }
}

