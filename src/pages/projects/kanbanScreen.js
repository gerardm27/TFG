import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import DragAndDrop from "volkeno-react-native-drag-drop";
import { useTranslation } from "react-i18next";
import useProjects from '../../hooks/useProjects';


function KanbanScreen({navigation, route}) {
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

  useEffect(() => {
    const fetchData = async () => {
      const userStories = await getAllUserStories(project.id);
      const taskStatuses = await getAllTasksStatus(project.id);
      const newZones = [];
  
      for (const userStory of userStories) {
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
    };
  
    fetchData();
  }, [project.id]);

  /* useEffect(() => {
    console.log("Items changed", items);
  }, [items]);

  useEffect(() => {
    console.log("Zones changed", zones);
  }, [zones]); */

  return (
    <View style={{height: '100%'}}>
      { project ? 
          <ScrollView style={styles.projectContainer}>
              <View style={styles.topInfoContainer}>
                  <View style={styles.imageContainer}>
                      <Image source={{uri: project.logo_big_url} ?? defaultLogo} style={styles.projectImage}/>
                  </View>
                  <View style={styles.projectInfoContainer}>
                      <Text style={styles.projectTitle}>{project.name}</Text>
                      <Text style={styles.projectDescription}>{project.description}</Text>
                  </View>
                  <View style={styles.goToKanbanContainer}>
                      <TouchableOpacity style={styles.goToKanbanButton}
                          onPress={() => navigation.navigate("Projects", {project: project})}
                      >
                          <Text style={styles.goToKanbanButtonText}>{t('project.backlogView')}</Text>
                      </TouchableOpacity>
                  </View>
              </View>
              <ScrollView horizontal>
                <DragAndDrop
                style={styles.container}
                contentContainerStyle={styles.contentContainerStyle}
                itemKeyExtractor={(item) => item.id}
                zoneKeyExtractor={(zone) => zone.id}
                zones={zones}
                items={items}
                itemsContainerStyle={styles.itemsContainerStyle}
                zonesContainerStyle={styles.zonesContainerStyle}
                onMaj={(zones, items) => {
                  setItems(items);
                  setZones(zones);
                }}
                itemsInZoneStyle={styles.itemsInZoneStyle}
                renderItem={(item) => {
                  return (
                    <View style={styles.dragItemStyle}>
                      <Text style={styles.dragItemTextStyle}>{item.text}</Text>
                    </View>
                  );
                }}
                renderZone={(zone, children, hover) => {
                  return (
                    <View
                    style={{
                      ...styles.dragZoneStyle,
                      backgroundColor: hover ? "lightgreen" : "#FFF",
                    }}
                    >
                      <Text stylae={styles.dragZoneTextStyle}>{zone.text}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsInZoneStyle: {
    width: "100%",
  },
  contentContainerStyle: {
    padding: 20,
    paddingTop: 40,
  },
  itemsContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  zonesContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dragItemStyle: {
    borderColor: "#F39200",
    borderWidth: 1,
    width: "47%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  dragItemTextStyle: {
    color: "#011F3B",
    fontWeight: "700",
    textAlign: "center",
  },
  dragZoneStyle: {
    borderColor: "#F39200", //statusColor
    borderWidth: 1,
    width: "47%",
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
  },projectContainer: {
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
});
    
export {KanbanScreen};