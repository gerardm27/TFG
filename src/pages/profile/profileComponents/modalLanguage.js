import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useTranslation } from "react-i18next";

const ModalLanguage = ({ modalVisible, setModalVisible, language, setLanguage }) => {

    const { t, i18n } = useTranslation();

    const [languageSelected, setLanguageSelected] = useState(language);

    const changeLanguage = (language) => {
        setLanguageSelected(language);
        i18n.changeLanguage(language);
        setLanguage(language);
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
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    <Text style={modalStyles.modalText}>{t("profile.language")}</Text>
                    <View style={modalStyles.languageContainer}>
                        {/*add a flag instead of the text showing the language*/}
                        <TouchableOpacity style={modalStyles.languageButton} onPress={() => changeLanguage("en")}>
                            <Image source={require('../../../../assets/images/flag.png')} style={modalStyles.flagImage} />
                            <Text style={languageSelected == "en" ? modalStyles.languageSelected : modalStyles.languageNotSelected}>
                                EN
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={modalStyles.languageButton} onPress={() => changeLanguage("es")}>
                            <Image source={require('../../../../assets/images/flag.png')} style={modalStyles.flagImage} />
                            <Text style={languageSelected == "es" ? modalStyles.languageSelected : modalStyles.languageNotSelected}>
                                ES
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={modalStyles.languageButton} onPress={() => changeLanguage("ca")}>
                            <Image source={require('../../../../assets/images/flag.png')} style={modalStyles.flagImage} />                        
                            <Text style={languageSelected == "ca" ? modalStyles.languageSelected : modalStyles.languageNotSelected}>
                                CA
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={modalStyles.closeButton}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={modalStyles.closeText}>{t("profile.close")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const modalStyles = StyleSheet.create({
    centeredView: {
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
        elevation: 5
    },
    closeButton: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    closeText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    languageContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginBottom: 20,
    },
    languageButton: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    languageSelected: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    languageNotSelected: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    flagImage: {
        width: 30,
        height: 30,
        resizeMode: "contain"
    }
});


export default ModalLanguage;