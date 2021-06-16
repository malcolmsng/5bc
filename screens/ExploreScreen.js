import React from 'react'
import { Text, View, StyleSheet } from "react-native";
import { TextInput, Snackbar } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

const inputColor = "rgb(79, 175, 233)";

export default function ExploreScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: "lightblue",
        width: "100%"
      }}
    >
    <View style={styles.searchContainer}>
      <View style={styles.inputView}>
        <TextInput
          label="Search"
          mode="outlined"
          //onChangeText={(val) => }
          selectionColor={inputColor}
          theme={{
            colors: {
              primary: inputColor,
              background: "white",
            },
          }}
        />
      </View>
    </View>
    
    
    </View>
)
}

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 20,
    height: 400,
    width: "80%",
  },
  inputView: {
    borderRadius: 30,
    marginBottom: 20,
  },
})