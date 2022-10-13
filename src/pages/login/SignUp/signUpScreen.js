import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

function SignUpScreen({ navigation }) {

    const { signUp } = useAuth();

    const [showPassword, setShowPassword] = useState(true);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { name, email, password } = user;

    const onChangeText = (text, name) => {
        setUser({
            ...user,
            [name]: text 
        })
    }

    const createUser = async () => {
        if(name.length === 0 || email.length === 0 || password.length === 0) {
            alert('Please fill all fields');
            return;
        }
        else 
            signUp(user);
    }

    return (
        <View style={styles.container}>
            <View>
                <View>
                    <Text style={styles.subtitle}>
                        Enter your data to sign up
                    </Text>
                </View>
                <TextInput
                    onChangeText={(e) => onChangeText(e, 'name')}
                    value={name}
                    style={styles.input}
                    placeholder="Name:"
                />
                <TextInput
                    onChangeText={(e) => onChangeText(e, 'email')}
                    value={email}
                    style={styles.input}
                    name="email"
                    placeholder="Email:"
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        onChangeText={(e) => onChangeText(e, 'password')}
                        value={password}
                        style={[styles.input, {marginBottom: 0, width: '90%'}]}
                        name="password"
                        placeholder="Password:"
                        textContentType="password"
                        secureTextEntry={showPassword}
                    />
                    <View style={[]}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Image
                                source={require('../../../../assets/images/showPwd.png')}
                                style={styles.showPwd}
                            />
                        </TouchableOpacity>
                    </View>

                </View>

                <Button
                    onPress={() => createUser()}
                    title="Sign Up"
                />
            </View>
            <View style={styles.button}>
                <Button
                    onPress={() => navigation.navigate('SignIn')}
                    title="Go to SignIn"
                />
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        padding: 20,
    },
    showPwd: {
        width: 40,
        height: 40,
    },
    subtitle: {
        marginBottom: 10,
    },
    button: {
        width: '50%',
        alignSelf: 'center',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    input: {
        height: 40, 
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
    }
})

export { SignUpScreen }