import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";

const inputColor = "rgb(79, 175, 233)";

export default function SignUpScreen({navigation}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
          color="maroon"
          mode="contained"
          contentStyle={{
            height: 50,
          }}
        >
          Sign Up
        </Button>
      </View>
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
