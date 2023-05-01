import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import useProjects from '../../../hooks/useProjects';


const ChangeTaskStatusModal = ({ task, visible, setVisible, statuses, statusColors, statusIds, generateStoryBoard }) => {
    const { t } = useTranslation();

    const { updateTaskStatus } = useProjects();

    const changeTaskStatus = async (index) => {
        if (index != null) {
            const version = task.version;
            await updateTaskStatus(task.id, version, statusIds[index]);
            generateStoryBoard();
            setVisible(false);
        }
    }

    if (task == null) {
        return null;
    }

    return (
        <Modal transparent={true} visible={visible}>
            <View style={changeTaskStatusModalStyles.mainModalView}>
                <View style={changeTaskStatusModalStyles.modal}>
                    <Text style={changeTaskStatusModalStyles.modalTitle}>{t("sprint.changeTaskStatus")}</Text>
                    <Text style={changeTaskStatusModalStyles.modalSubtitle}>{t("sprint.changeTaskStatusSubtitle")}</Text>
                    <View style={changeTaskStatusModalStyles.statusButtonsContainer}>
                        {statuses.map((status, index) => (
                            status == task.status_extra_info.name ? null 
                            :
                            <TouchableOpacity key={index} style={[changeTaskStatusModalStyles.statusButton, {backgroundColor: statusColors[index]}]} onPress={() => changeTaskStatus(index)}>
                                <Text style={changeTaskStatusModalStyles.statusButtonText}>
                                    {status}
                                </Text>
                            </TouchableOpacity>
                            
                        ))}
                        <TouchableOpacity style={[changeTaskStatusModalStyles.statusButton, {backgroundColor: "#c6c6c6", marginTop: 40}]} onPress={() => setVisible(false)}>
                            <Text style={changeTaskStatusModalStyles.statusButtonText}>
                                {t("project.cancel")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )

}

const changeTaskStatusModalStyles = StyleSheet.create({
    mainModalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modal: {
        minHeight: "50%",
        backgroundColor: "#fff",
        width: "80%",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
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
        flex: 1,
        flexDirection: "column",
        marginTop: 10,
        width: "100%",
        marginRight: 20,
    },
    statusButton: {
        backgroundColor: "#e6e6e6",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: "100%",
        alignItems: "center"
    },
    statusButtonText: {
        fontSize: 16,
        color: "#000",
        fontWeight: "bold"
    },

})

export default ChangeTaskStatusModal;