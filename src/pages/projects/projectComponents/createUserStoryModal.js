import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import { TextInput } from 'react-native-gesture-handler';
import useProjects from '../../../hooks/useProjects';
import DropDownPicker from 'react-native-dropdown-picker';
import useAuth from '../../../hooks/useAuth';

const createUserStoryModal = ({visible, setVisible, project_id}) => {
    
    const { t } = useTranslation();
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(null);
    const [assignedToSelf, setAssignedToSelf] = useState(false);
    const [hasError, setHasError] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [statuses, setStatuses] = useState([]);

    const {getAllUserStoriesStatus, createUserStory} = useProjects();
    const {getAuth} = useAuth();

    useEffect(() => {
        const fetchStatuses = async () => {
            const statuses = await getAllUserStoriesStatus(project_id);
            setStatuses(statuses);
        }
        fetchStatuses();
    }
    , []);

    const newUserStory = async () => {
        if (subject == '') {
            setHasError(true);
            return;
        }
        setHasError(false);
        const auth = await getAuth();
        const userStory = {
            subject: subject,
            project: project_id,
            description: description,
            status: status,
            assigned_to: assignedToSelf ? auth.id : null
        }
        createUserStory(userStory);
        setVisible(false);
    }

    return (
        <Modal
            transparent={true}
            visible={visible}
        >
            <View style={createUserStoryStyles.mainModalView}>
                <View style={createUserStoryStyles.modal}>
                    <Text style={createUserStoryStyles.modalTitle}>{t("project.createUserStory")}</Text>
                    <Text style={createUserStoryStyles.modalText}>{t("project.requiredFields")}</Text>
                    <Text style={[createUserStoryStyles.warningText, hasError ? {color: "red"} : {color: "white"}]}>{t("project.error")}</Text>
                    <View style={createUserStoryStyles.subjectInputContainer}>
                        <Text style={createUserStoryStyles.modalText}>{t("project.subject")} *</Text>
                        <TextInput style={createUserStoryStyles.subjectInput} onChangeText={text => setSubject(text)}></TextInput>
                    </View>
                    <View style={createUserStoryStyles.descriptionInputContainer}>
                        <Text style={createUserStoryStyles.modalText}>{t("project.description")}</Text>
                        <TextInput style={createUserStoryStyles.descriptionInput} onChangeText={text => setDescription(text)}></TextInput>
                    </View>
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
                    <View style={createUserStoryStyles.assignedToSelfContainer}>
                        <Text style={createUserStoryStyles.modalText}>{t("project.assignedToSelf")}</Text>
                        <TouchableOpacity style={createUserStoryStyles.assignedToSelfButton} onPress={() => setAssignedToSelf(!assignedToSelf)}>
                            <Image style={createUserStoryStyles.assignedToSelfImage} source={assignedToSelf ? require('../../../../assets/images/assignedSelf.png') : require('../../../../assets/images/notAssignedSelf.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={createUserStoryStyles.buttonsContainer}>
                        <TouchableOpacity style={createUserStoryStyles.cancelButton} onPress={() => setVisible(false)}>
                            <Text style={createUserStoryStyles.cancelButtonText}>{t("project.cancel")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={createUserStoryStyles.createButton} onPress={() => newUserStory()}>
                            <Text style={createUserStoryStyles.createButtonText}>{t("project.create")}</Text>
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
        marginBottom: 10
    },
    subjectInput: {
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
    }
})
 

export default createUserStoryModal;





                

