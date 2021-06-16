import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connectSearchBox } from 'react-instantsearch-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import { set } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';



const cuisines = ["Chinese", "Western", "Muslim", "Japanese", "Indian", "Thai", "Korean"]
const areas = ["Hougang", "Jurong", "Sembawang", "Changi"]
const inputColor = "rgb(79, 175, 233)";


const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginTop: 7
  },
  searchContainer: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',

  },
  input: {
    height: 38,
    fontSize: 16,
    backgroundColor: 'white',
    width: '95%',
    borderColor: 'white'    
  },
});

const SearchBox = ({ currentRefinement, refine }) => {
  console.log("rendering searchbox")
  const [boxVal, setBoxVal] = useState("")
  const [cuisine, setCuisine] = useState()
  const [area, setArea] = useState()
  const cuisineDropdownRef = useRef({})
  const areaDropdownRef = useRef({})
  const [openSearch, setOpenSearch] = useState(false)

  

  function search() {
    let searchStr = boxVal
    const addCuisine = cuisine ? cuisine : ""
    const addArea = area ? area : ""
    searchStr = searchStr + " " + addCuisine
    searchStr = searchStr + " " + addArea
    console.log(searchStr)
    refine(searchStr)
  }

  function renderToggleSearch() {
    if (!openSearch) {
      return (
        <Button 
          color="black"
          mode="text"
          onPress={() => setOpenSearch(true)}
        >
          <Text style={{color: inputColor}}>show search</Text>
        </Button>
      )
    }
    return (
      <Button 
        color="black"
        mode="text"
        onPress={() => setOpenSearch(false)}
      >
        <Text style={{color: inputColor}}>hide search</Text>
      </Button>
    )
  }

  return (
    <View style={styles.container}>
      
      
      {renderToggleSearch()}

    <View style={{...styles.searchContainer, display: openSearch ? 'flex' : 'none'}}>
        <TextInput
          mode="outlined"
          style={styles.input}
          selectionColor={inputColor}
          onChangeText={value => {
            setBoxVal(value)
          }}
          value={boxVal}
          placeholder="Search"
          theme={{
            colors: {
              primary: inputColor,
              background: "white",
            },
          }}
        />
         
     

      

       <View style={{display: "flex", flexDirection: 'row'}}>
         <View style={{flex: 1}}>
          <SelectDropdown
          ref={cuisineDropdownRef}
          buttonStyle={{
            margin: 10,
            borderRadius: 5,
            height: 30,
            backgroundColor: 'white',
            width: "90%"
          }}
          defaultButtonText="Select Cuisine"
          data={cuisines}
          onSelect={(selectedItem, index) => {
            setCuisine(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />

         </View>
         <View style={{flex: 1}}>
          <SelectDropdown
            ref={areaDropdownRef}
            buttonStyle={{
              margin: 10,
              borderRadius: 5,
              height: 30,
              backgroundColor: 'white',
              width: "90%"

            }}
            defaultButtonText="Select Area"
            data={areas}
            onSelect={(selectedItem, index) => {
              setArea(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
          />
         </View>
      </View> 
       
      <View style={{display: 'flex', flexDirection: 'row', marginTop: 7, paddingBottom: 7}}>
        <View style={{flex: 1}}></View>
        <View style={{flex: 1}}>
          <View style={{display: 'flex', flexDirection: 'row', width: '95%'}}>
            <View style={{flex: 6}}>
              <Button 
                mode="contained" 
                onPress={() => {
                  refine("")
                  areaDropdownRef.current.reset()
                  cuisineDropdownRef.current.reset()
                  setArea("")
                  setCuisine("")
                  setBoxVal("")
                  
                }}
                color="white"
              >
                <Text style={{fontSize: 10}}>
                  reset 
                </Text>
              </Button>  
            </View>
            <View style={{flex: 1}}></View>
            <View style={{flex: 6}}>
              <Button 
                mode="contained" 
                onPress={search}
                color="white"
              >
                <Text style={{fontSize: 10}}>
                  Go
                </Text>
              </Button>  
            </View>
            
          </View>
         
        </View>
      </View>
        
    
      
      
      
  
  
    </View>
    </View>
  );
} 


export default connectSearchBox(SearchBox);