// import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { FontAwesome } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { auth, db, precarga } from '../config';
// import { getFirestore, Timestamp, FieldValue, collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';

// //////////////////////////

// const Home = () => {
//    // precarga()

//     const [todos, setTodos] = useState([]);
//     const [test, setTest] = useState([]);

//     const todoRef = collection(db, 'proyecto');
//     const navigation = useNavigation();
//     const [addData, setAddData] = useState('');
//     // useEffect(() => {
//         const getDocsFromDB = async () => {
//             const querySnapshot = await getDocs(collection(db, "proyecto"));
//             const dataDocuments = []

//             querySnapshot.forEach((doc) => {
//                 //console.log(doc.id, " => ", doc.data());
//                 dataDocuments.push({
//                     key: doc.id,
//                 })
//                 //dataDocuments.push(doc.id)
//             });
//             console.log("DataDocuments",dataDocuments)
//             // const testData = [  
//             //     {key: 'Android'},{key: 'iOS'}, {key: 'Java'},{key: 'Swift'},  
//             //     {key: 'Rails'},{key: '.Net'},{key: 'Perl'}  
//             // ]  
//             // console.log("TestData",testData)
//             // setTest(testData)
//             setTodos(dataDocuments)
//         //     const todoRef = await getDocs(collection(db, "proyecto"));
//         //     const querySnapshot = todoRef.forEach(doc => {
//         //         const { heading } = doc.data()
//         //         data.push({
//         //             id: doc.id,
//         //             heading,
//         //         })
//         //         console.log("Document data:", doc.data());
//         //     })
//         //     setTodos(querySnapshot)
//         }
//         // getDocsFromDB()
//     // }, [])

//     const deleteTodo = async (todos) => {
//         try {
//             await deleteDoc(doc(db, "proyecto", todos.key));       
//             console.log('Document successfully deleted!')
//             alert('Document successfully deleted!')
//             const updatedTodos = await getDocsFromDB();
//             setTodos(updatedTodos);

//         } catch (error) {
//             alert(error)
//         }
//     }

//     const addTodo = async () => {
//         if (addData && addData.length > 0) {
//             const timestamp = Timestamp.fromDate(new Date("December 10, 1815"))
//             const data = {
//                 heading: addData,
//                 createdAt: timestamp
//             }
//             try {
//                 await setDoc(doc(db, "proyecto", data.heading), {
//                     name: "Escribir", state: "Completo"
//                   });
//                   console.log('Document successfully added!')
//                   alert('Document successfully added!')
//                   const updatedTodos = await getDocsFromDB();
//                   setTodos(updatedTodos);
//             } catch (error) {
//                 alert(error)
//             }
//         }
//     }
//     useEffect(() => {
//         const getTodos = async () => {
//             const updatedTodos = await getDocsFromDB();
//             setTodos(updatedTodos);
//         }

//         getTodos();
//     }, [todos]);
    
    
//     return (
//         <View style={{ flex: 1 }}>
//              <Text style={styles.itemHeading}>
//                         Lista de tareas
//                     </Text>
//            <View style={styles.FormContainer}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Add Todo"
//                     placeholderTextColor='#aaaaaa'
//                     onChangeText={(heading) => setAddData(heading)}
//                     value={addData}
//                     underlineColorAndroid='transparent'
//                     autoCapitalize='none'
//                 />
//                 <TouchableOpacity style={styles.button} 
//                 onPress={() => addTodo()}
//                 >
//                     <Text style={styles.buttonText}>
//                         Add
//                     </Text>
//                 </TouchableOpacity>
//             </View>
  
