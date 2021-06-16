import React, { useState } from 'react'
import { Text, View, StyleSheet, Alert, Platform, TouchableOpacity, ScrollView } from "react-native";
import { Button, TextInput as Input  } from 'react-native-paper';
import { Formik } from 'formik'
import DropDownPicker from 'react-native-dropdown-picker';
import { Media, pickImage, takePicture } from '../components/Media';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import 'firebase/firestore';
import ReactChipsInput from 'react-native-chips';
import ReactChipInput from "react-chip-input";
import {
  Dropdown,
  GroupDropdown,
  MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';

export default function CreatePostScreen({ navigation }) {

  const AreaData = [
    {
      value: '1',
      label: 'Hougang',
    },
    {
      value: '2',
      label: 'Jurong East',
      
    },
    {
      value: '3',
      label: 'Seng Kang',
      
    },
    {
      value: '4',
      label: 'Changi',
      
    },
    {
      value: '5',
      label: 'West Coast',
      
    },
    {
      value: '6',
      label: 'Serangoon',
      
    },
    {
      value: '7',
      label: 'Kovan',
    },
    {
      value: '8',
      label: 'Yishun',
    },
    {
      value: '9',
      label: 'Boon Lay',
    },
    {
      value: '10',
      label: 'Lakeside',
    },
  ];

  const CuisineData = [
    {
      value: '1',
      label: 'Western',
      //avatarSource: require('./ddicon.png'),
    },
    {
      value: '2',
      label: 'Chinese',
      //avatarSource: require('./ddicon.png'),
    },
    {
      value: '3',
      label: 'Indian',
      //avatarSource: require('./ddicon.png'),
    },
    {
      value: '4',
      label: 'Muslim',
      //avatarSource: require('./ddicon.png'),
    },
    {
      value: '5',
      label: 'Japanese',
      //avatarSource: require('./ddicon.png'),
    },
    {
      value: '6',
      label: 'Korean',
      //avatarSource: require('./ddicon.png'),
    },
    {
      value: '7',
      label: 'Thai',
      //avatarSource: require('./ddicon.png'),
    },
  ];
  

  const { currentUser } = useAuth()
  const [valueSS, setValueSS] = useState([]);
  const onChangeSS = (value) => {
    setValueSS(value);
  };


  const [valueMS, setValueMS] = useState([]);
  const onChangeMS = (value) => {
    setValueMS(value);
  };



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

          <View style={{borderColor: "grey", borderWidth: 1, borderRadius: 5, justifyContent: "center", marginBottom: 10}}>
            <View style={styles.containerchip}>
              <MultiselectDropdown
                label="Area"
                data={AreaData}
                enableSearch
                // chipType="outlined"
                value={valueSS}
                onChange={onChangeSS}
                itemTextStyle={{fontSize:17}}
                chipStyle={{backgroundColor: "lightblue", borderColor: "lightblue"}}
              />
            </View>
            </View>
      

            <View style={{borderColor: "grey", borderWidth: 1, borderRadius: 5, justifyContent: "center", marginBottom: 4}}>
            <View style={styles.containerchip}>
              <MultiselectDropdown
                label="Cuisine"
                data={CuisineData}
                enableSearch
                // chipType="outlined"
                value={valueMS}
                onChange={onChangeMS}
                itemTextStyle={{fontSize:17}}
                chipStyle={{backgroundColor: "lightpink", borderColor: "lightpink"}}
              />
            </View>
            </View>

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
  },
  containerchip: {
    paddingTop: 30,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    marginBottom: 25
  },
});

