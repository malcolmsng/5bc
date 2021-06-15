import React from 'react'
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Avatar, Button, Card, Title, Paragraph, Chip } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-paper-grid";


export default function PostCard({ data }) {

    const { name, cuisine, location, } = data 
    return (
        // <View style={{ width: "100%", flex: 1, justifyContent: "center", alignItems: "center", }}>

        <Card style={{ width: "100%", marginVertical: 10}}>
        <Card.Title title={name} titleStyle={{ fontSize: 25}}/>
        <Card.Content>
        <View style={{ marginVertical: 10}}>
            <Paragraph>
                <Chip style={{ backgroundColor: "lightpink", justifyContent: "center", alignItems: "center", }} textStyle={{ fontSize: 17, }} >{cuisine}</Chip>         
                <Text style={{color: "white"}}>s</Text>
                <Chip style={{ backgroundColor: "#a45ee5", justifyContent: "center", alignItems: "center", }} textStyle={{ fontSize: 17, }} >{location}</Chip> 
            </Paragraph> 
        </View>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions style={{justifyContent: "space-around"}}>
            <FontAwesome.Button 
                name="heart-o"
                color="red"
                size={22}
                backgroundColor="white"/>
            <FontAwesome.Button 
                name="share-square-o"
                color="black"
                size={22}
                backgroundColor="white"
                >share</FontAwesome.Button>
        </Card.Actions>
        </Card>

        // </View>
    )
}
