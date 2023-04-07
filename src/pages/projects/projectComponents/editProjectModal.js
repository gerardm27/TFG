import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import { TextInput } from 'react-native-gesture-handler';

const EditProjectModal = ({ project, visible, setVisible, editProject}) => {
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");


    const edit = () => {
        if(name === ""){
            setName(project.name);
        }
        if(description === ""){
            setDescription(project.description);
        }
        editProject(project.id, name, description);
        setVisible(false);
    }

    return (
        <Modal transparent={true} visible={visible}>
            <View style={editProjectModalStyles.mainModalView}>
                <View style={editProjectModalStyles.modal}>
                    <Text style={editProjectModalStyles.modalTitle}>{t("project.editProject")}</Text>
                    <Text style={editProjectModalStyles.modalSubtitle}>{t("project.editProjectSubtitle")}</Text>
                    <TextInput
                        style={editProjectModalStyles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder={t("project.name")}
                        placeholderTextColor="#3f51b5"
                    />
                    <TextInput
                        style={editProjectModalStyles.input}
                        onChangeText={setDescription}
                        value={description}
                        placeholder={t("project.description")}
                        placeholderTextColor="#3f51b5"
                    />
                    <View style={editProjectModalStyles.buttonsContainer}>
                        <TouchableOpacity style={editProjectModalStyles.button} onPress={() => setVisible(false)}>
                            <Text style={editProjectModalStyles.buttonText}>{t("project.cancel")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[editProjectModalStyles.button, {backgroundColor: "#3f51b5"}]} onPress={() => {
                            edit();
                            setVisible(false);
                        }}>
                            <Text style={editProjectModalStyles.deleteButtonText}>{t("project.save")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const editProjectModalStyles = StyleSheet.create({
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
    input: {
        height: 40,
        borderColor: '#3f51b5',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
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
        borderRadius: 10
    },
    buttonText: {
        color: 'white'
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default EditProjectModal;