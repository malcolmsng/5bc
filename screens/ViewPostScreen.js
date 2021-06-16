import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, Image, StyleSheet, View } from "react-native";
import { Headline, Paragraph, Subheading, Chip } from 'react-native-paper';
import { db } from '../firebase';
import { Ionicons } from '@expo/vector-icons'; 

const ViewPostScreen = ({ route }) => {

    const id = route.params.postId
    const [data, setData] = useState({})

    useEffect(() => {
      db.collection('posts').doc(id).get().then(snapShot => {
        setData({ id: snapShot.id, ...snapShot.data()})
      })
    }, [])

    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Image
            source={{ uri: 'https://picsum.photos/700'}}
            style={styles.image}
          />
        </View>
        <View>
          <Headline style={{fontSize: 32, paddingLeft: 20, paddingTop: 20}}>{data.name}</Headline>
          <Subheading style={{paddingLeft: 20, paddingTop: 10}}>
            <Chip 
              style={{backgroundColor: "lightpink",justifyContent: "center", alignItems: "center",}} 
              textStyle={styles.chipsText}
            >
              {data.cuisine}
            </Chip>
            <Text style={{color: "white"}}>s</Text>
            <Chip 
              style={{backgroundColor: "lightblue",justifyContent: "center", alignItems: "center",}}  
              textStyle={styles.chipsText}
            >
              {data.area}
            </Chip>
          </Subheading>
          <Paragraph style={styles.address}>
            <Ionicons name="location-sharp" size={24} color="black" />
            {data.address}
          </Paragraph>
          <Paragraph style={styles.description}>
            {data.description}
          </Paragraph>
        </View>
      </SafeAreaView>
    )
}

export default ViewPostScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "white",
    width: "100%"
  },
  image: {
    flex: 1,
    height: 300,
    width: "100%"
  },
  faveButton: {
    justifyContent: "flex-end",
    alignItems: "center",
    //margin: 100,
  },
  chipsText: { 
    fontSize: 17, 
  },
  address: {
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 10
  },
  description: {
    fontSize: 20,
    paddingLeft: 32,
    paddingRight: 10,
    paddingTop: 30,
  }
})