//             <FlatList
//                 // data={[  
//                 //     {key: 'Android'},{key: 'iOS'}, {key: 'Java'},{key: 'Swift'},  
//                 //     {key: 'Rails'},{key: '.Net'},{key: 'Perl'}  
//                 // ]}
//                 data = {todos}
//                 numColumns={1}
//                 renderItem={({ item }) => (
//                     <View>
//                         <Pressable
//                             style={styles.container}
//                             onPress={() => {
//                                 navigation.navigate('Detail', { item })
//                             }}
//                         />
//                         <FontAwesome
//                             name='trash-o'
//                             color={"red"}
//                            onPress={() => deleteTodo(item)}
//                             style={styles.todoIcon}
//                         /> 
//                         <View style={styles.innerContainer}>
//                             <Text style={styles.itemHeading}>
//                                 {/* {item.key[0].toUpperCase() + item.key.slice(1)} */}
//                                 {item.key}
//                             </Text>
//                         </View>
//                     </View>
//                 )}
//             />
  
  
  
  
//   {/*
//             <FlatList
//                 data={todos}
//                 numColumns={1}
//                 renderItem={({ item }) => (
//                     <View>
//                         <Pressable
//                             style={styles.container}
//                             onPress={() => {
//                                 navigation.navigate('Detail', { item })
//                             }}
//                         />
//                         <FontAwesome
//                             name='trash-o'
//                             color={red}
//                             onPress={() => deleteTodo(item)}
//                             style={styles.todoIcon}
//                         /> 
//                         <View style={styles.innerContainer}>
//                             <Text style={styles.itemHeading}>
//                                 {item.heading[0].toUpperCase() + item.heading.slice(1)}
//                             </Text>
//                         </View>
//                     </View>
//                 )}
//             /> */}
//         </View>
//     )
// }

// export default Home

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 15,
//         backgroundColor: '#e5e5e5',
//         margin: 5,
//         borderRadius: 15,
//     },
//     innerContainer: {
//         flexDirection: 'column',
//         alignItems: 'center',
//         marginLeft: 45,
//     },
//     itemHeading: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginRight: 22,
//     },
//     formContainer: {
//         flexDirection: 'row',
//         height: 80,
//         marginLeft: 10,
//         marginRight: 10,
//         marginTop: 100,
//     },
//     input: {
//         height: 50,
//         borderRadius: 5,
//         overflow: 'hidden',
//         backgroundColor: 'white',
//         paddingLeft: 15,
//         flex: 1,
//         marginRight: 5,
//     },
//     button: {
//         height: 50,
//         width: 80,
//         backgroundColor: '#788eec',
//         borderRadius: 5,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 20,
//     },
//     todoIcon: {
//         marginLeft: 14,
//         marginTop: 5,
//         fontSize: 20,
//     }
// }) 

// // import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native';
// // import React, { useEffect, useState } from 'react';
// // import { FontAwesome } from '@expo/vector-icons';
// // import { useNavigation } from '@react-navigation/native';

// // const Home = () => {
// //     return (
// //         <View style={{ flex: 1 }}>
// //              <Text style={styles.container}>
// //                         test title
// //                     </Text>
// //         </View>
// //     )
// // }

// // export default Home

// // const styles = StyleSheet.create({
// //     container: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         padding: 15,
// //         backgroundColor: '#e5e5e5',
// //         margin: 5,
// //         borderRadius: 15,
// //     },
  
// // }) 

// import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable, Image } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { FontAwesome, AntDesign  } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { auth, db, precarga } from '../config';
// import { getFirestore, Timestamp, FieldValue, collection, doc, setDoc, getDocs, deleteDoc, orderBy, query, startAt } from 'firebase/firestore';
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { subirIconoProyecto } from '../helpers/image';




// const Home = () => {
//     const [todos, setTodos] = useState([]);
//     const todoRef = collection(db, 'proyecto');
//     const navigation = useNavigation();
//     const [addData, setAddData] = useState('');
//     const [refresh, setRefresh] = useState(false);
//     const storage = getStorage();

//     const getDocsFromDB = async () => {
//         const querySnapshot = await getDocs(
//             collection(db, "proyecto")
//         );
//         const dataDocuments = []
//         querySnapshot.forEach((doc) => {
//             dataDocuments.push({
//                 key: doc.id,
//             })
//         });
//         console.log("DataDocuments", dataDocuments)
//         setTodos(dataDocuments)
//         return dataDocuments;
//     }

//     const deleteTodo = async (todos) => {
//         try {
//             await deleteDoc(doc(db, "proyecto", todos.key));
//             console.log('Document successfully deleted!')
//             const updatedTodos = await getDocsFromDB();
//             setTodos(updatedTodos);
//             setRefresh(true);

