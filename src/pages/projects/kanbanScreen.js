import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";
import DragAndDrop from "volkeno-react-native-drag-drop";
import { useTranslation } from "react-i18next";
import useProjects from '../../hooks/useProjects';


function KanbanScreen({navigation, route}) {
  const screenWidth = Dimensions.get('window').width;
  
  const { project } = route.params;
  const { 
    getAllUserStories, 
    updateUserStoryStatus, 
    getAllUserStoriesStatus, 
    getAllTasks,
    getAllTasksStatus,
    updateTaskStatus, } = useProjects();
  
  const { t } = useTranslation();
  const [items, setItems] = React.useState([]);
  const [zones, setZones] = React.useState([]);
  const [statusPerStory, setStatusPerStory] = React.useState(0);
  const [statusColors, setStatusColors] = React.useState([]);
  const [lengthPerStatus, setLengthPerStatus] = React.useState(0);
  const [userStories, setUserStories] = React.useState([]);
  const [isLooping, setIsLooping] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLooping(true);
      const userStories = await getAllUserStories(project.id);
      const taskStatuses = await getAllTasksStatus(project.id);
      const tmp = await getAllUserStoriesStatus(project.id);
      setUserStories(userStories);
      setStatusPerStory(tmp.length);
      setLengthPerStatus(screenWidth / tmp.length);
      tmp.map((status) => {
        setStatusColors((statusColors) => [...statusColors, status.color]);
      });
      const newZones = [];
      for await (const userStory of userStories) {
        const userStoryTasks = await getAllTasks(userStory.id);
        
        const filteredTaskStatuses = taskStatuses.filter((taskStatus, index, self) =>
          index === self.findIndex((t) => t.name === taskStatus.name)
        );
  
        const zones = filteredTaskStatuses.map((taskStatus) => {
          const tasks = userStoryTasks.filter((task) => task.status === taskStatus.id);
          return {
            id: `${taskStatus.id}-${userStory.id}`,
            text: taskStatus.name,
            items: tasks.map((task) => ({ id: task.id, text: task.subject })),
          };
        });
  
        newZones.push(...zones);
      }
  
      setZones(newZones);
      setItems([]);
      setIsLooping(false);
    };
    if(!isLooping){
      fetchData();
    }
  }, [items]);

  return (
    <View 
    onLayout={(event) => {
      let {height} = event.nativeEvent.layout;
      console.log(height);
    }}
    style={{height: '100%'}}>
      { project ? 
          <ScrollView style={kanbanScreenStyles.projectContainer}>
              <View style={kanbanScreenStyles.topInfoContainer}>
                  <View style={kanbanScreenStyles.imageContainer}>
                      <Image source={{uri: project.logo_big_url} ?? defaultLogo} style={kanbanScreenStyles.projectImage}/>
                  </View>
                  <View style={kanbanScreenStyles.projectInfoContainer}>
                      <Text style={kanbanScreenStyles.projectTitle}>{project.name}</Text>
                      <Text style={kanbanScreenStyles.projectDescription}>{project.description}</Text>
                  </View>
                  <View style={kanbanScreenStyles.goToKanbanContainer}>
                      <TouchableOpacity style={kanbanScreenStyles.goToKanbanButton}
                          onPress={() => navigation.navigate("Projects", {project: project})}
                      >
                          <Text style={kanbanScreenStyles.goToKanbanButtonText}>{t('project.backlogView')}</Text>
                      </TouchableOpacity>
                  </View>
              </View>
              <ScrollView horizontal contentContainerStyle={kanbanScreenStyles.kanbanContainer}>
                <View style={[kanbanScreenStyles.userStoriesContainer]}>
                  {userStories.map((story) => {
                    return (
                      <View style={[kanbanScreenStyles.userStoryContainer]}>
                        <Text style={kanbanScreenStyles.userStoryID}>#{story.id}</Text>
                        <Text style={kanbanScreenStyles.userStoryText}>#{story.subject}</Text>
                      </View>
                    );
                  })
                  }
                </View>
                <DragAndDrop
                  style={[kanbanScreenStyles.container, {width: statusPerStory * 350}]}
                  contentContainerStyle={kanbanScreenStyles.contentContainerStyle}
                  itemKeyExtractor={(item) => item.id}
                  zoneKeyExtractor={(zone) => zone.id}
                  zones={zones}
                  items={items}
                  itemsContainerStyle={kanbanScreenStyles.itemsContainerStyle}
                  zonesContainerStyle={[kanbanScreenStyles.zonesContainerStyle]}
                  onMaj={(zones, items) => {
                    setItems([]);
                    setZones(zones);
                  }}
                  itemsInZoneStyle={kanbanScreenStyles.itemsInZoneStyle}
                  renderItem={(item) => {
                    return (
                      <View style={kanbanScreenStyles.dragItemStyle}>
                        <Text style={kanbanScreenStyles.dragItemTextStyle}>--------------</Text>
                      </View>
                    );
                  }}
                  renderZone={(zone, children, hover) => {
                    return (
                      <View
                      style={{
                        ...kanbanScreenStyles.dragZoneStyle,
                        backgroundColor: hover ? "lightgreen" : "#FFF",
                        width: 2000 / (statusPerStory - 1),
                      }}
                      >
                        <Text styles={kanbanScreenStyles.dragZoneTextStyle}>{zone.text}</Text>
                        {children}
                      </View>
                    );
                  }}
                />
                </ScrollView>
          </ScrollView>
          
          :
          <Text>Loading your projects...</Text>
      }
      
    </View>
  );
}

