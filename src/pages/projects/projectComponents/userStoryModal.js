import React, {useState, useEffect} from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import useProjects from '../../../hooks/useProjects';
import DropDownPicker from 'react-native-dropdown-picker';

const UserStoryModal = ({ userStory, visible, setVisible }) => {
    const { t } = useTranslation();
    const [project, setProject] = useState(null);
    
    const [pointsIDs, setPointsIDs] = useState(null);
    const [pointsValues, setPointsValues] = useState(null);
    const pointTexts = [
        t("project.ux"),
        t("project.design"),
        t("project.frontend"),
        t("project.backend"),]

    const { getProject, getProjectPoints } = useProjects();
    
    useEffect(() => {
        const fetchData = async () => {
            if (userStory == null) {
                return;
            }
            await getProjectPoints(userStory.project).then((points) => {
                setPointsIDs(points.map((point) => point.id));
                setPointsValues(points.map((point) => point.name));
            });
        }
        fetchData();
    }, []);


    const buildPointsBox = (points) => {
        const pointComponents = [];
        if (points != null && pointsIDs != null && pointsValues != null) {
          var i = 0;
          for (let point in points) {
            let j = pointsIDs.indexOf(points[point]);
            if (j != -1) {
              pointComponents.push(
                <Text key={point} style={userStoryModalStyles.storyPointsBoxItem}>
                  {pointTexts[i]}: {pointsValues[j]}
                </Text>
              );
            }
            i++;
          }
        }
        return pointComponents;
      }

    return (
        <Modal transparent={true} visible={visible}>
            <View style={userStoryModalStyles.mainModalView}>
                <View style={userStoryModalStyles.modal}>
                    <View style={userStoryModalStyles.modalContentContainer}>
                        <View style={userStoryModalStyles.modalLeftContainer}>
                            <View style={userStoryModalStyles.modalTitleContainer}>
                                <Text style={userStoryModalStyles.storyIdText}>#{userStory.id}</Text>
                                <Text style={userStoryModalStyles.storySubjectText}>{userStory.subject}</Text>
                                <Text style={[{backgroundColor: userStory.status_extra_info.color},userStoryModalStyles.storyStatusText]}>{userStory.status_extra_info.name}</Text>
                            </View>
                            <Text style={userStoryModalStyles.storyDescriptionText}>{userStory.description}</Text>
                        </View>
                        <View style={userStoryModalStyles.modalRightContainer}>
                            <View style={userStoryModalStyles.storyAssignedTo}>
                                <Image style={userStoryModalStyles.storyAssignedToImage} source={(userStory.assigned_to_extra_info == null ? require("../../../../assets/images/notAssignedSelf.png") : {uri: userStory.assigned_to_extra_info.photo})} />
                                <Text style={userStoryModalStyles.storyAssignedToText}>{(userStory.assigned_to_extra_info == null ? t("project.notAssigned") : userStory.assigned_to_extra_info.username)}</Text>
                            </View>
                            <View style={userStoryModalStyles.storyPointsContainer}>
                                <Text style={userStoryModalStyles.storyPointsText}>{t("project.points")}:</Text>
                                <View style={userStoryModalStyles.storyPointsBox}>
                                    {buildPointsBox(userStory.points)}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={userStoryModalStyles.buttonContainer}>
                        <TouchableOpacity style={userStoryModalStyles.closeButton} onPress={() => setVisible(false)}>
                            <Text style={userStoryModalStyles.closeButtonText}>{t("project.edit")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={userStoryModalStyles.closeButton} onPress={() => setVisible(false)}>
                            <Text style={userStoryModalStyles.closeButtonText}>{t("profile.close")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
  );
};

const userStoryModalStyles = StyleSheet.create({
    mainModalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modal: {
        width: '90%',
        height: '50%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10
    },
    modalContentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
        minHeight: 200,
    },
    modalLeftContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '70%',
        paddingRight: 10,
    },
    modalRightContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '30%',
    },
    modalTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: 10
    },
    storyIdText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 10
    },
    storySubjectText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 10
    },
    storyStatusText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        padding: 5,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1
    },
    storyDescriptionText: {
        fontSize: 15,
        color: '#000'
    },
    storyAssignedTo: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        marginVertical: 10,
    },
    storyAssignedToImage: {
        width: 50,
        height: 50,
    },
    storyAssignedToText: {
        fontSize: 15,
        color: '#000'
    },
    storyPointsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: 10,
    },
    storyPointsText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    storyPointsBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: "90%",
        height: 30,
        borderColor: '#000',
        borderWidth: 1,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    storyPointsBoxItem: {
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    closeButton: {
        width: '45%',
        height: 50,
        backgroundColor: '#000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    editButton: {
        width: '45%',
        height: 50,
        backgroundColor: '#000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    editButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    closeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    


});

export default UserStoryModal;
