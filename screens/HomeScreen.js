import React from 'react'
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function HomeScreen() {
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
      <Text>Home</Text>
      <FontAwesome name="home" size={99} color="rgba(255, 0, 0, 0.5)" />
    </View>
    )
}

