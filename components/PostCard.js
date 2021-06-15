import React from 'react'
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Avatar, Button, Card, Title, Paragraph, Chip } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-paper-grid";


export default function PostCard() {
    return (
        // <View style={{ width: "100%", flex: 1, justifyContent: "center", alignItems: "center", }}>

        <Card style={{ width: "100%", marginTop: 5}}>
        <Card.Title title="Name of stall" right={() =>
            <View>
                <Text style={{color: "white"}}>S</Text> 
            <Paragraph> 
                <Chip style={{ backgroundColor: "lightpink", }}>cuisine</Chip> 
                <Text style={{color: "white"}}>S</Text>            
                <Chip style={{ backgroundColor: "lightblue", }}>location</Chip> 
                <Text style={{color: "white"}}>S</Text> 
            </Paragraph>
            </View> 
        } />
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions style={{justifyContent: "space-around"}}>
            <FontAwesome.Button 
                name="heart-o"
                color="red"
                size={20}
                backgroundColor="white"/>
            <FontAwesome.Button 
                name="share-square-o"
                color="black"
                size={20}
                backgroundColor="white">share</FontAwesome.Button>
        </Card.Actions>
        </Card>

        // </View>
    )
}
