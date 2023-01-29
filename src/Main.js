import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './context/authContext';
import { SignInScreen, SignUpScreen, HomeScreen, EditProfileScreen, ProjectListScreen, ProjectScreen, ProfileScreen } from './pages';
import * as Font from 'expo-font';


const Tab = createBottomTabNavigator();
const Stack =  createStackNavigator();

function Main() {
    const { auth } = useContext(AuthContext);

    const [isFontLoaded, setFontLoaded] = useState(false);

    async function loadFonts() {
      setFontLoaded(false); 
      await Font.loadAsync({
        'Montserrat-Regular': require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
      });
      await Font.loadAsync({
        'Montserrat-Thin': require('../assets/fonts/Montserrat/Montserrat-Thin.ttf'),
      });
      await Font.loadAsync({
        'Montserrat-Bold': require('../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
      });
      await Font.loadAsync({
        'Montserrat-Italic': require('../assets/fonts/Montserrat/Montserrat-Italic.ttf'),
      });
      setFontLoaded(true);
    }

    useEffect(() => {
        loadFonts();
    }, []);

    return isFontLoaded ? (

        !auth?.isSignedIn ?(
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="SignIn"
                >
                    <Stack.Screen 
                    name="SignIn" 
                    component={SignInScreen}
                    options={{
                        title: 'Sign In',
                        gestureEnabled: false,
                    }}  
                    />
                    <Stack.Screen 
                    name="SignUp" 
                    component={SignUpScreen}
                    options={{
                        title: 'Sign Up',
                    }}   
                    />
                </Stack.Navigator>
            </NavigationContainer>
        ) : ( 
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen 
                        name="Home" 
                        component={HomeScreen} 
                        options={
                            {
                                title: 'Home',
                                tabBarLabel: 'Home',
                                tabBarIcon: ({ color, size }) => (
                                    <Text style={{color: color, fontSize: size}}>Home</Text>
                                ),
                                //headerShown: false,
                            }
                        }
                    />
                    <Tab.Screen 
                        name="Project List" 
                        component={ProjectListScreen}
                        options={
                            {
                                // I want a header that is not the default name
                                /* header : () => (
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', height: 50, paddingHorizontal: 10}}>
                                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Project List</Text>
                                        <TouchableOpacity>
                                            <Image source={require('../assets/images/logo.png')} style={{width: 30, height: 30}} />
                                        </TouchableOpacity>
                                    </View>
                                ), */
                            

                                title: 'Project List',
                                tabBarLabel: 'Project List',
                                tabBarIcon: ({ color, size }) => (
                                    <Text style={{color: color, fontSize: size}}>Project List</Text>
                                ),
                            }
                        }
                    />
                    <Tab.Screen 
                        name="Profile" 
                        component={ProfileScreen} 
                        options={
                            {
                                title: 'Profile',
                                tabBarLabel: 'Profile',
                                tabBarIcon: ({ color, size }) => (
                                    <Text style={{color: color, fontSize: size}}>Profile</Text>
                                ),
                                //headerShown: false,
                            }
                        }
                    />
                    <Tab.Screen 
                        name="Edit Profile" 
                        component={EditProfileScreen} 
                        options={
                            {
                                title: 'Edit Profile',
                                tabBarItemStyle: {display: "none"},
                                headerShown: false,
                            }
                        }
                    />
                    <Tab.Screen 
                        name="Projects" 
                        component={ProjectScreen} 
                        options={
                            {
                                title: 'Projects',
                                tabBarItemStyle: {display: "none"},
                                //headerShown: false,
                            }
                        }
                    />
                </Tab.Navigator>
            </NavigationContainer>
        )
    ) : null
}

export { Main }
