import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import React, { useState, useContext } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useTranslation } from "react-i18next";

function SignInScreen({ navigation }) {
    const { t } = useTranslation();

    const { signIn } = useAuth();

    const [showPassword, setShowPassword] = useState(true);
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState({
        error: false, 
        message: ''
    });
    const [isLoading, setLoading] = useState(false);

    const { email, password } = user;

    const onChangeText = (text, name) => {
        setUser({
            ...user,
            [name]: text 
        })
    }

    const SignIn = () => {
        if(email.length === 0 || password.length === 0) {
            //Form Error
            setError({
                error: true,
                message: t('login.fillFields')
            });
        }else {
            setLoading(true);
            signIn(user)
                .then()
                .catch(err => {
                    setError({error:true, message: t('login.errorLogin')});
                    console.log(err);
                })
                .finally(()=> setLoading(false));
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../../assets/images/logo.png')}
                    style={[styles.logo]}
                />
                <View style={styles.logoTextContainer}>
                    <Text style={styles.logoTextOne}>
                        Taiga
                    </Text>
                    <Text style={styles.logoTextTwo}>
                        App
                    </Text>
                </View>
            </View>
            <View style={[styles.topContainer]}>
                <View>
                    <Text style={styles.title}>
                        {t('login.title')}
                    </Text>
                    <Text style={styles.subtitle}>
                        {t('login.subtitle')}
                    </Text>
                </View>
                {error.error ?
                    <View style={styles.errorContainer}>
                        <Text style={styles.error}>
                            {error.message}
                        </Text>
                    </View>
                : null}
                <TextInput
                    onChangeText={(text) => onChangeText(text, 'email')}
                    value={email}
                    style={styles.input}
                    name="email"
                    placeholder={t('login.email')}
                    autoCapitalize='none'
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        onChangeText={(text) => onChangeText(text, 'password')}
                        value={password}
                        style={[styles.input, {marginBottom: 0, width: '90%'}]}
                        name="password"
                        placeholder={t('login.password')}
                        textContentType="password"
                        autoCapitalize='none'
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
                <TouchableOpacity
                    onPress={()=> SignIn()}
                    disabled={isLoading}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        {isLoading ? t('login.loading') : t('login.title')}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text>
                    {t('login.noAccount')}
                </Text>
                <View style={{marginLeft: 5}}>
                    <Text style={{color: '#966bed', fontWeight: 'bold'}} onPress={() => {Linking.openURL('https://tree.taiga.io/register')}}>
                        {t('login.signup')}
                    </Text>
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    topContainer: {
        width: '90%',
    },
    logoContainer: {
        marginVertical: "20%",
    },
    showPwd: {
        width: 40,
        height: 40,
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
    },
    logoTextOne: {
        fontSize: 35,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#7ea684',
    },
    logoTextTwo: {
        fontSize: 35,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#837094',
    },
    logoTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    subtitle: {
        marginBottom: 10,
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
        borderBottomWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
    },
    button: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#c0a7f2',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
    },
    errorContainer: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor:'#ff00001c',
        padding: 5,
    },
    footer: {
        flexDirection: 'row',
        marginTop: 20,
        alignSelf: 'center',
    }
})



export { SignInScreen }