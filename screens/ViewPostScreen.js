import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, Image, StyleSheet} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Headline, Paragraph, Subheading, Chip } from 'react-native-paper';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import firebase from "firebase/app"

const ViewPostScreen = ({ route }) => {

    const id = route.params.postId
    const [data, setData] = useState({})

    const { name, cuisine, location, } = data 

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
          <FontAwesome.Button 
            name= { fave ? "heart" : "heart-o"}
            color="red"
            size={22}
            backgroundColor="white"
            onPress={ fave ? handleUnFave : handleFave }
            style={styles.faveButton}
            mode="contained"
          />
          <Headline style={{padding: 10}}>{data.name}</Headline>
          <Subheading style={{padding: 10}}>
            <Chip style={styles.chips} textStyle={styles.chipsText}>
              {data.cuisine}
            </Chip>
            <Text style={{color: "white"}}>sss</Text>
            <Chip style={styles.chips} textStyle={styles.chipsText}>
              {data.location}
            </Chip>
          </Subheading>
          <Paragraph style={styles.paragraph}>
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
  chips: { 
    backgroundColor: "lightpink",
    justifyContent: "center",
    alignItems: "center",
  },
  chipsText: { 
    fontSize: 17, 
  },
  paragraph: {
    fontSize: 15,
    padding: 10
  },
})