import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './context/authContext';
import { SignInScreen, SignUpScreen, HomeScreen, EditProfileScreen, ProjectListScreen, ProjectScreen, KanbanScreen, ProfileScreen, BacklogScreen, SprintScreen } from './pages';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();
const Stack =  createStackNavigator();

function Main() {
    const { t } = useTranslation();
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
                        headerShown: false,
                    }}  
                    />
                </Stack.Navigator>
            </NavigationContainer>
        ) : ( 
            <NavigationContainer>
                <Tab.Navigator>
                    {/* <Tab.Screen 
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
                    /> */}
                    <Tab.Screen 
                        name="Project List" 
                        component={ProjectListScreen}
                        options={
                            {
                                tabBarStyle: {height: 60},
                                title: 'Project List',
                                tabBarLabel: t('projectList.title'),
                                tabBarIcon: ({ color, size }) => (
                                    <Ionicons name="list" size={size*1.5} color={color} />
                                ),
                                tabBarLabelStyle: {fontSize: 15},
                                headerShown: false,
                            }
                        }
                    />
                    <Tab.Screen 
                        name="Profile" 
                        component={ProfileScreen} 
                        options={
                            {
                                tabBarStyle: {height: 60},
                                title: 'Profile',   
                                tabBarLabel: t('profile.title'),
                                tabBarIcon: ({ color, size }) => (
                                    <Ionicons name="person" size={size*1.5} color={color} />
                                ),
                                tabBarLabelStyle: {fontSize: 15},
                                headerShown: false,
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
                        component={BacklogScreen} 
                        options={
                            {
                                title: 'Projects',
                                tabBarItemStyle: {display: "none"},
                                headerShown: false,
                            }
                        }
                    />
                    <Tab.Screen 
                        name="Kanban" 
                        component={KanbanScreen} 
                        options={
                            {
                                title: 'Kanban',
                                tabBarItemStyle: {display: "none"},
                                headerShown: false,
                            }
                        }
                    />
                    <Tab.Screen 
                        name="Sprint"
                        component={SprintScreen}
                        options={
                            {
                                title: 'Sprint',
                                tabBarItemStyle: {display: "none"},
                                headerShown: false,
                            }
                        }
                    />
                </Tab.Navigator>
            </NavigationContainer>
        )
    ) : null
}

export { Main }
