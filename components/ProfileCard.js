import React, { useState, useEffect} from 'react'
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Card, Paragraph, Chip } from 'react-native-paper';
import { db } from '../firebase';

export default function ProfileCard({ data, onPress }) {
    const { 
        cuisine,
        area,
        name,
    } = data

    const randInt = String(Math.floor(Math.random() * 16))
    const [ pic, setPic] = useState()

    useEffect(() => {
        db.collection("images").doc(randInt).onSnapshot(doc => {
            setPic(doc.data().uri)
        })
    }, [])

    // console.log(address, author, cuisine, description, location, name)

    return (
        // <View style={{ width: "100%", flex: 1, justifyContent: "center", alignItems: "center", }}>

        <Card style={{ width: "100%", marginVertical: 10, borderRadius: 4, borderColor: "lightgray", borderWidth: 1}}>
            <TouchableOpacity onPress={onPress}>
        <Card.Title title={name} titleStyle={{ fontSize: 25}}/>
        <Card.Content>
        <View style={{ marginVertical: 10}}>
            <Paragraph>
                <Chip style={{ backgroundColor: "lightpink", justifyContent: "center", alignItems: "center", }} textStyle={{ fontSize: 17, }} >{cuisine}</Chip>         
                <Text style={{color: "white"}}>s</Text>
                <Chip style={{ backgroundColor: "lightblue", justifyContent: "center", alignItems: "center", }} textStyle={{ fontSize: 17, }} >{area}</Chip> 
            </Paragraph> 
        </View>
        </Card.Content>
        <Card.Cover source={{ uri: pic }} />
        <Card.Actions style={{justifyContent: "space-around"}}>
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