const kanbanScreenStyles = StyleSheet.create({
  kanbanContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  container: {
    width: "100%",
  },
  itemsInZoneStyle: {
    width: "45%",
  },
  contentContainerStyle: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  itemsContainerStyle: {
    width: 0,
    height: 0,
  },
  zonesContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  dragItemStyle: {
    borderColor: "#F39200",
    borderWidth: 1,
    width: "100%",
    backgroundColor: "cyan",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    padding: 10,
  },
  dragItemTextStyle: {
    width: "100%",
    color: "#011F3B",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 30,
  },
  dragZoneStyle: {
    borderColor: "#F39200", //statusColor
    borderWidth: 2,
    padding: 15,
    minHeight: 150,
    marginVertical: 15,
  },
  dragZoneTextStyle: {
    position: "absolute",
    opacity: 0.2,
    zIndex: 0,
    alignSelf: "center",
    top: "50%",
  },
  projectContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: "100%",
},
topInfoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    height: "20%"
},
imageContainer: {
    marginLeft: 20,
    marginBottom: 10,
},
projectImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
},
projectInfoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 20,
    marginBottom: 10,
},
projectTitle: {
    fontSize: 20,
    fontWeight: "bold",
},
projectDescription: {
    fontSize: 15,
},
changeStatusContainer: {
    flex: 1,
    flexDirection: "row",   
},
statusPage: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: 10,
    margin: 10,
    padding: 10,
},
statusPageTop: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    maxHeight: 50,
    minHeight: 50,
},
statusPageTitle: {
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
},
statusPageContent: {
    width: "100%",
    flexDirection: "column",
},
listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightgrey",
    width: "100%",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: 125,
    minHeight: 125,
},
listItemLeft: {
    alignItems: "flex-start",
    width: "60%",
},
listItemTitle: {
    fontSize: 20,
    fontWeight: "bold",
},
listItemButton: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    
},
listItemButtonText: {
    color: "black",
    fontWeight: "bold",
},
listItemRight: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    minHeight: "50%",
    height: "60%",
    flexWrap: "wrap",
    maxWidth: "100%",
    minWidth: "100%",
    backgroundColor: "white",
},
movingButtonsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",        
},

nextStatusText: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
},
textAndIconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
},
userStoriesContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: 10,
    margin: 10,
    padding: 10,

},
userStoryContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightgrey",
    width: "100%",
    borderRadius: 10,
    margin: 10,
    padding: 10,
},


});
    
export {KanbanScreen};