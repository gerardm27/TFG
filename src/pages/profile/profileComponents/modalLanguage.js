import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ModalLanguage = ({ modalVisible, setModalVisible, language, setLanguage }) => {

    const { t, i18n } = useTranslation();

    const [languageSelected, setLanguageSelected] = useState(language);
    const STORE_LANGUAGE_KEY = "settings.lang";
    const DEFAULT_LANGUAGE = "settings.defaultlang";

    const changeLanguage = async (language) => {
        if (language == "default") {
            await AsyncStorage.getItem(DEFAULT_LANGUAGE).then((language) => {
                setLanguageSelected(language);
                i18n.changeLanguage(language);
            });
        } else {
            setLanguageSelected(language);
            await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
            i18n.changeLanguage(language);
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={modalStyles.modalContainer}>
                <View style={modalStyles.modalView}>
                    <Text style={modalStyles.modalText}>{t("profile.language")}</Text>
                    <View style={modalStyles.languageContainer}>
                        <TouchableOpacity style={modalStyles.languageButton} onPress={() => changeLanguage("en")}>
                            <Image source={require('../../../../assets/images/english_flag.png')} style={modalStyles.flagImage} />
                            <Text style={languageSelected == "en" ? modalStyles.languageSelected : modalStyles.languageNotSelected}>
                                EN
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={modalStyles.languageButton} onPress={() => changeLanguage("es")}>
                            <Image source={require('../../../../assets/images/spanish_flag.png')} style={modalStyles.flagImage} />
                            <Text style={languageSelected == "es" ? modalStyles.languageSelected : modalStyles.languageNotSelected}>
                                ES
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={modalStyles.languageButton} onPress={() => changeLanguage("ca")}>
                            <Image source={require('../../../../assets/images/catalan_flag.png')} style={modalStyles.flagImage} />                        
                            <Text style={languageSelected == "ca" ? modalStyles.languageSelected : modalStyles.languageNotSelected}>
                                CA
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={modalStyles.buttonContainer}>
                        <TouchableOpacity
                            style={modalStyles.defaultButton}
                            onPress={() => changeLanguage("default")}
                        >
                            <Text style={modalStyles.closeText}>{t("profile.backToDefault")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={modalStyles.closeButton}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={modalStyles.closeText}>{t("profile.close")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
//Add the styles so that the modal covers the middle of the screen but has a width of 70% of the screen. Also, get the colors of the application
const modalStyles = StyleSheet.create({ 
        
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "70%"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    },
    languageContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    languageButton: {
        flexDirection: "row",
        alignItems: "center"
    },
    flagImage: {
        width: 20,
        height: 15,
        marginRight: 10
    },
    languageSelected: {
        color: "#c0a7f2",
        fontSize: 20,
        fontWeight: "bold"
    },
    languageNotSelected: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    },
    closeButton: {
        backgroundColor: "#f57676",
        borderRadius: 20,
        borderWidth: 0.3,
        width: "85%",
        padding: 10,
        elevation: 2,
        marginTop: 20
    },
    closeText: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    defaultButton: {
        backgroundColor: "#c0a7f2",
        borderRadius: 20,
        borderWidth: 0.3,
        width: "85%",
        padding: 10,
        elevation: 2,
        marginTop: 20      
    },
    buttonContainer: {
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%"
    }
});


export default ModalLanguage;