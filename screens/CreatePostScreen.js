  
import React, { useState, useEffect } from 'react'
import { Text, Image, View, StyleSheet, Alert, Platform, TouchableOpacity, ScrollView } from "react-native";
import { Button, TextInput as Input  } from 'react-native-paper';
import { Formik } from 'formik'
import { Media, pickImage, takePicture } from '../components/Media';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import 'firebase/firestore';
import firebase from "firebase/app"


export default function CreatePostScreen({ navigation, route }) {
  
  const [paths, setPaths] = useState([])

  useEffect(() => {
    /*
      attempted to upload local file to firebase project
      but failed due to lack of blob support for react-native
      unable to fix a linking issue for react-native-fs and react-native-fetchblob
      and other methods found are all deprecated
    */ 
    setPaths(route.params? route.params.data : [])
  }, [route.params])

  const { currentUser, currentUserData, setCurrentUserData } = useAuth()
  const docRef = db.collection("users").doc(currentUser.uid)

  const submitForm = (values) => {
    const { name, address, description, cuisine, area } = values
    db.collection('posts').add({
      name,
      address,
      description,
      cuisine,
      area,
      author: currentUser.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(
      async post => {
        
        docRef.update({
          posts: firebase.firestore.FieldValue.arrayUnion(post.id)
        })
        const posts = [...currentUserData.posts]
        posts.push(post.id)
        setCurrentUserData({
            ...currentUserData, 
            posts
        })
    })
    .catch(err => {
      console.log(err)
    })
  }

  function renderImages() {
    if (paths.length) {
      return paths.map(path => {
        return <Image
                style={styles.storeImage}
                source={{
                  uri: path
                }}
              />
      })
    }
    
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <Formik
        initialValues={{ name: '', address: '', description: '', area: '', cuisine: '' }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          submitForm(values);
          setSubmitting(false)
          resetForm({})
          navigation.navigate('HomeTab')
          alert('Post Submitted!')
        }}
      >
        {({ handleChange, handleSubmit, values, resetForm }) => (
          <View style={{ width: "70%" }}>
            <Input
              style={styles.input}
              mode="outlined"
              numberOfLines={1}
              label="Name"
              placeholder='Name of stall'
              onChangeText={handleChange('name')}
              value={values.name}
              selectionColor="rgb(79, 175, 233)"
              theme={{
                colors: {
                  primary: "rgb(79, 175, 233)",
                }
              }}
            />

            <Input 
              style={styles.input}
              mode="outlined"
              numberOfLines={1}
              label="Address"
              placeholder='Address of stall'
              onChangeText={handleChange('address')}
              value={values.address}
              selectionColor="rgb(79, 175, 233)"
              theme={{
                colors: {
                  primary: "rgb(79, 175, 233)",
                }
              }}
            />

            <Input 
              style={styles.input}
              mode="outlined"
              numberOfLines={1}
              label="Area"
              placeholder='Area of stall'
              onChangeText={handleChange('area')}
              value={values.area}
              selectionColor="rgb(79, 175, 233)"
              theme={{
                colors: {
                  primary: "rgb(79, 175, 233)",
                }
              }}
            />
    
            <Input 
              style={styles.input}
              mode="outlined"
              numberOfLines={1}
              label="Cuisine"
              placeholder='Cuisine of stall'
              onChangeText={handleChange('cuisine')}
              value={values.cuisine}
              selectionColor="rgb(79, 175, 233)"
              theme={{
                colors: {
                  primary: "rgb(79, 175, 233)",
                }
              }}
            />  

            <Input
              multiline
              numberOfLines={10}
              style={styles.input}
              mode="outlined"
              label="Description"
              placeholder='Some details...'
              onChangeText={handleChange('description')}
              value={values.description}
              selectionColor="rgb(79, 175, 233)"
              theme={{
                colors: {
                  primary: "rgb(79, 175, 233)",
                }
              }}
            />
                         
            <Button compact = {true}
            mode = 'contained'
            icon = "camera-image"
            color = "maroon"
            style = {{marginTop: 20}}
              onPress = {() => {navigation.navigate('Media')}}
            >
              UPLOAD IMAGE
              </Button>
            
            <View style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
              {renderImages()}
            </View>
            
            <Button 
              style={{marginTop: 10}}
              onPress={() => setPaths([])}
              mode="contained"
            >
                Reset Images
            </Button>
            <Button 
              style={{marginTop: 10}}
              onPress={resetForm}
              mode="contained"
            >
                Reset text
            </Button>

            <Button 
              style={{marginTop: 10}}
              color='maroon'
              //disabled={!isValid}
              onPress={handleSubmit} 
              mode="contained"
              > Post 
            </Button> 
          </View>
        )}
      </Formik>
    </View>
    </ScrollView>
  );
}  

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "lightblue",
    width: "100%",
    marginTop: 20
  },
  containerchip: {
    paddingTop: 30,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    marginBottom: 25
  },
  storeImage: {
    marginTop: 10,
    height: 300,
  },
});

