import { View, Text, StyleSheet, TextInput, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../config';
import { Timestamp, collection, doc, setDoc, getDocs, deleteDoc, query} from 'firebase/firestore';

const Details = ({ route, refreshBoolean }) => {
    const { setRefresh } = route.params;
    const [textHeading, setTextHeading] = useState('');
    const [routeKey, setRouteKey] = useState(route.params.item.key)
    const navigation = useNavigation();
    const [imageUrlConst, setImageUrlConst] = useState("");

    const updateTodo = async () => {
        const timestamp = Timestamp.fromDate(new Date());
        const querySnapshot = await getDocs(collection(db, "proyecto"));
        querySnapshot.forEach((doc) => {
            if (doc.data().data.heading == routeKey) {
                setImageUrlConst(doc.data().data.imageUrl)
            }
        })
        const data = {
            heading: textHeading,
            createdAt: timestamp,
            imageUrl: imageUrlConst
        }
        try {
            if (textHeading && textHeading.length > 0) {
                // await updateDoc(todoRef, {
                //     name: textHeading
                // });
                await setDoc(doc(db, "proyecto", data.heading), { data });
                await deleteDoc(doc(db, "proyecto", routeKey));
                console.log('Document successfully updated!')
                setRefresh(true);
                //navigation.navigate('Home')
                navigation.goBack();
            }
        } catch (error) {
            alert(error)
        }
    }
    const getImageUrl = async () => {
        const querySnapshot = await getDocs(collection(db, "proyecto"));
        querySnapshot.forEach((doc) => {
            if (doc.data().data.heading == routeKey) {
                const imageURL = doc.data().data.imageUrl;
                setImageUrlConst(imageURL);
                const returnUrl = imageURL
                return returnUrl
            }
        });
        return imageUrlConst
    }
    const burnUrl = () =>{
        getImageUrl()
        return imageUrlConst
    }

    return (
        <View>
            <Text style={styles.itemHeading}>{ routeKey[0].toUpperCase() + routeKey.slice(1)}</Text>
            <TextInput
                style={styles.textField}
                //placeholder={routeKey}
                placeholder={"Nuevo nombre de tarea"}
                onChangeText={(heading) => setTextHeading(heading)}
                value={textHeading}
            />
            <Image source={{uri: burnUrl()}} style={styles.itemImage} />
            <Pressable
                style={styles.buttonUpdate}
                onPress={() => updateTodo()}>
                <Text>Actualizar tarea</Text>
            </Pressable>
            <Pressable
                style={styles.buttonBack}
                onPress={() => navigation.goBack()}>
                <Text>Volver</Text>
            </Pressable>
        </View>
    )
}

export default Details

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        marginLeft: 15,
        marginRight: 15,
    },
    textField: {
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    buttonUpdate: {
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
        elevation: 10,
        backgroundColor: '#788eec',
    },
    buttonBack: {
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
        elevation: 10,
        backgroundColor: '#188aec',
    },
    itemImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 5,
    },
    itemHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 22,
    },
}) 