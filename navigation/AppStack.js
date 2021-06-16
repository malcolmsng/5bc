import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import ViewPostScreen from "../screens/ViewPostScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CreatePostScreen from "../screens/CreatePostScreen";
import { Button } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { Media } from '../components/Media';

import { NavigationContainer } from '@react-navigation/native';
import ImagePicker from '../screens/ImagePicker';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({ navigation }) => {
    const { logout } = useAuth()

    async function handleLogout() {
        await logout()
    }

    return (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: "rgb(79, 175, 233)",
                    fontSize: 16,
                },
                headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                },
                // headerRight: () => (
                //     <View style={{marginRight: 10}}>
                //         <FontAwesome.Button 
                //             name="plus"
                //             size={22}
                //             backgroundColor="#fff"
                //             color="rgb(79, 175, 233)"
                //             onPress={() => navigation.navigate('Create Post')}
                //         />
                //     </View>
                // ),
                headerRight: () => (
                    <View style={{marginLeft: 10}}>
                        <TouchableOpacity
                            onPress={handleLogout}
                            style={{marginRight: 10}}
                        >
                            <Text style={{color: "rgb(79, 175, 233)"}}>
                            Log out
                            </Text>
                        </TouchableOpacity>
                    </View>
                ),
                // headerRight: () => (
                //     <View style={{marginRight: 10}}>
                //         <FontAwesome.Button 
                //             name="user-circle-o"
                //             size={22}
                //             backgroundColor="#fff"
                //             color="rgb(79, 175, 233)"
                //             onPress={() => navigation.navigate('My Profile')}
                //         />
                //     </View>
                // ),
            }}
        />
        {/* <Stack.Screen 
            name="My Profile"
            component={MyProfileScreen}
            options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: "rgb(79, 175, 233)",
                    fontSize: 16,
                },
                headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{marginRight: 10}}>
                        <FontAwesome 
                            name="chevron-left"
                            size={22}
                            color="rgb(79, 175, 233)"
                        />
                    </View>
                ),
            }}
        /> */}
        <Stack.Screen 
            name="View Post"
            component={ViewPostScreen}
            options={{
                headerTitleVisible: false,
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: "rgb(79, 175, 233)",
                    fontSize: 16,
                },
                headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{marginRight: 10}}>
                        <FontAwesome 
                            name="arrow-left"
                            size={22}
                            color="rgb(79, 175, 233)"
                        />
                    </View>
                
                ),
            }}
        />
    </Stack.Navigator>
    )
}

const CreateStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Create Post"
                component={CreatePostScreen}
                options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: "rgb(79, 175, 233)",
                        fontSize: 16,
                    },
                    headerStyle: {
                        shadowColor: '#fff',
                        elevation: 0,
                    },
                    // headerRight: () => (
                    //     <View style={{marginRight: 10}}>
                    //         <Button 
                    //             mode="text"
                    //             size={22}
                    //             //backgroundColor="#fff"
                    //             color="rgb(79, 175, 233)"
                    //             onPress={() => console.log("reset")}
                    //         >
                    //             Reset
                    //         </Button>
                    //     </View>
                    // ),
                    //headerBackTitleVisible: false,
                    headerLeft: () => (
                        <View style={{marginLeft: 10}}>
                        <FontAwesome.Button
                            name="close"
                            size={22}
                            backgroundColor="white"
                            color="rgb(79, 175, 233)"
                            onPress={() => navigation.navigate('HomeTab')}
                        />
                    </View>
                    ),
                }}
            />
            <Stack.Screen 
                name="Media"
                component={Media}
            />

            <Stack.Screen 
                name="ImagePicker"
                component={ImagePicker}
            />
            
        </Stack.Navigator>
    )
}

const AppStack = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "HomeTab") {
              iconName = "home";
            } else if (route.name === "Create Post") {
                iconName = "plus";
            } else if (route.name === "My Profile") {
                iconName = "user-circle-o"
            }
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "rgb(79, 175, 233)",
          showLabel: false,
          keyboardHidesTabBar: true
        }}
      >
        <Tab.Screen name="HomeTab" component={HomeStack} />
        <Tab.Screen name="Create Post" component={CreateStack}/>
        <Tab.Screen name="My Profile" component={MyProfileScreen} />
      </Tab.Navigator>
    )
}



export default AppStack