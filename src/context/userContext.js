import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import * as languages from '../i18n';

const UserSettingsContext = createContext({});

const UserSettingsProvider = ({ children }) => {

    i18n.defaultLocale = 'en';
    i18n.fallbacks = true;
    i18n.translations = languages;

    const initialState = {
        language: Localization.locale,
    }

    const [userSettings, setUserSettings] = useState(initialState);

    const getUserSettings = async () => {
        try {
            const userSettingsString = await AsyncStorage.getItem('userSettings');
            const userSettings = JSON.parse(userSettingsString);
            setUserSettings(userSettings);
            setLanguage(userSettings);
        } catch (error) {
            setUserSettings(initialState);
        }
    }

    const saveUserSettings = async (userSettings) => {
        try {
            setUserSettings(userSettings); 
            setLanguage(userSettings);
            await AsyncStorage.setItem('userSettings', JSON.stringify(userSettings));
        } catch (error) {
           Promise.reject(error); 
        }
    }

    const setLanguage = (userSettings) => {
        if(userSettings?.language) {
            i18n.locale = userSettings.language;
        }else{
            i18n.locale = Localization.locale;
        }
    }

    useEffect(()=>{
        getUserSettings();
    },[])
    return (
        <UserSettingsContext.Provider value={{ saveUserSettings, language: userSettings?.language }}>
            {children}
        </UserSettingsContext.Provider>
    )

}

export { UserSettingsContext, UserSettingsProvider };
