import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { TextInput } from 'react-native-gesture-handler';
import { Switch } from 'react-native-paper';

const CreateProjectModal = ({ visible, setVisible, createProject }) => {
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isKanban, setIsKanban] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    const [hasError, setHasError] = useState(false);

    const sendProject = (name, description, isKanban, isPublic) => {
        if (name === "" || description === "") {
            setHasError(true);
            alert(t("project.created"));
        } else {
            setHasError(false);
            const project = {
                name: name,
                description: description,
                is_kanban_activated: isKanban,
                is_private: !isPublic
            }
            createProject(project);
            setVisible(false);
        }
    }

    return (
        <Modal transparent={true} visible={visible}>
            <View style={createProjectModalStyles.mainModalView}>
                <View style={createProjectModalStyles.modal}>
                    <Text style={createProjectModalStyles.modalTitle}>{t("project.createProject")}</Text>
                    <Text style={createProjectModalStyles.modalSubtitle}>{t("project.requiredFields")}</Text>
                    <Text style={hasError ? {color: "red"} : {color: "white"}}>{t("project.error")}</Text>
                    <View style={createProjectModalStyles.nameInputContainer}>
                        <Text style={createProjectModalStyles.modalText}>{t("project.name")} *</Text>
                        <TextInput style={createProjectModalStyles.nameInput} onChangeText={(text) => setName(text)} />
                    </View>
                    <View style={createProjectModalStyles.descriptionInputContainer}>
                        <Text style={createProjectModalStyles.modalText}>{t("project.description")} *</Text>
                        <TextInput numberOfLines={3} style={createProjectModalStyles.descriptionInput} onChangeText={(text) => setDescription(text)} />
                    </View>
                    <View style={createProjectModalStyles.isKanbanContainer}>
                        <Text style={createProjectModalStyles.modalText}>{t("project.workflow")}</Text>
                        <View style={createProjectModalStyles.workflowIconsContainer}>
                            <TouchableOpacity 
                                style= {isKanban ? createProjectModalStyles.workflowIconContainer : createProjectModalStyles.workflowIconContainerSelected} 
                                onPress={() => setIsKanban(false)}>
                                <Image style={createProjectModalStyles.workflowIcon} source={require('../../../../assets/images/scrum.png')} />
                                <Text style={createProjectModalStyles.workflowIconText}>{t("project.scrum")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style= {!isKanban ? createProjectModalStyles.workflowIconContainer : createProjectModalStyles.workflowIconContainerSelected}
                                onPress={() => setIsKanban(true)}>
                                <Image style={createProjectModalStyles.workflowIcon} source={require('../../../../assets/images/kanban.png')} />
                                <Text style={createProjectModalStyles.workflowIconText}>{t("project.kanban")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={createProjectModalStyles.isPublicContainer}>
                        <Text style={createProjectModalStyles.modalText}>{t("project.visibility")}</Text>
                        <View style={createProjectModalStyles.visibilityIconsContainer}>
                            <TouchableOpacity
                                style={!isPublic ? createProjectModalStyles.visibilityIconContainer : createProjectModalStyles.visibilityIconContainerSelected}
                                onPress={() => setIsPublic(true)}>
                                <Image style={createProjectModalStyles.visibilityIcon} source={require('../../../../assets/images/public.png')} />
                                <Text style={createProjectModalStyles.visibilityIconText}>{t("project.public")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={isPublic ? createProjectModalStyles.visibilityIconContainer : createProjectModalStyles.visibilityIconContainerSelected}
                                onPress={() => setIsPublic(false)}>
                                <Image style={createProjectModalStyles.visibilityIcon} source={require('../../../../assets/images/private.png')} />
                                <Text style={createProjectModalStyles.visibilityIconText}>{t("project.private")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={createProjectModalStyles.buttonsContainer}>
                        <TouchableOpacity style={createProjectModalStyles.closeButton} onPress={() => setVisible(false)}>
                            <Text style={createProjectModalStyles.closeButtonText}>{t("editProfile.cancel")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={createProjectModalStyles.createButton} onPress={() => sendProject(name, description, isKanban, isPublic)}>
                            <Text style={createProjectModalStyles.createButtonText}>{t("project.create")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const createProjectModalStyles = StyleSheet.create({
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
    modalText: {
        fontSize: 16,
        marginBottom: 10
    },
    closeButton: {
        backgroundColor: '#b53f3f',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '30%',
    },
    closeButtonText: {
        color: 'white',
        textAlign: 'center'
    },
    createButton: {
        backgroundColor: '#3f51b5',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 10,
        width: '30%',
    },
    createButtonText: {
        color: 'white',
        textAlign: 'center'
    },
    nameInputContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 10
    },
    nameInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5
    },
    descriptionInputContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 10,
    },
    descriptionInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    isKanbanContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    workflowIconContainerSelected: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#707bb8',
        backgroundColor: '#c1c5e3',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10
    },
    isPublicContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    visibilityIconContainerSelected: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#707bb8',
        backgroundColor: '#c1c5e3',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10
    },
    visibilityIconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%'
    },
    visibilityIconContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    visibilityIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    visibilityIconText: {
        fontSize: 16,
        marginTop: 5
    },
    workflowIconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%'
    },
    workflowIconContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    workflowIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    workflowIconText: {
        fontSize: 16,
        marginTop: 5
    }






});

export default CreateProjectModal;