import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useAuth } from './contexts/AuthContext'
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

const AuthStack = createStackNavigator();

export default function AppNavigation() {
  const { currentUser } = useAuth()

  function renderNavigation() {
    if (!currentUser) {
      return (
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{
              title: "Sign In",     
            }}
            name="SignInScreen"
            component={SignInScreen} 
          />
          <AuthStack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{
              title: "Sign Up",
            }}
          />
        </AuthStack.Navigator>
      )
    }
  }

  return (
    <NavigationContainer>
      {renderNavigation()}
    </NavigationContainer>
  );
}
