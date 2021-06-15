import React, { useRef } from 'react'
import { Text, View, StyleSheet, Alert, Platform , TouchableOpacity,} from "react-native";
import { Button, TextInput  } from 'react-native-paper';
import { Formik } from 'formik'
import DropDownPicker from 'react-native-dropdown-picker';
import {Media, pickImage,takePicture} from '../components/Media';


export default function CreatePostScreen() {
  
  
  //states
  //variables
  
  
  const ref = useRef()

  return (
    <ScrollView>
    <View style={styles.container}>
      <Formik
        initialValues={{ name: '', address: '', description: '', cuisine: '' }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {props => (
          <View style={{width: "70%"}}>
            <TextInput
              style={styles.input}
              mode="outlined"
              numberOfLines={1}
              label="Name"
              //placeholder='Name of stall'
              onChangeText={props.handleChange('name')}
              value={props.values.name}
              selectionColor="rgb(79, 175, 233)"
              theme={{
                colors: {
                  primary: "rgb(79, 175, 233)",
                }
              }}
            />

            <TextInput 
              style={styles.input}
              mode="outlined"
              numberOfLines={1}
              label="Address"
              //placeholder='Address of stall'
              onChangeText={props.handleChange('address')}
              value={props.values.address}
              selectionColor="rgb(79, 175, 233)"
              theme={{
                colors: {
                  primary: "rgb(79, 175, 233)",
                }
              }}
            />

            <TextInput 
              style={styles.input}
              mode="outlined"
              numberOfLines={1}
              label="Cuisine"
              //placeholder='Cuisine'
              onChangeText={props.handleChange('cuisine')}
              value={props.values.cuisine}
              selectionColor="rgb(79, 175, 233)"
              theme={{
                colors: {
                  primary: "rgb(79, 175, 233)",
                }
              }}
            />

            <TextInput
              multiline
              numberOfLines={10}
              style={styles.input}
              mode="outlined"
              label="Description"
              //placeholder='Some details...'
              onChangeText={props.handleChange('description')}
              value={props.values.description}
              selectionColor="rgb(79, 175, 233)"
              theme={{
                colors: {
                  primary: "rgb(79, 175, 233)",
                }
              }}
            />
             
             <View style= {{flexDirection : "row", flex: 1, justifyContent: 'space-evenly', marginTop: '10'}}>
            <Button compact = {true}
            mode = 'contained'
            icon = "camera-image"
            color = "maroon"
            onPress = {() => {pickImage}}
            >
              UPLOAD IMAGE
              </Button>
              <Button compact = {true}
            mode = 'contained'
            icon = 'camera'
            color = 'maroon'
            style = {{width : 170}}
            onPress = {() => {takePicture}}
            >
              TAKE PHOTO
              </Button>  
                
              </View>
            <Button 
              style={{marginTop: 10}}
              color='maroon' 
              onPress={props.handleSubmit} 
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

