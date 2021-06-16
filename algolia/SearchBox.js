// import React, { useEffect, useState } from 'react'
// import { StyleSheet, View, Text } from 'react-native'
// import { connectSearchBox } from 'react-instantsearch-native';
// import { TextInput, Button } from 'react-native-paper';
// import SelectDropdown from 'react-native-select-dropdown'


// const countries = ["Egypt", "Canada", "Australia", "Ireland"]


// const styles = StyleSheet.create({
//   container: {
//     width: "90%",
//     marginTop: 50,
//     backgroundColor: 'maroon',
//   },
//   input: {
//     height: 48,
//     fontSize: 16,
//     backgroundColor: 'grey',
    
//   },
// });

// const SearchBox = ({ currentRefinement, refine }) => {
//   const [boxVal, setBoxVal] = useState("")
//   const [filter, setFilter] = useState([])

//   function onPress() {
//     let searchStr = boxVal
//     for (const val of filter) {
//       searchStr += " "
//       searchStr += val
//     }
//     refine(searchStr)
//   }

//   return (
//     <View style={styles.container}>
//       <Text>Search</Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={value => {
//           setBoxVal(value)
//         }}
//         value={boxVal}
//         placeholder=""
//       />
//       <SelectDropdown
//         defaultButtonText="Select an area"
//         data={countries}
//         onSelect={(selectedItem, index) => {
//           setFilter([...filter, selectedItem])
//         }}
//         buttonTextAfterSelection={(selectedItem, index) => {
//           // text represented after item is selected
//           // if data array is an array of objects then return selectedItem.property to render after item is selected
//           return selectedItem
//         }}
//         rowTextForSelection={(item, index) => {
//           // text represented for each item in dropdown
//           // if data array is an array of objects then return item.property to represent item in dropdown
//           return item
//         }}
//       />

//       <Button mode="outlined" onPress={onPress}>
//         GO
//       </Button>
//       <Button mode="outlined" onPress={() => refine("")}>
//         Reset
//       </Button>
  
  
//     </View>
//   );
// } 


// export default connectSearchBox(SearchBox);