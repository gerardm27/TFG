import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {useEffect, useState} from 'react';
import useProjects from '../../hooks/useProjects';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from "react-i18next";
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
    const [bio, setBio] = useState(null);
    const [language, setLanguage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    
    useEffect(() => {
        getAuth().then(user => {
            getNumberOfProjects(user.id).then(async number => {
                setProjectNumber(number);
                //Profile image is a path, needs to be passed through a require
                setProfileImage(user.photo);
                setUsername(user.username);
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
                setBio(user.bio);
            })
        })
    }, [])
    
    

    const defaultImage = require('../../../assets/images/defaultProfile.png');
    
    return (
        <View style = {modalVisible ? profileStyles.pageContainerBlurred : profileStyles.pageContainer}>
            <View style={profileStyles.profileContainer}>
                <View style={profileStyles.imageContainer}>                    
                    <Image source={{uri: profileImage} ?? defaultImage} style={profileStyles.profileImage} />
                    <Text style={profileStyles.username}>{username}</Text>
                </View>
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
            <View style={profileStyles.bioContainer}>
                <Text style={profileStyles.bioHeader}>{t("profile.aboutMe")}</Text>
                <Text style={profileStyles.bio}>{bio}</Text>
            </View>
            <View style={profileStyles.projectsContainer}>
                <Text style={profileStyles.projectHeader}>Projects</Text>
            

            </View>
            <ModalLanguage
                language={language}
                setLanguage={setLanguage}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
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
    },
    username: {
        paddingVertical: 5,
        fontWeight: 'bold',
    },
    bio: {
        paddingBottom: 5,
    },
    bioHeader: {
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    imageContainer: {
        alignItems: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    numberOfProjects: {
        fontSize: 18,
        fontWeight: "bold",
    },
    numberContainer: {
        alignItems: 'center',
        alignContent: 'center',
    },
    bioContainer: {
        padding: 10,
    }
})

export {ProfileScreen};