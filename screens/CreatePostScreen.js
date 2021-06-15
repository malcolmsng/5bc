import React, { useState } from 'react'
import { Text, View, StyleSheet, Alert, Platform, TouchableOpacity, ScrollView } from "react-native";
import { Button, TextInput as Input  } from 'react-native-paper';
import { Formik } from 'formik'
import DropDownPicker from 'react-native-dropdown-picker';
import { Media, pickImage, takePicture } from '../components/Media';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import 'firebase/firestore';

export default function CreatePostScreen({ navigation }) {

  const { currentUser } = useAuth()

  const submitForm = (values) => {
    const { name, address, description, cuisine } = values
    db.collection('posts').add({
      name,
      address,
      description,
      cuisine,
      location: "location",
      author: currentUser.uid,
      timestamp: new Date(),
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <Formik
        initialValues={{ name: '', address: '', description: '', cuisine: '' }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          submitForm(values);
          setSubmitting(false)
          resetForm({})
          navigation.navigate('HomeTab')
          alert('Post Submitted!')
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View style={{width: "70%"}}>
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
              label="Cuisine"
              placeholder='Specialty Cuisine of Stall'
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
             
             {/* <View style= {{flexDirection : "row", flex: 1, justifyContent: 'space-evenly', marginTop: '10'}}>
              <Button 
                compact = {true}
                mode = 'contained'
                icon = "camera-image"
                color = "maroon"
                //onPress = {() => {pickImage}}
              >
                UPLOAD IMAGE
              </Button>
              <Button 
                compact = {true}
                mode = 'contained'
                icon = 'camera'
                color = 'maroon'
                style = {{width : 170}}
                //onPress = {() => {takePicture}}
              >
                TAKE PHOTO
              </Button>  
            </View> */}
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
    width: "100%"
  }
});

