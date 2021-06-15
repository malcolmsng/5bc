import React from 'react'
import { Text, View, ScrollView, FlatList} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import { Col, Row, Grid } from "react-native-paper-grid";
import PostCard from '../components/PostCard';


export default function HomeScreen() {

  const DATA = [
    {
      id: 1,
      name: "Chinese",
      cuisine: "Chinese",
      location: "North",
      description: "description",
    },
    {
      id: 2,
      name: "Western",
      cuisine: "Western",
      location: "South",
      description: "description",
    },
    {
      id: 3,
      name: "Indian",
      cuisine: "Indian",
      location: "West",
      description: "description",
    },
    {
      id: 4,
      name: "Malay",
      cuisine: "Malay",
      location: "East",
      description: "description",
    },
  ]

    return (
      <View style={{width: "100%", flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "lightblue"}}>  
        <FlatList 
          style={{height: "100%", width: "95%"}}
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <PostCard data={item} />
          }
        />
      </View>
    )
}

