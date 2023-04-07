import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useTranslation } from "react-i18next";
import useProjects from '../../../hooks/useProjects';

const MembersModal = ({ project, modalVisible, setModalVisible }) => {
    const { t } = useTranslation();
    const [members, setMembers] = useState(null);
    const [users, setUsers] = useState([]);
/* 
    const { getAllMembers, addMemberToProject, removeMemberFromProject } = useProjects();

    const getMembers = async () => {
        const members = await getAllMembers(project.id);
        setMembers(members);
    }

    const addMember = async (username, role) => {
        await addMemberToProject(project.id, username, role);
        getMembers();
    }

    const removeMember = async (user_id) => {
        await removeMemberFromProject(project.id, user_id);
        getMembers();
    } 

    useEffect(() => {
        getMembers();
    }, []);*/

    return (
        <Modal visible={modalVisible}>
        </Modal>
    )
}


export default MembersModal;