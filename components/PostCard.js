import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Avatar, Button, Card, Title, Paragraph, Chip } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-paper-grid";
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import firebase from "firebase/app"

export default function PostCard({ data, onPress }) {
    const { 
        address,
        author,
        cuisine,
        description,
        location,
        name,
    } = data

    // console.log(address, author, cuisine, description, location, name)

    // return (
    //     <View>
    //         <Text>
    //             test
    //         </Text>
    //     </View>
    // )


    const { currentUser, currentUserData, setCurrentUserData } = useAuth()
    const docRef = db.collection("users").doc(currentUser.uid)

    const [fave, setFave] = useState(false)

    useEffect(() => {
        if (currentUser && currentUserData && currentUserData.favourites) {
            setFave(currentUserData.favourites.includes(data.id))
        }
    }, [])

    const handleFave = async () => {
        await docRef.update({
            favourites: firebase.firestore.FieldValue.arrayUnion(data.id)
        })
        setCurrentUserData({
            ...currentUserData,
            favourites: [...currentUserData.favourites, data.id]
        })
        setFave(true)
    }

    const handleUnFave = async () => {
        await docRef.update({
            favourites: firebase.firestore.FieldValue.arrayRemove(data.id)
        })
        const faves = [...currentUserData.favourites]
        const index  = faves.indexOf(data.id)
        faves.splice(index, 1)
        setFave({
            ...currentUserData,
            faves
        })
        setFave(false)
    }

    return (
        // <View style={{ width: "100%", flex: 1, justifyContent: "center", alignItems: "center", }}>

        <Card style={{ width: "100%", marginVertical: 10}}>
            <TouchableOpacity onPress={onPress}>
        <Card.Title title={name} titleStyle={{ fontSize: 25}}/>
        <Card.Content>
        <View style={{ marginVertical: 10}}>
            <Paragraph>
                <Chip style={{ backgroundColor: "lightpink", justifyContent: "center", alignItems: "center", }} textStyle={{ fontSize: 17, }} >{cuisine}</Chip>         
                <Text style={{color: "white"}}>s</Text>
                <Chip style={{ backgroundColor: "lightblue", justifyContent: "center", alignItems: "center", }} textStyle={{ fontSize: 17, }} >{location}</Chip> 
            </Paragraph> 
        </View>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions style={{justifyContent: "space-around"}}>
            <FontAwesome.Button 
                name= { fave ? "heart" : "heart-o"}
                color="red"
                size={22}
                backgroundColor="white"
                onPress={ fave ? handleUnFave : handleFave }
            />
            <FontAwesome.Button 
                name="share-square-o"
                color="black"
                size={22}
                backgroundColor="white"
                >share</FontAwesome.Button>
        </Card.Actions>
        </TouchableOpacity>
        </Card>

        // </View>
    )
}
