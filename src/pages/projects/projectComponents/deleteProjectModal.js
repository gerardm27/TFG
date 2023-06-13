import React from 'react';
import { View, Text, TouchableOpacity, Modal, Image, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import { TextInput } from 'react-native-gesture-handler';

const DeleteProjectModal = ({ projectToDelete, deleteProject, visible, setVisible }) => {
    const { t } = useTranslation();
        

    return (
        <Modal transparent={true} visible={visible} animationType='fade'>
            <View style={deleteProjectModalStyles.mainModalView}>
                <View style={deleteProjectModalStyles.modal}>
                    <Text style={deleteProjectModalStyles.modalTitle}>{t("project.deleteProject")}</Text>
                    <Text style={deleteProjectModalStyles.modalSubtitle}>{t("project.deleteProjectSubtitle")}</Text>
                    <View style={deleteProjectModalStyles.buttonsContainer}>
                        <TouchableOpacity style={deleteProjectModalStyles.button} onPress={() => setVisible(false)}>
                            <Text style={deleteProjectModalStyles.buttonText}>{t("project.cancel")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[deleteProjectModalStyles.button, {backgroundColor: "#b53f3f"}]} onPress={() => {
                            deleteProject(projectToDelete);
                            setVisible(false);
                        }}>
                            <Text style={deleteProjectModalStyles.deleteButtonText}>{t("project.delete")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const deleteProjectModalStyles = StyleSheet.create({
    mainModalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.35)'
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%'
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    modalSubtitle: {
        fontSize: 16,
        marginBottom: 10,
        color: "#3f51b5"
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    button: {
        backgroundColor: '#3f51b5',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '30%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    deleteButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

export default DeleteProjectModal;