import React from 'react'
import { Text, View, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ViewPostScreen = ({ route }) => {

    const id = route.params.userId

    return (
        <View
          style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "lightblue",
          width: "100%"
      }}
    >
      <Text>View Post</Text>
      <Text>{id}</Text>
      <FontAwesome name="file-word-o" size={99} color="rgba(255, 0, 0, 0.5)" />
    </View>
    )
}

export default ViewPostScreen
