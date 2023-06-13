import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import useProjects from '../../../hooks/useProjects';


const ChangeTaskAssignedModal = ({ task, visible, setVisible, generateStoryBoard }) => {
    const { t } = useTranslation();

    const { editTask, getProjectMembers } = useProjects();

    const [members, setMembers] = useState([]);
    const [memberNames, setMemberNames] = useState([]);
    const [memberIds, setMemberIds] = useState([]);
    const [memberMails, setMemberMails] = useState([]);
    const [memberUserID, setMemberUserID] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            const _members = await getProjectMembers(task?.project);
            setMembers(_members);
            setMemberIds(_members.map(member => member.id));
            setMemberNames(_members.map(member => member.full_name));
            setMemberMails(_members.map(member => member.email));
            setMemberUserID(_members.map(member => member.user));
        }
        fetchMembers();
    }, []);

    const changeTaskAssigned = async (index) => {
        if (index != null) {

            const _task = {
                version: task.version,
                assigned_to: memberUserID[index]
            }
            await editTask(task.id, _task);
            generateStoryBoard();
            setVisible(false);
        }
        else {
            const version = task.version;
            const task = {
                version: version,
                assigned_to: null
            }
            await editTask(task.id, task);
            generateStoryBoard();
            setVisible(false);
        }
    }

    if (task == null) {
        return null;
    }

    return (
        <Modal transparent={true} visible={visible} animationType='fade'>
            <View style={changeTaskAssignedModalStyles.mainModalView}>
                <ScrollView contentContainerStyle={[changeTaskAssignedModalStyles.modal, {minHeight: 150 + (memberMails.length + 1)*30}]}>
                    <Text style={changeTaskAssignedModalStyles.modalTitle}>{t("sprint.changeTaskMember")}</Text>
                    <Text style={changeTaskAssignedModalStyles.modalSubtitle}>{t("sprint.changeTaskMemberSubtitle")}</Text>
                    <View style={changeTaskAssignedModalStyles.statusButtonsContainer}>
                        {memberNames?.map((member, index) => (
                            members[index]?.is_user_active == false ? null :
                            <TouchableOpacity key={index} style={[changeTaskAssignedModalStyles.statusButton, {borderColor: members[index]?.color}]} onPress={() => changeTaskAssigned(index)}>
                                <Text style={changeTaskAssignedModalStyles.statusButtonText}>
                                    {member == null ? memberMails[index] : member}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity style={[changeTaskAssignedModalStyles.statusButton, {borderColor: "gray"}]} onPress={() => changeTaskAssigned(null)}>
                            <Text style={changeTaskAssignedModalStyles.statusButtonText}>
                                {t("sprint.changeTaskMemberNoOne")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[changeTaskAssignedModalStyles.statusButtonClose, {backgroundColor: "#c6c6c6", marginTop: 40}]} onPress={() => setVisible(false)}>
                            <Text style={changeTaskAssignedModalStyles.statusButtonText}>
                                {t("project.cancel")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )

}

const changeTaskAssignedModalStyles = StyleSheet.create({
    mainModalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modal: {
        backgroundColor: "#fff",
        marginTop: "50%",
        width: "80%",
        borderRadius: 10,
        padding: 20,
        alignItems: "center", 
        justifyContent: "flex-start",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold"
    },
    modalSubtitle: {
        fontSize: 14,
        marginTop: 10
    },
    statusButtonsContainer: {
        flexDirection: "column",
        marginTop: 10,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    statusButton: {
        backgroundColor: "#e6e6e6",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        minWidth: "80%",
        alignItems: "center",
        borderWidth: 2,
    },
    statusButtonClose: {
        backgroundColor: "#e6e6e6",
        padding: 10,
        borderRadius: 10,
        minWidth: "80%",
        alignItems: "center",
        borderWidth: 2,      
    },
    statusButtonText: {
        fontSize: 16,
        color: "#000",
        fontWeight: "bold"
    },

})

export default ChangeTaskAssignedModal;