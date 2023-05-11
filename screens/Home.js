import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config';
import { getFirestore, Timestamp, FieldValue, collection, doc, setDoc, getDocs, getDoc, deleteDoc, orderBy, query, startAt } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Home = () => {
    const [todos, setTodos] = useState([]);
    const todoRef = collection(db, 'proyecto');
    const navigation = useNavigation();
    const [addData, setAddData] = useState('');
    const [refresh, setRefresh] = useState(false);
    const storage = getStorage();
    // const [imageUrl, setImageUrl] = useState(null);

    const getDocsFromDB = async () => {
        const querySnapshot = await getDocs(
            collection(db, "proyecto")
        );
        const dataDocuments = []
        querySnapshot.forEach((doc) => {
            dataDocuments.push({
                key: doc.id,
            })
        });
        //console.log("DataDocuments", dataDocuments)
        setTodos(dataDocuments)
        return dataDocuments;
    }

    const deleteTodo = async (todos) => {
        try {
            await deleteDoc(doc(db, "proyecto", todos.key));
            console.log('Document successfully deleted!')
            const updatedTodos = await getDocsFromDB();
            setTodos(updatedTodos);
            setRefresh(true);
        } catch (error) {
            alert(error)
        }
    }

    const addTodo = async () => {
        if (addData && addData.length > 0) {
            const timestamp = Timestamp.fromDate(new Date());
            const inputElement = document.createElement('input');
            inputElement.type = 'file';
            inputElement.accept = 'image/*';
            inputElement.onchange = async () => {
                const file = inputElement.files[0];
                const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/carloscrud/upload';
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'upload_unsig_preset');
                const response = await fetch(cloudinaryUrl, {
                    method: 'POST',
                    body: formData
                });
                const dataurl = await response.json();
                const imageUrl = dataurl.secure_url;
                console.log(imageUrl)
                const data = { heading: addData, createdAt: timestamp, imageUrl: imageUrl }
                try {
                    await setDoc(doc(db, "proyecto", data.heading), { data });
                    console.log('Document successfully added!');
                    const updatedTodos = await getDocsFromDB();
                    setTodos(updatedTodos);
                    setRefresh(true);
                } catch (error) {
                    alert(error);
                }
            };
            inputElement.click();
        }
    }
    const getImageUrl = async (task) => {
        const querySnapshot = await getDocs(collection(db, "proyecto"));
        querySnapshot.forEach((doc) => {
            if (doc.data().data.heading == task.key) {
                const imageURL = doc.data().data.imageUrl;
                return imageURL
            }
        });
        return null;
    }

    const burnUrl = (item) => {
        return getImageUrl(item)
    }


    useEffect(() => {
        const getTodos = async () => {
            const updatedTodos = await getDocsFromDB();
            setTodos(updatedTodos);
        }
        getTodos();
    }, [refresh])

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.itemHeading}>Lista de tareas</Text>
            <View style={styles.FormContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add Todo"
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(heading) => setAddData(heading)}
                    value={addData}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <TouchableOpacity style={styles.button} onPress={() => addTodo()}>
                    <Text style={styles.buttonText}>
                        Add
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={todos}
                numColumns={1}
                renderItem={({ item }) => (
                    <View>
                        <Pressable
                            style={styles.container}
                            onPress={() => {
                                navigation.navigate('Details', { item, setRefresh })
                            }}>
                            <FontAwesome
                                name='trash-o'
                                color={"red"}
                                onPress={() => deleteTodo(item)}
                                style={styles.todoIcon}
                            />
                            <FontAwesome
                                name="pencil"
                                color={"blue"}
                                onPress={() => {
                                    navigation.navigate('Details', { item, setRefresh })
                                }}
                                style={styles.todoIcon}
                            />
                            <Image source={{ uri: burnUrl(item) }} style={styles.itemImage} />
                            <View style={styles.innerContainer}>
                                <Text style={styles.itemHeading}>
                                    {item.key[0].toUpperCase() + item.key.slice(1)}
                                    {/* {item.key} */}
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                )}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#e5e5e5',
        margin: 5,
        borderRadius: 15,
    },
    itemImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 5,
    },
    innerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 45,
    },
    itemHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 22,
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 100,
    },
    input: {
        height: 50,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 15,
        flex: 1,
        marginRight: 5,
    },
    button: {
        height: 50,
        width: 80,
        backgroundColor: '#788eec',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    todoIcon: {
        marginLeft: 14,
        marginTop: 5,
        fontSize: 20,
    }
}) 
