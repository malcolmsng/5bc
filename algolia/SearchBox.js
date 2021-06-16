import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connectSearchBox } from 'react-instantsearch-native';
import { TextInput, Button } from 'react-native-paper';
// import SelectDropdown from 'react-native-select-dropdown'


const countries = ["Egypt", "Canada", "Australia", "Ireland"]
const inputColor = "rgb(79, 175, 233)";


const styles = StyleSheet.create({
  container: {
    width: "95%",
    // backgroundColor: 'maroon',
  },
  input: {
    height: 48,
    fontSize: 16,
    backgroundColor: 'white',
    
  },
});

const SearchBox = ({ currentRefinement, refine }) => {
  const [boxVal, setBoxVal] = useState("")
  const [filter, setFilter] = useState([])

  function onPress() {
    let searchStr = boxVal
    for (const val of filter) {
      searchStr += " "
      searchStr += val
    }
    refine(searchStr)
  }

  return (
    <View style={styles.container}>
        <TextInput
          mode="outlined"
          style={styles.input}
          selectionColor={inputColor}
          onChangeText={value => {
            setBoxVal(value)
            onPress()
          }}
          value={boxVal}
          placeholder="Search"
          theme={{
            colors: {
              primary: inputColor,
              background: "white",
              // backgroundColor: "transparent"
            },
          }}
        />
         {/* <TextInput
            label="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(val) => setPassword(val)}
            selectionColor={inputColor}
            mode="outlined"
            theme={{
              colors: {
                primary: inputColor,
                background: "white",
              },
            }}
          /> */}
     

      {/* <SelectDropdown
        defaultButtonText="Select an area"
        data={countries}
        onSelect={(selectedItem, index) => {
          setFilter([...filter, selectedItem])
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      /> */}

      <View style={{display: 'flex', flexDirection: 'row', marginTop: 7, paddingBottom: 7}}>
        <View style={{flex: 2}}></View>
        <View style={{flex: 1}}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={{flex: 6}}>
              <Button 
                mode="contained" 
                onPress={() => {
                  refine("")
                  setBoxVal("")
                }}
                color="white"
              >
                <Text style={{fontSize: 10}}>
                  reset 
                </Text>
              </Button>  
            </View>
            {/* <View style={{flex: 1}}></View> */}
            
          </View>
         
        </View>
      </View>
        
    
      
      
      
  
  
    </View>
  );
} 


export default connectSearchBox(SearchBox);