//         } catch (error) {
//             alert(error)
//         }
//     }

//     const addTodo = async () => {
//         if (addData && addData.length > 0) {
//             const timestamp = Timestamp.fromDate(new Date());
//             const data = {
//                 heading: addData,
//                 createdAt: timestamp
//             }
//             try {
//                 await setDoc(doc(db, "proyecto", data.heading), { data });
//                 console.log('Document successfully added!')
//                 const updatedTodos = await getDocsFromDB();
//                 setTodos(updatedTodos);
//                 setRefresh(true);
//                 await addImage();
//             } catch (error) {
//                 alert(error)
//             }
//         }
//     }
//     const addImage = async () => {
//         const fileInput = document.createElement('input');
//         fileInput.type = 'file';
//         fileInput.addEventListener('change', async () => {
//           const file = fileInput.files[0];
//           const storageRef = ref(storage, 'images/' + file.name);
//           console.log(storageRef)
//           try {
//             const downloadUrl = await subirIconoProyecto(storageRef)
//             console.log(downloadUrl)
//             // await uploadBytes(storageRef, file);
//             // const downloadUrl = await getDownloadURL(storageRef);
//             const imgData = {
//               url: downloadUrl,
//               createdAt: Timestamp.fromDate(new Date())
//             };
//             await setDoc(doc(db, "images", imgData.url), { imgData });
//             console.log('Image successfully added!');
//           } catch (error) {
//             alert(error.message);
//           }
//         });
//         fileInput.click();
//       }

//     useEffect(() => {
//         const getTodos = async () => {
//             const updatedTodos = await getDocsFromDB();
//             setTodos(updatedTodos);
//         }
//         getTodos();
//     }, [refresh])

//     return (
//         <View style={{ flex: 1 }}>
//             <Text style={styles.itemHeading}>Lista de tareas</Text>
//             <View style={styles.FormContainer}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Add Todo"
//                     placeholderTextColor='#aaaaaa'
//                     onChangeText={(heading) => setAddData(heading)}
//                     value={addData}
//                     underlineColorAndroid='transparent'
//                     autoCapitalize='none'
//                 />
//                 <TouchableOpacity style={styles.button} onPress={() => addTodo()}>
//                     <Text style={styles.buttonText}>
//                         Add
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//             <FlatList
//                 data={todos}
//                 numColumns={1}
//                 renderItem={({ item }) => (
//                     <View>
//                         <Pressable
//                             style={styles.container}
//                             onPress={() => {
//                                 navigation.navigate('Details', { item, setRefresh })
//                             }}>
//                             <FontAwesome
//                                 name='trash-o'
//                                 color={"red"}
//                                 onPress={() => deleteTodo(item)}
//                                 style={styles.todoIcon}
//                             />
                            
//                             <FontAwesome
//                                 name="pencil"
//                                 color={"blue"}
//                                 onPress={() => {
//                                     navigation.navigate('Details', { item, setRefresh })
//                                 }}
//                                 style={styles.todoIcon}
//                             />
//                             {/* <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={styles.itemImage} /> */}
//                             <Image source={require('../images/duck.jpg')} style={styles.itemImage} />

//                             <View style={styles.innerContainer}>
//                                 <Text style={styles.itemHeading}>
//                                     {item.key[0].toUpperCase() + item.key.slice(1)}
//                                     {/* {item.key} */}
//                                 </Text>
//                             </View>
//                         </Pressable>
//                     </View>
//                 )}
//             />
//         </View>
//     )
// }

