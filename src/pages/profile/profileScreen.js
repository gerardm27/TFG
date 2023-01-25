import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {useEffect, useState} from 'react';
import useProjects from '../../hooks/useProjects';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from "react-i18next";

function ProfileScreen() {
    const { t, i18n } = useTranslation();
    const { getNumberOfProjects } = useProjects();
    const { getAuth } = useAuth();
    //const { setLanguageTranslation, languageTranslation } = useUserSettings();
    //Build a use effect that gets the number of projects of the user obtained from getAuth
    const [projectNumber, setProjectNumber] = useState(0);
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState(null);
    const [language, setLanguage] = useState(null);

    useEffect(() => {
        //setLanguageTranslation(language);
        getAuth().then(user => {
            getNumberOfProjects(user.id).then(number => {
                setProjectNumber(number);
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
                    <Text style={profileStyles.numberOfProjects}>{language=="" ? "EN" : language}</Text>
                    <TouchableOpacity onPress={()=>{i18n.changeLanguage("en");}}>
                        <Text>
                            {t('profile.language')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    imageContainer: {
        alignItems: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 20,
    },
    numberOfProjects: {
        fontSize: 18,
        fontWeight: "bold",
    },
    numberContainer: {
        alignItems: 'center',
    },
    
})

export {ProfileScreen};