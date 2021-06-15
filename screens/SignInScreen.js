import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from "react-native";
import { TextInput, Snackbar } from "react-native-paper";
import { Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";

const inputColor = "rgb(79, 175, 233)";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false);
  const { login } = useAuth()
  const fadeAnim = useRef(new Animated.Value(0)).current

  const onDismissSnackBar = () => setVisible(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("You have not entered an email")
      setVisible(true)
      return 
    }

    try {
        setLoading(true)
        await login(email, password)
        setError('')

    } catch (err) {
        setError(err.message)
        setVisible(true)
    }

    setLoading(false)
}


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
          disabled={loading}
          mode="contained"
          contentStyle={{
            height: 50,
          }}
          onPress={handleSubmit}
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
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={2000}
        style={{backgroundColor: 'red'}}
        action={{
          label: 'dismiss',
          onPress: () => {
            // Do something
          },
        }}>
          {error}
      </Snackbar>
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
