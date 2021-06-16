
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Alert, Platform, TouchableOpacity, ScrollView } from "react-native";
import { Button, HelperText, TextInput as Input  } from 'react-native-paper';
import { Formik } from 'formik'
import { Media, pickImage, takePicture } from '../components/Media';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import 'firebase/firestore';
import firebase from "firebase/app"
import * as Yup from 'yup';

export default function CreatePostScreen({ navigation }) {
  
  const { currentUser, currentUserData, setCurrentUserData } = useAuth()
  const docRef = db.collection("users").doc(currentUser.uid)

  const vSchema = Yup.object().shape({
    name: Yup.string()
      .required('*Name Required'),
    address: Yup.string()
      .required('*Address Required'),
    description: Yup.string()
      .required('*Description Required'),
    area: Yup.string()
      .required('*Area Required'),
    cuisine: Yup.string()
      .required('*Cuisine Required'),
  });

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
      post => {
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

  return (
    <ScrollView>
    <View style={styles.container}>
      <Formik
        initialValues={{ name: '', address: '', description: '', area: '', cuisine: '' }}
        validationSchema={vSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          submitForm(values);
          setSubmitting(false)
          resetForm({})
          navigation.navigate('HomeTab')
          alert('Post Submitted!')
        }}
      >
        {({ handleChange, handleSubmit, values, resetForm, isValid, errors, touched }) => (
          <View style={{ width: "70%" }}>
            <HelperText style={styles.helper} type="error" visible={errors.name && touched.name}>
              {errors.name}
            </HelperText>
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
            <HelperText style={styles.helper} type="error" visible={errors.address && touched.address}>
              {errors.address}
            </HelperText>
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
            <HelperText style={styles.helper} type="error" visible={errors.area && touched.area}>
              {errors.area}
            </HelperText>
            <Input 
              style={styles.input}
              mode="outlined"
              numberOfLines={1}
              label="Area"
              placeholder='Jurong East, Bedok, Yishun, etc ...'
              onChangeText={handleChange('area')}
              value={values.area}
              selectionColor="rgb(79, 175, 233)"
              theme={{
                colors: {
                  primary: "rgb(79, 175, 233)",
                }
              }}
            />
            <HelperText style={styles.helper} type="error" visible={errors.cuisine && touched.cuisine}>
              {errors.cuisine}
            </HelperText>
            <Input 
              style={styles.input}
              mode="outlined"
              numberOfLines={1}
              label="Cuisine"
              placeholder='Western, Chinese, Muslim, Indian etc ...'
              onChangeText={handleChange('cuisine')}
              value={values.cuisine}
              selectionColor="rgb(79, 175, 233)"
              theme={{
                colors: {
                  primary: "rgb(79, 175, 233)",
                }
              }}
            />  
            <HelperText style={styles.helper} type="error" visible={errors.description && touched.description}>
              {errors.description}
            </HelperText>      
            <Input
              multiline
              numberOfLines={10}
              style={styles.input}
              mode="outlined"
              label="Description"
              placeholder='Opening hours, recommended  food, price range, etc ...'
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
            style = {{marginTop: 40}}
              onPress = {() => {navigation.navigate('Media')}}
            >
              UPLOAD IMAGE
              </Button>

            <Button 
              style={{marginTop: 10}}
              onPress={resetForm}
              mode="contained"
            >
                Reset
            </Button>

            <Button 
              style={{marginTop: 10}}
              color='maroon'
              disabled={!isValid}
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
    marginBottom: -15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "lightblue",
    width: "100%",
    paddingBottom: 10,
    marginTop: -15
  },
  containerchip: {
    paddingTop: 30,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    marginBottom: 25
  },
  helper: {
    marginTop: 30,
    marginBottom: -9
  }
});

