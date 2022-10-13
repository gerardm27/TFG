import { View, Text, Button } from 'react-native'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import useAuth from '../../hooks/useAuth';

function SettingsScreen() {

    const { signOut } = useAuth();
    
    return(
        <View>
            <Text>Welcome to the settings screen</Text>
            <Button
                title="LogOut"
                onPress={() => signOut()}
            />
        </View>
    )
}

export { SettingsScreen }