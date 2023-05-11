// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, Timestamp, FieldValue, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import {
    FIREBASE_API_KEY, 
    FIREBASE_AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    SENDER_ID,
    APP_ID,
} from "@env"
// Initialize Firebase
// const analytics = getAnalytics(app);
// // firestore database test
// const { applicationDefault, cert } = require('firebase/app');
// const serviceAccount = require('./serviceAccountKey.json');


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: SENDER_ID,
    appId: APP_ID,
};
console.log({ FIREBASE_API_KEY });
// Initialize Firebase
 const app = initializeApp(firebaseConfig);

// initializeApp({
//   credential: cert(serviceAccount)
// });

const db = getFirestore();
const auth = getAuth(app);
// end test

////////////
// const precarga = async () => {
//     try {
//         const citiesRef = collection(db, 'proyecto');
//         await setDoc(doc(citiesRef, "tarea1"), {
//             name: "Escribir", state: "Completo"
//         });
//         await setDoc(doc(citiesRef, "tarea2"), {
//             name: "Leer", state: "Completo"
//         });
//         await setDoc(doc(citiesRef, "tarea3"), {
//             name: "Redactar", state: "Completo"
//         });
//         await setDoc(doc(citiesRef, "tarea4"), {
//             name: "Escuchar", state: "Incompleto"
//         });
//         await setDoc(doc(citiesRef, "tarea5"), {
//             name: "Dibujar", state: "Incompleto"
//         });
//     } catch (error) {
//         alert(error)
//     }
// }
////////////
 // const testDB = async () => {
    //     const todoDoc = doc(db, "proyecto", "tarea2");
    //     const docSnap = await getDoc(todoDoc);
    //     console.log("Document data:", docSnap.data());
    // }
    // testDB()

////////////

//export const app = initializeApp(firebaseConfig);
export {db, auth}
// export const auth = getAuth(app);
