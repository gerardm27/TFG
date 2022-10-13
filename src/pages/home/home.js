import { View, Text } from 'react-native';
import React, { useState, createContext, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

function HomeScreen() {
    
    const [usuario, setUser] = useState(null);

    const { getAuth } = useAuth();
    
    useEffect(() => {    
        getAuth().then(item=>{
            console.log(item);
            setUser(item)
        })
    })   

    return(
        <View>
            <Text>Welcome to Taiga, {usuario?.full_name}</Text>
        </View>
    )
}


export { HomeScreen }