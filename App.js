import * as React from "react";
import { Text, View, Button, KeyboardAvoidingView, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import MyProfileScreen from "./screens/MyProfileScreen";
import ViewPostScreen from "./screens/ViewPostScreen";
import ExploreScreen from "./screens/ExploreScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CreatePostScreen from "./screens/CreatePostScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            //Set the icon based on which route it is (name of the tab)
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "View Post") {
              iconName = "list";
            } else if (route.name === "My Profile") {
              iconName = focused ? "user" : "user-o";
            } else if (route.name === "Explore") {
              iconName = "search"
            } else if (route.name === "Create Post") {
              iconName = "plus";
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          showLabel: false,
          keyboardHidesTabBar: true
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="My Profile" component={MyProfileScreen} />
        <Tab.Screen name="Create Post" component={CreatePostScreen}/>
        <Tab.Screen name="View Post" component={ViewPostScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
