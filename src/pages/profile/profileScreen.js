import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import {useEffect, useState} from 'react';
import useProjects from '../../hooks/useProjects';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from "react-i18next";
<<<<<<< HEAD
import ModalLanguage from './profileComponents/modalLanguage';
import AsyncStorage from "@react-native-async-storage/async-storage";

function ProfileScreen({navigation}) {
    const { t, i18n } = useTranslation();
    const { getNumberOfProjects } = useProjects();
    const { getAuth } = useAuth();
    const STORE_LANGUAGE_KEY = "settings.lang";


    const [projectNumber, setProjectNumber] = useState(0);
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState(null);
<<<<<<< HEAD
    const [bio, setBio] = useState(null);
    const [language, setLanguage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [fullName, setFullName] = useState(null);
    const [email, setEmail] = useState(null);

    
    useEffect(() => {
        getAuth().then(user => {
            getNumberOfProjects(user.id).then(async number => {
                setProjectNumber(number);
<<<<<<< HEAD
                //Profile image is a path, needs to be passed through a require
                setProfileImage(user.photo);
                setUsername(user.username);
                setBio(user.bio);
                setFullName(user.full_name);
                setEmail(user.email);
                try { 
                    await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
                        if (language) {
                            setLanguage(language);
                        } else {
                            setLanguage(user.lang);
                        }
                    });
                } catch (e) {
                    console.log("Error: " + e);
                }
            })
        })
    }, [])
    
    

    const defaultImage = require('../../../assets/images/defaultProfile.png');
    
    return (
        <View style = {modalVisible ? profileStyles.pageContainerBlurred : profileStyles.pageContainer}>
            <View style={profileStyles.profileTopContainer}>
                <View style={profileStyles.imageContainer}>                    
                    <Image source={{uri: profileImage} ?? defaultImage} style={profileStyles.profileImage} />
=======
                setProfileImage(user.photo);
                setUsername(user.username);
                setLanguage(user.lang);
            })
        })
    }, [])

    const defaultImage = require('../../../assets/images/defaultProfile.png');

    return (
        <View>
            <View style={profileStyles.profileContainer}>
                <View style={profileStyles.imageContainer}>
                    <Image source={profileImage ?? defaultImage} style={profileStyles.profileImage} />
>>>>>>> main
                    <Text style={profileStyles.username}>{username}</Text>
                </View>
                <View style={profileStyles.infoTopContainer}>
                    <View style={profileStyles.numberContainer}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Project List')}}>
                            <View style={profileStyles.numberContainer}>
                                <Text style={profileStyles.numberOfProjects}>{projectNumber}</Text>
                                <Text>
                                    {t("profile.publicProjects")}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={profileStyles.numberContainer}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Project List')}}>
                            <View style={profileStyles.numberContainer}>
                                <Text style={profileStyles.numberOfProjects}>{projectNumber}</Text>
                                <Text>
                                    {t("profile.privateProjects")}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={profileStyles.numberContainer}>
                        <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible)}}>
                            <View style={profileStyles.numberContainer}>
                                <Text style={profileStyles.numberOfProjects}>{language}</Text>
                                <Text>
                                    {t('profile.language')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={profileStyles.editProfileContainer}>
                <TouchableOpacity 
                    styles={profileStyles.editProfileButtonContainer} 
                    onPress={()=>{navigation.navigate('Edit Profile', {fullName: fullName, username: username, bio: bio, email: email, profileImage: profileImage, language: language})}}
                >
                    <View style={profileStyles.editProfileButton}>
                        <Image source={require('../../../assets/images/edit.png')} style={profileStyles.editProfileImage}/>
                        <Text style={profileStyles.editProfileText}>{t("profile.editProfile")}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={profileStyles.bioContainer}>
                <Text style={profileStyles.bioHeader}>{t("profile.aboutMe")}</Text>
                <Text style={profileStyles.bio}>{bio}</Text>
            </View>
            <View style={profileStyles.mailContainer}>
                <Text style={profileStyles.mailHeader}>{t("profile.email")}</Text>
                <Text style={profileStyles.mail}>{email}</Text>
            </View>
            <View style={profileStyles.linkButtonsContainer}>
                <TouchableOpacity style={profileStyles.buttonContainer} onPress={() => {Linking.openURL('https://community.taiga.io/c/faq/21')}}>
                    <View style={profileStyles.linkButton}>
                        <Image source={require('../../../assets/images/faq.png')} style={profileStyles.linkButtonImage}/>
                        <Text style={profileStyles.linkButtonText}>{t("profile.faq")}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={profileStyles.buttonContainer} onPress={() => {Linking.openURL('https://tree.taiga.io/user-settings/user-profile')}}>
                    <View style={profileStyles.linkButton}>
                        <Image source={require('../../../assets/images/website.png')} style={profileStyles.linkButtonImage}/>
                        <Text style={profileStyles.linkButtonText}>{t("profile.webProfile")}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ModalLanguage
                language={language}
                setLanguage={setLanguage}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
=======
                    <Text style={profileStyles.numberOfProjects}>{language=="" ? "EN" : language}</Text>
                    <TouchableOpacity onPress={()=>{i18n.changeLanguage("en");}}>
                        <Text>
                            {t('profile.language')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
>>>>>>> main
        </View>
    )
}

const profileStyles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pageContainerBlurred: {
        flex: 1,
        backgroundColor: '#fff',
        opacity: 0.3,
    },
    profileImage: {
        resizeMode: 'cover',
        width: 80,
        height: 80,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'black',
    },
    username: {
        paddingVertical: 5,
        fontWeight: 'bold',
    },
<<<<<<< HEAD
    bio: {
        paddingVertical: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        paddingHorizontal: 10,
        width: '85%',
        textAlign: 'justify',
    },
    bioHeader: {
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    mail: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        padding: 10,
        width: '85%',
    },
    mailHeader: {
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    imageContainer: {
        alignItems: 'center',
        width: '25%',
    },
    infoTopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '75%',
    },
    profileTopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#f5f5f5',
    },
    numberOfProjects: {
        fontSize: 18,
        fontWeight: "bold",
    },
    numberContainer: {
        alignItems: 'center',
<<<<<<< HEAD
        alignContent: 'center',
    },
    bioContainer: {
        padding: 10,
        alignItems: 'center',
    },
    mailContainer: {
        padding: 10,
        paddingTop: 0,
        alignItems: 'center',
    },
    linkButtonsContainer: {
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        width: '80%',
        alignSelf: 'center',
    },
    buttonContainer: {
        width: '35%',
        alignItems: 'center',
    },
    linkButton: {
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        width: '100%',
    },
    linkButtonText: {
        fontWeight: 'bold',
    },
    linkButtonImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    editProfileContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 20,
    },
    editProfileButtonContainer: {
        width: '100%',
    },
    editProfileButton: {
        flexDirection: 'row',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        padding: 10,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    editProfileImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginRight: 10,
    },
    editProfileText: {
        fontWeight: 'bold',
    },  
})

export {ProfileScreen};