// export default Home

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 15,
//         backgroundColor: '#e5e5e5',
//         margin: 5,
//         borderRadius: 15,
//     },
//     itemImage: {
//         width: 50,
//         height: 50,
//         resizeMode: 'contain',
//         borderRadius: 5,
//     },
//     innerContainer: {
//         flexDirection: 'column',
//         alignItems: 'center',
//         marginLeft: 45,
//     },
//     itemHeading: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginRight: 22,
//     },
//     formContainer: {
//         flexDirection: 'row',
//         height: 80,
//         marginLeft: 10,
//         marginRight: 10,
//         marginTop: 100,
//     },
//     input: {
//         height: 50,
//         borderRadius: 5,
//         overflow: 'hidden',
//         backgroundColor: 'white',
//         paddingLeft: 15,
//         flex: 1,
//         marginRight: 5,
//     },
//     button: {
//         height: 50,
//         width: 80,
//         backgroundColor: '#788eec',
//         borderRadius: 5,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 20,
//     },
//     todoIcon: {
//         marginLeft: 14,
//         marginTop: 5,
//         fontSize: 20,
//     }
// }) 
////////////////////////////////////
// import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable, Image } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { FontAwesome, AntDesign } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { auth, db, precarga } from '../config';
// import { getFirestore, Timestamp, FieldValue, collection, doc, setDoc, getDocs, deleteDoc, orderBy, query, startAt } from 'firebase/firestore';
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const Home = () => {
//     const [todos, setTodos] = useState([]);
//     const todoRef = collection(db, 'proyecto');
//     const navigation = useNavigation();
//     const [addData, setAddData] = useState('');
//     const [refresh, setRefresh] = useState(false);
//     const storage = getStorage();

//     const getDocsFromDB = async () => {
//         const querySnapshot = await getDocs(
//             collection(db, "proyecto")
//         );
//         const dataDocuments = []
//         querySnapshot.forEach((doc) => {
//             dataDocuments.push({
//                 key: doc.id,
//             })
//         });
//         //console.log("DataDocuments", dataDocuments)
//         setTodos(dataDocuments)
//         return dataDocuments;
//     }

//     const deleteTodo = async (todos) => {
//         try {
//             await deleteDoc(doc(db, "proyecto", todos.key));
//             console.log('Document successfully deleted!')
//             const updatedTodos = await getDocsFromDB();
//             setTodos(updatedTodos);
//             setRefresh(true);
//         } catch (error) {
//             alert(error)
//         }
//     }

//     const addTodo = async () => {
//         if (addData && addData.length > 0) {
//             const timestamp = Timestamp.fromDate(new Date());
//             const inputElement = document.createElement('input');
//             inputElement.type = 'file';
//             inputElement.accept = 'image/*';
//             inputElement.onchange = async () => {
//                 const file = inputElement.files[0];
//                 const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/carloscrud/upload';
//                 const formData = new FormData();
//                 formData.append('file', file);
//                 formData.append('upload_preset', 'upload_unsig_preset');
//                 const response = await fetch(cloudinaryUrl, {
//                     method: 'POST',
//                     body: formData
//                 });
//                 const dataurl = await response.json();
//                 const imageUrl = dataurl.secure_url;
//                 console.log(imageUrl)
//                 const data = { heading: addData, createdAt: timestamp, imageUrl: imageUrl }
//                 try {
//                     await setDoc(doc(db, "proyecto", data.heading), { data });
//                     console.log('Document successfully added!');
//                     const updatedTodos = await getDocsFromDB();
//                     setTodos(updatedTodos);
//                     setRefresh(true);
//                 } catch (error) {
//                     alert(error);
//                 }
//             };
//             inputElement.click();
//         }




//         // if (addData && addData.length > 0) {
//         //     const timestamp = Timestamp.fromDate(new Date());
//         //     const data = {heading: addData,createdAt: timestamp}
//         //     try {
//         //         await setDoc(doc(db, "proyecto", data.heading), { data });
//         //         console.log('Document successfully added!')
//         //         const updatedTodos = await getDocsFromDB();
//         //         setTodos(updatedTodos);
//         //         setRefresh(true);
//         //         //await addImage();
//         //     } catch (error) {
//         //         alert(error)
//         //     }
//         // }
//     }
//     const addImage = async (task) => {
//         const querySnapshot = await getDocs(
//             collection(db, "proyecto", task)
//         );
//         console.log(querySnapshot)
//         return querySnapshot

//         // const fileInput = document.createElement('input');
//         // fileInput.type = 'file';
//         // fileInput.addEventListener('change', async () => {
//         //   const file = fileInput.files[0];
//         //   const storageRef = ref(storage, 'images/' + file.name);
//         //   console.log(storageRef)

//         //   try {
//         //     const downloadUrl = await cloudinary.v2.uploader.upload(storageRef, {
//         //         public_id: `${uuidv4()}`,
//         //         folder: "IconoCRUD",
//         //       });
//         //     console.log(downloadUrl)
//         //     // await uploadBytes(storageRef, file);
//         //     // const downloadUrl = await getDownloadURL(storageRef);
//         //     // const imgData = {
//         //     //   url: downloadUrl,
//         //     //   createdAt: Timestamp.fromDate(new Date())
//         //     // };
//         //     // await setDoc(doc(db, "images", imgData.url), { imgData });
//         //     console.log('Image successfully added!');
//         //   } catch (error) {
//         //     alert(error.message);
//         //   }
//         // });
//         // fileInput.click();
//     }

//     useEffect(() => {
//         const getTodos = async () => {
//             const updatedTodos = await getDocsFromDB();
//             setTodos(updatedTodos);
//         }
//         getTodos();
//     }, [refresh])

//     return (
//         <View style={{ flex: 1 }}>
//             <Text style={styles.itemHeading}>Lista de tareas</Text>
//             <View style={styles.FormContainer}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Add Todo"
//                     placeholderTextColor='#aaaaaa'
//                     onChangeText={(heading) => setAddData(heading)}
//                     value={addData}
//                     underlineColorAndroid='transparent'
//                     autoCapitalize='none'
//                 />
//                 <TouchableOpacity style={styles.button} onPress={() => addTodo()}>
//                     <Text style={styles.buttonText}>
//                         Add
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//             <FlatList
//                 data={todos}
//                 numColumns={1}
//                 renderItem={({ item }) => (
//                     <View>
//                         <Pressable
//                             style={styles.container}
//                             onPress={() => {
//                                 navigation.navigate('Details', { item, setRefresh })
//                             }}>
//                             <FontAwesome
//                                 name='trash-o'
//                                 color={"red"}
//                                 onPress={() => deleteTodo(item)}
//                                 style={styles.todoIcon}
//                             />
//                             <FontAwesome
//                                 name="pencil"
//                                 color={"blue"}
//                                 onPress={() => addImage(item)}
//                                 // onPress={() => {
//                                 //     navigation.navigate('Details', { item, setRefresh })
//                                 // }}
//                                 style={styles.todoIcon}
//                             />
//                             {/* <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={styles.itemImage} /> */}
//                             {/* <Image source={require('../images/duck.jpg')} style={styles.itemImage} /> */}
//                             <Image source={() => addImage(item)} style={styles.itemImage} />
//                             <View style={styles.innerContainer}>
//                                 <Text style={styles.itemHeading}>
//                                     {item.key[0].toUpperCase() + item.key.slice(1)}
//                                     {/* {item.key} */}
//                                 </Text>
//                             </View>
//                         </Pressable>
//                     </View>
//                 )}
//             />
//         </View>
//     )
// }

// export default Home

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 15,
//         backgroundColor: '#e5e5e5',
//         margin: 5,
//         borderRadius: 15,
//     },
//     itemImage: {
//         width: 50,
//         height: 50,
//         resizeMode: 'contain',
//         borderRadius: 5,
//     },
//     innerContainer: {
//         flexDirection: 'column',
//         alignItems: 'center',
//         marginLeft: 45,
//     },
//     itemHeading: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginRight: 22,
//     },
//     formContainer: {
//         flexDirection: 'row',
//         height: 80,
//         marginLeft: 10,
//         marginRight: 10,
//         marginTop: 100,
//     },
//     input: {
//         height: 50,
//         borderRadius: 5,
//         overflow: 'hidden',
//         backgroundColor: 'white',
//         paddingLeft: 15,
//         flex: 1,
//         marginRight: 5,
//     },
//     button: {
//         height: 50,
//         width: 80,
//         backgroundColor: '#788eec',
//         borderRadius: 5,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 20,
//     },
//     todoIcon: {
//         marginLeft: 14,
//         marginTop: 5,
//         fontSize: 20,
//     }
// }) 
///////////////////////////