import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import { TextInput } from 'react-native-gesture-handler';
import useProjects from '../../../hooks/useProjects';
import DropDownPicker from 'react-native-dropdown-picker';

const CreateBulkUserStoryModal = ({ visible, setVisible, project_id }) => {

    const { t } = useTranslation();
    const [subjects, setSubjects] = useState([]);
    const [status, setStatus] = useState(null);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [statuses, setStatuses] = useState([]);

    const {getAllUserStoriesStatus, createUserStory} = useProjects();
    
    useEffect(() => {
        const fetchStatuses = async () => {
            const statuses = await getAllUserStoriesStatus(project_id);
            setStatuses(statuses);
        }
        fetchStatuses();
    }
    , []);

    const SaveAndCreateNew = async () => {
        if (subjects.length == 0) {
            return;
        }
        subjects.map((subject) => {
            subject = subject.toString().trim();
            if (subject == '') {
                return;
            }
            const userStory = {
                subject: subject,
                project: project_id,
                status: status,
            }
            createUserStory(userStory);
        });
        setVisible(false);
        setSubjects([]);
        setValue(null); 
    }

    return (
        <Modal
            transparent={true}
            visible={visible}
        >
            <View style={createUserStoryStyles.mainModalView}>
                <View style={createUserStoryStyles.modal}>
                    <Text style={createUserStoryStyles.modalTitle}>{t("project.createBulkUserStory")}</Text>
                    <View style={createUserStoryStyles.statusInputContainer}>
                        <Text style={createUserStoryStyles.modalText}>{t("project.status")}</Text>
                        <DropDownPicker
                            items={statuses.map(status => {
                                return {label: status.name, value: status.id}
                            }
                            )}
                            defaultValue={status}
                            containerStyle={{height: 40}}
                            style={createUserStoryStyles.statusInput}
                            itemStyle={createUserStoryStyles.statusInputItem}
                            open={open}
                            setOpen={setOpen}
                            value={value}
                            setValue={setValue}
                            onChangeValue={value => setStatus(value)}
                        />
                    </View>
                    <View style={createUserStoryStyles.subjectInputContainer}>
                        <Text style={createUserStoryStyles.modalText}>{t("project.subjects")}</Text>
                        <TextInput 
                            style={createUserStoryStyles.subjectInput} 
                            onChangeText={text => setSubjects(text.split(/\r?\n/))}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>
                    <View style={createUserStoryStyles.buttonsContainer}>
                        <TouchableOpacity style={createUserStoryStyles.cancelButton} onPress={() => setVisible(false)}>
                            <Text style={createUserStoryStyles.cancelButtonText}>{t("project.cancel")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={createUserStoryStyles.saveButton} onPress={() => SaveAndCreateNew()}>
                            <Text style={createUserStoryStyles.saveButtonText}>{t("project.saveAndCreateNew")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const createUserStoryStyles = StyleSheet.create({
    mainModalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modal: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    modalText: {
        fontSize: 16,
        marginBottom: 5
    },
    warningText: {
        fontSize: 16,
        marginBottom: 10
    },
    subjectInputContainer: {
        marginVertical: 10
    },
    subjectInput: {
        textAlignVertical: "top",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        padding: 5
    },
    descriptionInputContainer: {
        marginBottom: 10
    },
    descriptionInput: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        padding: 5,
        height: 100
    },
    statusInputContainer: {
        marginBottom: 10
    },
    statusInput: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        padding: 5,
        height: 40
    },  
    statusInputItem: {
        justifyContent: "flex-start"
    },
    assignedToSelfContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingVertical: 10
    },
    assignedToSelfButton: {
        marginLeft: 10,
        marginTop: 10
    },
    assignedToSelfImage: {
        width: 50,
        height: 50
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    cancelButton: {
        backgroundColor: "#b53f3f",
        padding: 10,
        borderRadius: 5,
        marginLeft: 10
    },
    cancelButtonText: {
        color: "white",
        fontWeight: "bold"
    },
    createButton: {
        backgroundColor: "#3f51b5",
        padding: 10,
        borderRadius: 5,
        marginLeft: 10
    },
    createButtonText: {
        color: "white",
        fontWeight: "bold"
    },
    saveButton: {
        backgroundColor: "#3f51b5",
        padding: 10,
        borderRadius: 5,
        marginLeft: 10
    },
    saveButtonText: {
        color: "white",
        fontWeight: "bold"
    },


})

export default CreateBulkUserStoryModal;





    