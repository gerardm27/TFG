import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './context/authContext';
import { SignInScreen, SignUpScreen, HomeScreen, SettingsScreen } from './pages/';

const Tab = createBottomTabNavigator();
const Stack =  createStackNavigator();

function Main() {
    const { auth } = useContext(AuthContext);

    return(
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
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Settings" component={SettingsScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    )
}

export { Main }
