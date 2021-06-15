import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput, Snackbar } from "react-native-paper";
import { Button } from "react-native-paper";

import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";


const inputColor = "rgb(79, 175, 233)";

export default function SignUpScreen({navigation}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false);
  const { signup } = useAuth()

  const onDismissSnackBar = () => setVisible(false);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!firstName || !lastName || !email) {
      setError("Some fields are not filled in")
      setVisible(true)
      return 
    }

    if (password !== confirmPassword) {
        setError("Passwords do not match")
        setVisible(true)
        return 
    }

    try {
        setLoading(true)
        setError('')
        const cred = await signup(email, password)
        // await db.collection('users').doc(cred.user.uid).set({
        //     password,
        //     email,
        //     firstName,
        //     lastName,
        // })

    } catch (err) {
      console.log(err.message)
      setError(err.message)
      setVisible(true)
    }

    setLoading(false)
}


    return (
      <View style={styles.container}>
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
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15}}>
          <View style={{flex: 9}}>
            <TextInput
              label="First Name"
              value={firstName}
              onChangeText={(val) => setFirstName(val)}
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
          <View style={{flex: 1}}></View>
          <View style={{flex: 9}}>
            <TextInput
                label="Last Name"
                value={lastName}
                onChangeText={(val) => setLastName(val)}
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
        </View>
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
        <View style={styles.inputView}>
          <TextInput
            label="Confirm Password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(val) => setConfirmPassword(val)}
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
          disabled={loading}
          color="maroon"
          mode="contained"
          onPress={handleSubmit}
          contentStyle={{
            height: 50,
          }}
        >
          Sign Up
        </Button>
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
    </View>
    )
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
    marginBottom: 15,
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
