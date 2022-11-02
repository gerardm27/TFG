import React, { useContext, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './context/authContext';
import { SignInScreen, SignUpScreen, HomeScreen, SettingsScreen, ProjectListScreen, ProjectScreen } from './pages';
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
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Project List" component={ProjectListScreen} />
                    <Tab.Screen name="Settings" component={SettingsScreen} />
                    <Tab.Screen name="Projects" component={ProjectScreen} options={{tabBarItemStyle: {display: "none"},}}/>
                </Tab.Navigator>
            </NavigationContainer>
        )
    ) : null
}

export { Main }
