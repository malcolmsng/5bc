import React, { useState, useEffect } from 'react'
import { Text, View, Button } from "react-native";
import { Headline, Paragraph, Subheading, Chip } from 'react-native-paper';
import { db } from '../firebase';

const ViewPostScreen = ({ route }) => {

    const id = route.params.postId
    const [data, setData] = useState({})

    useEffect(() => {
      db.collection('posts').doc(id).get().then(snapShot => {
        setData({...snapShot.data()})
      })
    }, [])

    return (
      <View
        style={{
          flex: 1,
          //justifyContent: "center",
          //alignItems: "center",
          backgroundColor: "white",
          width: "100%"
        }}
      >
        <Headline style={{fontSize: 32, padding: 10}}>{data.name}</Headline>
        <Subheading style={{padding: 10}}>
          <Chip 
            style={{ backgroundColor: "lightpink", justifyContent: "center", alignItems: "center", }} textStyle={{ fontSize: 17, }}
          >
            {data.cuisine}
          </Chip>
          <Text style={{color: "white"}}>s</Text>
          <Chip 
            style={{ backgroundColor: "lightblue", justifyContent: "center", alignItems: "center", }} textStyle={{ fontSize: 17, }}
          >
            {data.location}
          </Chip>
        </Subheading>
        <Paragraph style={{fontSize: 20, padding: 10}}>{data.description}</Paragraph>
      </View>
    )
}

export default ViewPostScreen
