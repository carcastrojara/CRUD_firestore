// import cloudinary from 'cloudinary'
// import {v4 as uuidv4} from 'uuid'
// import {
//     CLOUDINARY_CLOUD_NAME,
//     CLOUDINARY_API_KEY,
//     CLOUDINARY_SECRET,
// } from "@env"

// // Configuration
// cloudinary.v2.config({
//   cloud_name: CLOUDINARY_CLOUD_NAME,
//   api_key: CLOUDINARY_API_KEY,
//   api_secret: CLOUDINARY_SECRET,
// });


// export const subirIcono = async (ruta) => {
//   try {
//     const upload = await cloudinary.v2.uploader.upload(ruta, {
//       public_id: `${uuidv4()}`,
//       folder: "IconoCRUD",
//     });
//     return upload.secure_url;
//   } catch (error) {
//     return error
//   }
// };

// // export const borrarImagen = async (iconoUrl) => {
// //   try {
// //     const idPublica = await iconoUrl.split("/");
// //     const id = await idPublica[8].split(".");
// //     const resultado = await cloudinary.v2.uploader.destroy(
// //       `${idPublica[7]}/${id[0]}`
// //     );
// //     return { status: resultado };
// //   } catch (error) {
// //     return { error: error.message };
// //   }
// // };
