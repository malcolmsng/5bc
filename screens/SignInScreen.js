import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";

const inputColor = "rgb(79, 175, 233)";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current
  
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...styles.container,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      <Image
        style={styles.tinyLogo}
        // style={{backgroundColor: 'black', height: 100}}
        source={require("../images/store.png")}
      />
      <View>
        <Text style={styles.Title}>
          HawkerHero
        </Text>
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.inputView}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(val) => setEmail(val)}
            selectionColor={inputColor}
            mode="outlined"
            theme={{
              colors: {
                primary: inputColor,
                background: "white",
              },
            }}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
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
          />
        </View>
        <Button
          color="maroon"
          mode="contained"
          contentStyle={{
            height: 50,
          }}
        >
          Sign In
        </Button>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Don't have an account yet?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
          <Text style={{ textAlign: "center", color: inputColor }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    marginTop: 20,
    // backgroundColor: 'orange',
    height: 400,
    width: "80%",
  },
  inputView: {
    borderRadius: 30,
    marginBottom: 20,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  Title: {
    fontFamily: "Cochin",
    fontSize: 30,
    fontWeight: "bold"

  }
});
