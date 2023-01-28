import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {useEffect, useState} from 'react';
import useProjects from '../../hooks/useProjects';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from "react-i18next";
import ModalLanguage from './profileComponents/modalLanguage';

function ProfileScreen() {
    const { t, i18n } = useTranslation();
    const { getNumberOfProjects } = useProjects();
    const { getAuth } = useAuth();
    //const { setLanguageTranslation, languageTranslation } = useUserSettings();
    //Build a use effect that gets the number of projects of the user obtained from getAuth
    const [projectNumber, setProjectNumber] = useState(0);
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState(null);
    const [bio, setBio] = useState(null);
    const [language, setLanguage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        //setLanguageTranslation(language);
        getAuth().then(user => {
            getNumberOfProjects(user.id).then(number => {
                setProjectNumber(number);
                //Profile image is a path, needs to be passed through a require
                setProfileImage(user.photo);
                setUsername(user.username);
                setLanguage(user.lang);
                setBio("This is a bio and it stores information about the user.");
                console.log(JSON.stringify(user))
            })
        })
    }, [])
    
    const defaultImage = require('../../../assets/images/defaultProfile.png');
    
    return (
        <View>
            <View style={profileStyles.profileContainer}>
                <View style={profileStyles.imageContainer}>                    
                    <Image source={{uri: profileImage} ?? defaultImage} style={profileStyles.profileImage} />
                    <Text style={profileStyles.username}>{username}</Text>
                </View>
                <View style={profileStyles.numberContainer}>
                    <Text style={profileStyles.numberOfProjects}>{projectNumber}</Text>
                    <Text>{t("profile.publicProjects")}</Text>
                </View>
                <View style={profileStyles.numberContainer}>
                    <Text style={profileStyles.numberOfProjects}>{projectNumber}</Text>
                    <Text>{t("profile.privateProjects")}</Text>
                </View>
                <View style={profileStyles.numberContainer}>
                    <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible)}}>
                        <View style={profileStyles.numberContainer}>
                            <Text style={profileStyles.numberOfProjects}>{language=="" ? "EN" : language}</Text>
                            <Text>
                                {t('profile.language')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={profileStyles.bioContainer}>
                <Text style={profileStyles.bioHeader}>{/* {t("profile.bio")} */}About me:</Text>
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
        paddingVertical: 20,
        paddingHorizontal: 10,
        /* backgroundColor: 'lightgray', */
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
        paddingHorizontal: 15,
    }
})

export {ProfileScreen};