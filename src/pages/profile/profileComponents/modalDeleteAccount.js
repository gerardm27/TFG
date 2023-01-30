import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useTranslation } from "react-i18next";

const ModalDeleteAccount = ({ modalVisible, setModalVisible }) => {
    const { t } = useTranslation();
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            Alert.alert("Modal has been closed.");
        }}
        >
        <View style={deleteAccountModalStyles.centeredView}>
            <View style={deleteAccountModalStyles.modalView}>
            <Text style={deleteAccountModalStyles.modalText}>{t("editProfile.deleteAccountSure")}</Text>
            <Text style={deleteAccountModalStyles.modalSubText}>{t("editProfile.deleteAccountDescription")}</Text>
            <View style={deleteAccountModalStyles.modalButtonsContainer}>
                <TouchableOpacity
                style={deleteAccountModalStyles.cancelButton}
                onPress={() => {
                    setModalVisible(!modalVisible);
                }}
                >
                <Text style={deleteAccountModalStyles.cancelButtonText}>{t("editProfile.cancel")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={deleteAccountModalStyles.deleteButton}
                onPress={() => {
                    setModalVisible(!modalVisible);
                }}
                >
                <Text style={deleteAccountModalStyles.deleteButtonText}>{t("editProfile.delete")}</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </Modal>
    );
}

const deleteAccountModalStyles = StyleSheet.create({
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
        elevation: 5,
        width: "85%"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    },
    modalSubText: {
        marginBottom: 50,
        textAlign: "center",
        color: "gray",
        fontSize: 15,
    },
    modalButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%"
    },
    cancelButton: {
        backgroundColor: "lightgray",
        borderRadius: 20,
        borderWidth: 1,
        padding: 10,
        elevation: 2
    },
    deleteButton: {
        backgroundColor: "#f57676",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#a85151",
        padding: 10,
        elevation: 2
    },
    cancelButtonText: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    deleteButtonText: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    }
});


export default ModalDeleteAccount;


