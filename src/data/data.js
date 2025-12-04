import 'dotenv/config';  // Importa y carga las variables de entorno definidas en el archivo .env
import { initializeApp } from "firebase/app"; // Importa las funciones necesarias del SDK de Firebase
import { getFirestore } from 'firebase/firestore';  // Importa la función para obtener una referencia a la instancia de Firestore (la base de datos db)

const firebaseConfig = {  // Objeto de configuración que contiene las credenciales y detalles del proyecto Firebase
    apiKey: process.env.FIREBASE_API_KEY, // Clave pública de la API, obtenida de las variables de entorno para mayor seguridad
    authDomain: process.env.FIREBASE_AUTH_DOMAIN, // Dominio utilizado para la autenticación
    projectId: "api-rest-nodejs-final", // Identificador único del proyecto de Firebase
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Bucket de almacenamiento para archivos (Storage)
    messagingSenderId: "849624007996", // ID del remitente de mensajería (utilizado para Cloud Messaging)
    appId: process.env.FIREBASE_APP_ID  // ID único de la aplicación Firebase
};

const app = initializeApp(firebaseConfig);  // Creamos una instancia de la aplicación Firebase,usando el objeto de configuración.

const db = getFirestore(app);  // Obtiene una referencia a la base de datos Firestore, asociada a la aplicación Firebase inicializada.

export { db };  // Exporta la referencia a la base de datos (db) para que pueda ser utilizada.