import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import { TextInput } from 'react-native-gesture-handler';
import useProjects from '../../../hooks/useProjects';
import DropDownPicker from 'react-native-dropdown-picker';
import useAuth from '../../../hooks/useAuth';

const createTaskModal = ({visible, setVisible, userStory, generateStoryBoard}) => {
    
    const { t } = useTranslation();
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [assignedMember, setAssignedMember] = useState(null);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [openMember, setOpenMember] = useState(false);
    const [valueMember, setValueMember] = useState(null);

    const [statuses, setStatuses] = useState([]);
    const [members, setMembers] = useState([]);

    const {getAllTasksStatus, createTask, getProjectMembers} = useProjects();
    const {getAuth} = useAuth();
    
    useEffect(() => {
        const fetchStatuses = async () => {
            const statuses = await getAllTasksStatus(userStory.project);
            setStatuses(statuses);
        }
        fetchStatuses();
    }
    , []);

    useEffect(() => {
        const fetchMembers = async () => {
            const members = await getProjectMembers(userStory.project);
            setMembers(members);
        }
        fetchMembers();
    }, []);

    const newTask = async () => {
        if (subject == '') {
            setHasError(true);
            return;
        }
        setHasError(false);
        const auth = await getAuth();
        console.log(assignedMember);
        const task = {
            subject: subject,
            project: userStory.project,
            user_story: userStory.id,
            description: description,
            status: status,
            //assigned_to: assignedMember,
        }
        createTask(task);
        generateStoryBoard();
        setVisible(false);
    }

    return (
        <Modal
            transparent={true}
            visible={visible}
        >
            <View style={createTaskStyles.mainModalView}>
                <View style={createTaskStyles.modal}>
                    <Text style={createTaskStyles.modalTitle}>{t("sprint.createTask")}</Text>
                    <Text style={createTaskStyles.modalText}>{t("project.requiredFields")}</Text>
                    <Text style={[createTaskStyles.warningText, hasError ? {color: "red"} : {color: "white"}]}>{t("project.error")}</Text>
                    <View style={createTaskStyles.subjectInputContainer}>
                        <Text style={createTaskStyles.modalText}>{t("project.subject")} *</Text>
                        <TextInput style={createTaskStyles.subjectInput} onChangeText={text => setSubject(text)}></TextInput>
                    </View>
                    <View style={createTaskStyles.descriptionInputContainer}>
                        <Text style={createTaskStyles.modalText}>{t("project.description")}</Text>
                        <TextInput style={createTaskStyles.descriptionInput} onChangeText={text => setDescription(text)}></TextInput>
                    </View>
                    <View style={createTaskStyles.statusInputContainer}>
                        <Text style={createTaskStyles.modalText}>{t("project.status")}</Text>
                        <DropDownPicker
                            items={statuses.map(status => {
                                return {label: status.name, value: status.id}
                            }
                            )}
                            defaultValue={status}
                            containerStyle={{height: 40}}
                            style={createTaskStyles.statusInput}
                            itemStyle={createTaskStyles.statusInputItem}
                            open={open}
                            setOpen={setOpen}
                            value={value}
                            setValue={setValue}
                            onChangeValue={value => setStatus(value)}
                        />
                    </View>
                    <View style={createTaskStyles.assignContainer}>
                        <Text style={createTaskStyles.modalText}>{t("project.assignTo")}</Text>
                        <DropDownPicker
                            items={members.map(member => {
                                return {label: member.full_name, value: member.id}
                            }
                            )}
                            containerStyle={{height: 40}}
                            style={createTaskStyles.memberInput}
                            itemStyle={createTaskStyles.memberInputItem}
                            open={openMember}
                            setOpen={setOpenMember}
                            value={valueMember}
                            setValue={setValueMember}
                            onChangeValue={value => setAssignedMember(value)}
                        />
                    </View>
                    <View style={createTaskStyles.buttonsContainer}>
                        <TouchableOpacity style={createTaskStyles.cancelButton} onPress={() => setVisible(false)}>
                            <Text style={createTaskStyles.cancelButtonText}>{t("project.cancel")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={createTaskStyles.createButton} onPress={() => newTask()}>
                            <Text style={createTaskStyles.createButtonText}>{t("project.create")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const createTaskStyles = StyleSheet.create({
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
    assignContainer: {
        marginTop: 10,
        marginBottom: 40
    },
    memberInput: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        padding: 5,
        height: 40
    },
    memberInputItem: {
        justifyContent: "flex-start"
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
 

export default createTaskModal;





                

