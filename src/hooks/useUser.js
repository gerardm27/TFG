import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
const useUserSettings = () => {
    const { saveUserSettings, language } = useContext(UserContext);

    const setLanguage = (language) => {
        saveUserSettings({ language });
    }
    useEffect(()=>{},[language])
    return { setLanguage, language };
}

export default useUserSettings;