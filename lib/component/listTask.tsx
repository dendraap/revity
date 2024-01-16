import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { defaultStyles } from '../constants/Style'
import Colors from '../constants/Colors'
import { Swipeable } from 'react-native-gesture-handler'

const ListTask = ({ tasks, categories, onCheck, onEdit, onDelete, modal, fetchingTask, updatingTask, deletingTask, fetchingCategories, now }: any) => {
  const [categoryActiveItem, setCategoryActiveItem] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);

  let rowRefs = new Map();

  const handleItemCategoryClick = (id: any) => {
    setCategoryActiveItem(id);
  }

  useEffect(() => {
    if (!fetchingTask && !updatingTask && !deletingTask && !fetchingCategories) {
      if (categoryActiveItem === null) {
        setCategoryActiveItem(categories[0].idcategories)
      }
      if (categoryActiveItem === categories[0].idcategories) {
        setFilteredTasks(tasks)
      } else {
        const filteredTasks = tasks.filter((task: any) => task.categories_idcategories === categoryActiveItem);
        setFilteredTasks(filteredTasks);
      }
    }
  }, [tasks, categories, categoryActiveItem, fetchingTask, updatingTask, deletingTask, fetchingCategories])

  const rightSwipe = (idtasks: any, title: any, email: any, set_date: any, set_reminer: any, is_complete: any, categories: any, taskWithCategoryId: any, taskWithCategoryName: any, displayDate: any) => {
    return (
      <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: 120, height: '100%', borderRadius: 10, justifyContent: 'flex-end', backgroundColor: Colors.primary }]}>
        <TouchableOpacity
          onPress={() => onEdit(idtasks, title, email, set_date, set_reminer, is_complete, categories, taskWithCategoryId, taskWithCategoryName, displayDate, modal.current?.present())}
          style={{ backgroundColor: Colors.primary, width: 60, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name='md-pencil' size={24} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(idtasks, email)}
          disabled={deletingTask}
          style={{ backgroundColor: Colors.danger, width: 60, height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
          {
            deletingTask
              ? <ActivityIndicator size="large" color="#ffffff" />
              : <MaterialCommunityIcons name='delete' size={24} color={Colors.white} />
          }
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {(!fetchingCategories && !fetchingTask)
        ? (
          <View style={{ flex: 1, gap: 15 }}>
            <FlatList
              data={categories}
              keyExtractor={(item) => String(item.idcategories)}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ gap: 15, height: 41 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleItemCategoryClick(item.idcategories)}
                  style={[
                    defaultStyles.btnPrimarySecondaryPill,
                    {
                      paddingHorizontal: item.name.length > 1 ? 15 : 20,
                      height: 35,
                      marginRight: 5,
                      backgroundColor: categoryActiveItem === item.idcategories ? Colors.primary : Colors.primarySecondary,
                    }
                  ]}
                >
                  <Text
                    style={[
                      defaultStyles.textRegular,
                      {
                        alignSelf: 'center',
                        color: categoryActiveItem === item.idcategories ? Colors.white : Colors.dark,
                      }
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />

            {filteredTasks.length === 0
              ? (
                <View style={{ height: '83%', justifyContent: 'center' }}>
                  <Image source={require('../../assets/images/empty_task.png')} style={{ resizeMode: 'center', alignSelf: 'center', height: '50%' }} />
                  <Text style={[defaultStyles.textMd, { textAlign: 'center', textAlignVertical: 'top', }]}>
                    Belum ada tugas nih
                  </Text>
                  <Text style={[defaultStyles.textRegular, { textAlign: 'center', textAlignVertical: 'top', }]}>
                    Klik + untuk membuat tugasmu
                  </Text>
                </View>
              )
              : (
                <FlatList
                  data={filteredTasks}
                  keyExtractor={(item: any) => String(item.idtask)}
                  style={{ gap: 15, height: '100%' }}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View style={{ backgroundColor: Colors.primary, borderRadius: 10, marginBottom: 10 }}>
                      <Swipeable
                        renderRightActions={() => rightSwipe(item.idtask, item.title, item.email, item.set_date, item.set_reminder, item.is_complete, item.categories_idcategories, item.tasksWithCategory.idcategories, item.tasksWithCategory.name, item.displayDate)}
                        overshootRight={false}
                        key={item.idtask}
                        ref={ref => {
                          if (ref && !rowRefs.get(item.idtask)) {
                            rowRefs.set(item.idtask, ref);
                          }
                        }}
                        onSwipeableWillOpen={() => {
                          [...rowRefs.entries()].forEach(([key, ref]) => {
                            if (key !== item.idtask && ref) ref.close();
                          });
                        }}
                      >
                        <View
                          style={
                            [defaultStyles.flatList,
                            item.is_complete
                              ? { flex: 1, borderColor: Colors.orange }
                              : item.set_date < now
                                ? { flex: 1, borderColor: Colors.danger }
                                : { flex: 1, borderColor: Colors.dark }
                            ]
                          }
                        >
                          <TouchableOpacity
                            onPress={() => onCheck(item.idtask, item.email, item.is_complete)}
                            style={[
                              defaultStyles.checkbox,
                              item.is_complete
                                ? { backgroundColor: Colors.orange, borderColor: Colors.orange }
                                : null
                            ]}
                          >
                            {item.is_complete && <Ionicons name="checkmark-outline" size={18} style={{ color: 'white' }} />}
                          </TouchableOpacity>
                          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                              <View style={{ flexDirection: 'row' }}>
                                <Text style={[defaultStyles.textMdBold, { textAlignVertical: 'center', textDecorationLine: item.is_complete ? 'line-through' : 'none' }]}>
                                  {item.title}
                                </Text>
                                {item.is_complete
                                  ? null
                                  : item.set_date < now
                                    ? <Text style={[defaultStyles.textMdBold, { color: Colors.danger }]}>
                                      *
                                    </Text>
                                    : null
                                }
                              </View>
                              <Text
                                style={[
                                  defaultStyles.textSm,
                                  item.is_complete
                                    ? null
                                    : item.set_date < now
                                      ? { textAlignVertical: 'center', color: Colors.danger }
                                      : { textAlignVertical: 'center' }
                                ]}
                              >
                                {item.displayDate}
                              </Text>
                            </View>
                            <MaterialIcons name="keyboard-arrow-left" size={30} color="black" style={{ alignSelf: 'center' }} />
                          </View>
                        </View>
                      </Swipeable>
                    </View>
                  )}
                />
              )
            }
          </View>
        )
        : (
          <Text>Loading...</Text>
        )
      }
    </>
  );

}

export default ListTask