// import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Keyboard, FlatList, Image, Animated, ActivityIndicator } from 'react-native';
// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { useUser, useAuth } from '@clerk/clerk-expo';
// import Colors from '../../lib/constants/Colors';
// import { defaultStyles } from '../../lib/constants/Style';
// import { StatusBar } from 'expo-status-bar';
// import Header from '../../lib/component/header';
// import CardVisualize from '../../lib/component/cardVisualize';
// import HomeDoughnutChart from '../../lib/component/doughnatchart';
// import FilterTask from '../../lib/component/filterTasks';
// import { BottomSheetBackdrop, BottomSheetTextInput, BottomSheetModal, BottomSheetView, BottomSheetFlatList, BottomSheetScrollView } from '@gorhom/bottom-sheet';
// import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import FloatingButton from '../../lib/component/floatingButton';
// import { useMutation, useQuery } from '@apollo/client';
// import Swipeable from 'react-native-gesture-handler/Swipeable';

// // GET
// import { CATEGORIES } from '../query/categories';
// import { TASKS } from '../query/tasks';

// // POST
// import { INSERT_TASK_MUTATION } from '../mutation/addTasks';
// import { INSERT_CATEGORY_ONE_MUTATION } from '../mutation/addCategory';

// // UPDATE
// import { UPDATE_TASKS_STATUS } from '../mutation/updateTasksStatus';
// import { UPDATE_TASKS } from '../mutation/updateTasks';

// // DELETE
// import { DELETE_TASK } from '../mutation/deleteTask';


// const Home = () => {
//   const { user } = useUser();
//   const [categories, setCategories] = useState([]); // menyimpan list category
//   const [tasks, setTasks] = useState([]); // menyimpan list task
//   const [taskId, setTaskId] = useState(''); // menampung idtask
//   const [title, setTitle] = useState(''); // menampung title
//   const [categoriesId, setCategoriesId] = useState(''); // menampung categories_idcategories
//   const [selectedCategory, setSelectedCategory] = useState(''); // menampung kategori yang dipilih
//   const [deadline, setDeadline] = useState(''); // menampung set_date
//   const [reminder, setReminder] = useState(null); // menampung set_reminder
//   const [tempDeadline, setTempDeadline] = useState(''); // menampung set_date dalam bentuk user friendly
//   const [tempReminder, setTempReminder] = useState(''); // menampung set_date dalam bentuk user friendly
//   const [curType, setCurType] = useState(''); // menyimpan type tanggal yang dipilih set_date atau set_reminder
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // menampung modal tanggal tampil atau tidak
//   const [categoryName_input, setCategoryName_input] = useState(''); // menyimpan nama kategori ketika ada input
//   const [taskToDelete, setTaskToDelete] = useState(null); // menyimpan data sementara isTask yang ingin dihapus
//   const [displayCategory, setDisplayCategory] = useState('+ Kategori');
//   const email = user?.emailAddresses[0].emailAddress;
//   const [tempTask, setTempTask] = useState({
//     idtask: "",
//     title: "",
//     email: email,
//     set_date: "",
//     set_reminder: null,
//     is_complete: false,
//     categories_idcategories: "",
//     taskWithCategory: {
//       idcategories: "",
//       name: "",
//     },
//     tempDeadline: "",
//     tempReminder: "",
//   })
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null)
//   // const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

//   // GET
//   const { loading: tasksLoading, error, data: tasksList, refetch: refetchTasks } = useQuery(TASKS, {
//     variables: { email: email }
//   });

//   useEffect(() => {
//     if (!tasksLoading && tasksList) {
//       // setTasks(tasksList.tasks || []);
//       setTasks(tasksList.tasks);
//       console.log('tasks: ', tasks)
//     }
//   }, [tasksList, tasksLoading, tempTask]);

//   const { data: categoryList } = useQuery(CATEGORIES, {
//     variables: { email: email },
//   });

//   useEffect(() => {
//     if (categoryList && categoryList.categories) {
//       setCategories(categoryList.categories);
//     }
//   }, [categoryList]);

//   // console.log(tasks)

//   // Refresh Data
//   // const { loading: tasksLoading, refetch: refetchTasks } = useQuery(TASKS, {
//   //   variables: { email: email },
//   // });

//   const { loading: categoryLoading, refetch: refetchCategory } = useQuery(CATEGORIES, {
//     variables: { email: email },
//   });

//   const [insertTaskOne, {loading: addingTask}] = useMutation(INSERT_TASK_MUTATION, {
//     update: (cache, { data }) => {
//       const newTask = data?.insert_tasks?.returning;

//       if (newTask) {
//         const { tasks } = cache.readQuery({
//           query: TASKS,
//           variables: { email: email },
//         });

//         cache.writeQuery({
//           query: TASKS,
//           variables: { email: email },
//           data: { tasks: [...tasks, newTask] },
//         });
//       }
//       //   refetchTasks();

//       //   const newTask = insert_tasks.returning[0];

//       // // Update the state to include the newly inserted task
//       // setTasks((prevTasks) => [newTask, ...prevTasks]);
//       // console.log('task after add',tasks)

//     }
//   });
//   // {update: (cache, {data: {insert_tasks}}) => {
//   //   refetchTasks();
//   // }}

//   const [insertCategoriesOne] = useMutation(INSERT_CATEGORY_ONE_MUTATION, {
//     update: (cache, { data: { insert_categories_one } }) => {
//       refetchCategory();
//     },
//   });

//   // POST
//   const handleAddTask = async () => {
//     try {
//       let usedCategory = tempTask.categories_idcategories;
//       if (tempTask.title === '') {
//         Keyboard.dismiss();
//         modalErrorTitle();
//       } else if (tempTask.set_date === '') {
//         Keyboard.dismiss();
//         modalErrorDeadline();
//       } else {
//         if (usedCategory === '') {
//           usedCategory = '8d21d870-fe89-47c0-b306-e4b5281c541c';
//         }
//         const {data: {task}} = await insertTaskOne({
//           variables: {
//             title: tempTask.title,
//             is_complete: false,
//             categories_idcategories: usedCategory,
//             email: email,
//             set_date: tempTask.set_date,
//             set_reminder: tempTask.set_reminder,
//           },
//           optimisticResponse: {
//             __typename: 'Mutation',
//             insert_tasks: {
//               __typename: 'tasks_mutation_response',
//               affected_rows: 1,
//               returning: [
//                 {
//                   __typename: 'tasks',
//                   categories_idcategories: usedCategory,
//                   description: 'Optimistic Description',
//                   email: email,
//                   idtask: 'Optimistic UUID',
//                   is_complete: false,
//                   last_modified: new Date().toISOString(),
//                   set_date: tempTask.set_date,
//                   set_reminder: tempTask.set_reminder,
//                   title: tempTask.title,
//                   tasksWithCategory: {
//                     __typename: 'categories',
//                     idcategories: usedCategory,
//                     name: 'Optimistic Category Name',
//                   },
//                 },
//               ],
//             },
//           },
//           update: (cache, {data}) => {
//             try {
//               const existingTasksAfterAdd = cache.readQuery({
//                 query: TASKS,
//                 variables: { email: email },

//               });
//               if (existingTasksAfterAdd) {

//                 cache.writeQuery({
//                   query: TASKS,
//                   variables: { email: email },
//                   data: {
//                     tasks: [...tasks, newTask],
//                   },
//                 });
//               }
//             } catch (err) {
//               console.log('Error updating add task cache: ', err);
//             }
//           }
//           // update: (cache) => {
//           //   const newTask = response.data.insert_tasks.returning;
//           //   if (newTask) {
//           //     cache.readQuery({
//           //       query: TASKS,
//           //       variables: {email: email}
//           //     });
//           //     cache.writeQuery({
//           //       query: TASKS,
//           //       variables: {email: email},
//           //       data: {tasks: [...tasks, newTask]}
//           //     })
//           //   }
//           // }
//         });
//         console.log('Insert Task Result:', response.data.insert_tasks.returning);
//         await refetchTasks();
//         const refetchResult = await refetchTasks();
//         console.log('Refetch Result:', refetchResult);
//         if (refetchResult && refetchResult.data && refetchResult.data.tasks) {
//           console.log('refetchResult: ', refetchResult)
//           console.log('refetchResult.data: ', refetchResult.data)
//           console.log('refetchResult.data.tasks: ', refetchResult.data.tasks)
//           // console.log('Refetched tasks:', tasksList.tasks);
//           // console.log('Refetched tasks -> tasksList:', tasksList);
//           // setTasks(tasksList.tasks);
//           setTasks(refetchResult.data.tasks);
//           // setTasks(tasksList.tasks || []);
//           // console.log('Refetched tasks final:', tasksList.tasks);
//           setTempTask((prevTempTask) => ({
//             ...prevTempTask,
//             idtask: '',
//             title: '',
//             set_date: "",
//             set_reminder: null,
//             email: email,
//             is_complete: false,
//             categories_idcategories: "",
//             tempDeadline: "",
//             tempReminder: "",
//             taskWithCategory: {
//               ...prevTempTask.taskWithCategory,
//               idcategories: "",
//               name: "",
//             },
//           }))
//           setDisplayCategory('+ Kategori')
//           setCurType('');
//           bottomSheetModalRef.current?.close();
//         }
//       }
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   };

//   const handleAddCategorySend = async () => {
//     try {
//       const response = await insertCategoriesOne({
//         variables: {
//           object: {
//             email: email,
//             name: categoryName_input
//           },
//         },
//       });
//       const newCategory = response.data.insert_categories_one;
//       setCategories([...categories, newCategory]);
//       setCategoryName_input('');
//       addCategoryRef.current?.close();
//       // console.log('Task added successfully:', response.data.insert_categories_one);
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   };

//   // UPDATE
//   const [updateTaskStatus] = useMutation(UPDATE_TASKS_STATUS, {
//     // update: (cache, {data: {insert_tasks}}) => {
//     //   refetchTasks();
//     // }
//   });

//   const updateTaskIsComplete = (idtasks: any, tasksStatus: any) => {
//     try {
//       updateTaskStatus({
//         variables: {
//           idtask: idtasks,
//           is_complete: !tasksStatus,
//         },
//         optimisticResponse: {
//           update_tasks_by_pk: {
//             idtask: idtasks,
//             title: 'Optimistic Title',
//             is_complete: !tasksStatus,
//             categories_idcategories: 'Optimistic Category ID',
//             email: 'optimistic@email.com',
//             last_modified: new Date().toISOString(),
//             set_date: '2023-12-13T03:54:00',
//             set_reminder: null,
//             description: 'Optimistic Description',
//             __typename: 'tasks',
//           },
//         },
//         update: (cache) => {
//           try {
//             const existingTasksAfterUpdateStatus = cache.readQuery({
//               query: TASKS,
//               variables: { email: email },
//             });

//             if (existingTasksAfterUpdateStatus) {
//               const updatedTasks = existingTasksAfterUpdateStatus.tasks.map(task => {
//                 if (task.idtask === idtasks) {
//                   return { ...task, is_complete: !tasksStatus };
//                 }
//                 return task;
//               });

//               cache.writeQuery({
//                 query: TASKS,
//                 variables: { email: email },
//                 data: {
//                   tasks: updatedTasks,
//                 },
//               });
//             }
//           } catch (error) {
//             console.error('Error reading or updating cache:', error);
//           }
//         }
//       });
//     } catch (error) {
//       console.error('Failed to update task status:', error);
//     }
//   };

//   const [updateTaskMutation] = useMutation(UPDATE_TASKS);

//   const updateTask = (idtasks: any, tasksTitle: any, tasksCategory: any, tasksDate: any, tasksReminder: any) => {
//     try {
//       updateTaskMutation({
//         variables: {
//           idtask: idtasks,
//           title: tasksTitle,
//           categories_idcategories: tasksCategory,
//           set_date: tasksDate,
//           set_reminder: tasksReminder
//         },
//         optimisticResponse: {
//           update_tasks_by_pk: {
//             idtask: idtasks,
//             title: 'Optimistic Title',
//             is_complete: 'Optimistic Is Complete',
//             categories_idcategories: 'Optimistic Category ID',
//             email: 'optimistic@email.com',
//             last_modified: new Date().toISOString(),
//             set_date: '2023-12-13T03:54:00',
//             set_reminder: '2023-12-13T03:54:00',
//             description: 'Optimistic Description',
//             __typename: 'tasks',
//           },
//         },
//         update: (cache) => {
//           try {
//             const existingTasksAfterUpdate = cache.readQuery({
//               query: TASKS,
//               variables: { email: email },
//             });

//             if (existingTasksAfterUpdate) {
//               const updatedTasks = existingTasksAfterUpdate.tasks.map(task => {
//                 if (task.idtask === idtasks) {
//                   return {
//                     ...task,
//                     title: tasksTitle,
//                     categories_idcategories: tasksCategory,
//                     set_date: tasksDate,
//                     set_reminder: tasksReminder
//                   };
//                 }
//                 return task;
//               });

//               cache.writeQuery({
//                 query: TASKS,
//                 variables: { email: email },
//                 data: {
//                   tasks: updatedTasks,
//                 },
//               });
//             }
//           } catch (error) {
//             console.error('Error reading or updating cache:', error);
//           }
//         }
//       });
//     } catch (error) {
//       console.error('Failed to update task status:', error);
//     }
//   };

//   // DELETE
//   const [deleteTaskMutation] = useMutation(DELETE_TASK);
//   const deleteThisTask = async (idtasks: any) => {
//     try {
//       await deleteTaskMutation({
//         variables: { idtask: idtasks },
//         update: (cache) => {
//           try {
//             const existingTasksAfterDelete = cache.readQuery({
//               query: TASKS,
//               variables: { email: email }
//             });

//             if (existingTasksAfterDelete) {
//               const updatedTasks = existingTasksAfterDelete.tasks.filter(task => (task.idtask !== idtasks));

//               cache.writeQuery({
//                 query: TASKS,
//                 variables: { email: email },
//                 data: {
//                   tasks: updatedTasks,
//                 },
//               });
//             }
//             setTitle('');
//             setDisplayCategory('+ Kategori');
//             setDeadline('');
//             setReminder(null);
//             setTempDeadline('');
//             setTempReminder('');
//             setCurType('');
//             setSelectedCategory('');
//             setTaskToDelete(null);
//             // console.log('Task successfully deleted')
//             modalConfirmDeleteTaskClose();
//           } catch (error) {
//             console.log("Error reading or updating cache: ", error)
//           }
//         }
//       })
//     } catch (error) {
//       console.log("Error to delete task: ", error)
//     }
//   }

//   // Modal
//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);
//   const selectCategoryRef = useRef<BottomSheetModal>(null);
//   const addCategoryRef = useRef<BottomSheetModal>(null);
//   const editTaskRef = useRef<BottomSheetModal>(null);
//   const modalErrorDeadlineRef = useRef<BottomSheetModal>(null);
//   const modalErrorTitleRef = useRef<BottomSheetModal>(null);
//   const confirmDeleteTaskRef = useRef<BottomSheetModal>(null);
//   const snapPoints = useMemo(() => ['18%', '18%'], []);
//   const snapPoints2 = useMemo(() => ['40%', '40%'], []);
//   const snapPoints3 = useMemo(() => ['12%', '12%'], []);
//   const snapPointsEditTaskRef = useMemo(() => ['18%', '18%'], []);
//   const snapPointsWarn = useMemo(() => ['30%', '30%'], []);

//   // Backdrop
//   const renderBackDrop = useCallback(
//     (props: any) => {
//       const { index, animatedIndex } = props;

//       const handleBackdropPress = () => {
//         setDisplayCategory('+ Kategori');
//         setTitle('');
//         setDeadline('');
//         setReminder(null);
//         setTempDeadline('');
//         setTempReminder('');
//         setCurType('');

//         bottomSheetModalRef.current?.dismiss();
//       };

//       return (
//         <BottomSheetBackdrop
//           {...props}
//           appearsOnIndex={0}
//           disappearsOnIndex={-1}
//           onPress={handleBackdropPress}
//         />
//       );
//     },
//     [setDisplayCategory, setTitle]
//   );

//   const renderBackDropSelectCategory = useCallback(
//     (props: any) => {
//       const { index, animatedIndex } = props;

//       const handleBackdropPress = () => {
//         setDisplayCategory('+ Kategori');
//       };

//       return (
//         <BottomSheetBackdrop
//           {...props}
//           appearsOnIndex={0}
//           disappearsOnIndex={-1}
//           onPress={handleBackdropPress}
//         />
//       );
//     },
//     [setDisplayCategory]
//   );

//   const renderBackDropAddCategory = useCallback(
//     (props: any) => {
//       const { index, animatedIndex } = props;

//       const handleBackdropPress = () => {
//         setCategoryName_input('');
//       };

//       return (
//         <BottomSheetBackdrop
//           {...props}
//           appearsOnIndex={0}
//           disappearsOnIndex={-1}
//           onPress={handleBackdropPress}
//         />
//       );
//     },
//     [setCategoryName_input]
//   );

//   const renderBackDropModalWarn = useCallback(
//     (props: any) => {
//       const { index, animatedIndex } = props;

//       return (
//         <BottomSheetBackdrop
//           {...props}
//           appearsOnIndex={0}
//           disappearsOnIndex={-1}
//         />
//       );
//     },
//     []
//   );

//   const handlePresentModalPress = useCallback(() => {
//     bottomSheetModalRef.current?.present();
//   }, []);

//   const modalErrorDeadline = useCallback(() => {
//     modalErrorDeadlineRef.current?.present();
//   }, []);
//   const modalErrorDeadlineClose = useCallback(() => {
//     modalErrorDeadlineRef.current?.close();
//   }, []);

//   const modalErrorTitle = useCallback(() => {
//     modalErrorTitleRef.current?.present();
//   }, []);
//   const modalErrorTitleClose = useCallback(() => {
//     modalErrorTitleRef.current?.close();
//   }, []);

//   const modalConfirmDeleteTask = useCallback((idtask: any, title: any) => {
//     setTaskToDelete({ id: idtask, title: title });
//     confirmDeleteTaskRef.current?.present();
//   }, [])
//   const modalConfirmDeleteTaskClose = useCallback(() => {
//     confirmDeleteTaskRef.current?.close();
//   }, [])


//   // Add Tasks
//   const handleUnPresentModalPress = useCallback(() => {
//     if (tempTask.categories_idcategories === '') {
//       setTempTask((prevTempTask) => ({
//         ...prevTempTask,
//         categories_idcategories: "8d21d870-fe89-47c0-b306-e4b5281c541c",
//       }))
//     }
//     setCurType('');
//     bottomSheetModalRef.current?.close();
//   }, []);

//   // Select Category
//   const onSelectCategory = (selectCategory: { idcategories: number; name: string; }) => {
//     setDisplayCategory(selectCategory.name)
//     setTempTask((prevTempTask) => ({
//       ...prevTempTask,
//       categories_idcategories: String(selectCategory.idcategories),
//       taskWithCategory: {
//         ...prevTempTask.taskWithCategory,
//         idcategories: String(selectCategory.idcategories),
//         name: String(selectCategory.name)
//       },
//     }));
//     selectCategoryRef.current?.dismiss();
//   };

//   const handlePresentDropdownPress = useCallback(() => {
//     Keyboard.dismiss();
//     selectCategoryRef.current?.present();
//   }, []);

//   // Add Category
//   const handleAddCategory = () => {
//     addCategoryRef.current?.present();
//   }

//   // Edit Task
//   const handleModalEditTask = useCallback((idtasks: any, titleTask: any, categoryTask: any, setDateTask: any, setReminderTask: any) => {
//     const changeDateFormat = (dateTimeString: any) => {
//       const date = new Date(dateTimeString);
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       const hours = String(date.getHours()).padStart(2, '0');
//       const minutes = String(date.getMinutes()).padStart(2, '0');

//       const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
//       return formattedDate;
//     }
//     // console.log('type title:', typeof titleTask)
//     // console.log('type category:', typeof categoryTask)
//     // console.log('type deadline:', typeof setDateTask)
//     // console.log('type reminder:', typeof setReminderTask)
//     setTaskId(idtasks);
//     setTitle(titleTask)
//     setDisplayCategory(categoryTask);
//     setDeadline(setDateTask);
//     setReminder(setReminderTask);
//     setTempDeadline(changeDateFormat(setDateTask));
//     setTempDeadline(changeDateFormat(setReminderTask));
//     setCurType('');
//     editTaskRef.current?.present();
//     // console.log('\npertama --> \ntaskId: ', { taskId }, '\ntitle: ', { title }, '\ncategory: ', { defaultCategoriss }, '\ntempDeadline: ', { tempDeadline }, '\ntempReminder: ', { tempReminder }, '\ndeadline: ', { deadline }, '\nreminder: ', { reminder });
//   }, [setTitle, setDisplayCategory, setDeadline, setReminder, setTempDeadline, setTempReminder, setCurType, editTaskRef]);
//   // console.log('\nkedua --> \ntaskId: ', { taskId }, '\ntitle: ', { title }, '\ncategory: ', { defaultCategoriss }, '\ntempDeadline: ', { tempDeadline }, '\ntempReminder: ', { tempReminder }, '\ndeadline: ', { deadline }, '\nreminder: ', { reminder });
//   // console.log(title)


//   const handleEditTask = (idtasks: any, titleTask: any, categoryTask: any, setDateTask: any, setReminderTask: any) => {
//     // setTitleTask(titleTask)
//     // setDisplayCategory(categoryTask);
//     // setDeadline(setDateTask);
//     // setReminder(setReminderTask);
//     // setCurType('');
//     //  setTitle('');
//     //         setDisplayCategory('+ Kategori');
//     //         setDeadline('');
//     //         setReminder(null);
//     //         setTempDeadline('');
//     //         setTempReminder('');
//     //         setCurType('');
//     //         setSelectedCategory('');
//     editTaskRef.current?.close();
//   }

//   // DatePicker
//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleTypeDatepicker = (type: React.SetStateAction<string>) => {
//     setDatePickerVisibility(true);
//     setCurType(type);
//   }

//   const handleConfirm = (date: Date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const hours = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
//     const formattedDate = `${year}-${month}-${day} ${hours}`;
//     const selectedDate = `${year}-${month}-${day}T${hours}`;

//     if (curType === 'deadline') {
//       setTempTask((prevTempTask) => ({
//         ...prevTempTask,
//         tempDeadline: formattedDate,
//         set_date: selectedDate,
//       }));
//       // setTempDeadline(formattedDate);
//       // setDeadline(selectedDate);
//     } else if (curType === 'reminder') {
//       setTempTask((prevTempTask) => ({
//         ...prevTempTask,
//         tempReminder: formattedDate,
//         set_reminder: selectedDate,
//       }));
//       // setTempReminder(formattedDate);
//       // setReminder(selectedDate);
//     }
//     hideDatePicker();
//   };


//   function renderFilterCategories() {
//     const [categories, setCategories] = useState([]);
//     const [isClicked, setIsClicked] = useState(false);
//     const [categoryActiveItem, setCategoryActiveItem] = useState(null);

//     const { loading, error, data: categoryList } = useQuery(CATEGORIES, {
//       variables: { email: email }
//     });

//     useEffect(() => {
//       if (!loading && categoryList && categoryList.categories) {
//         setCategories(categoryList.categories);
//       }
//     }, [categoryList, loading]);

//     const handleItemCategoryClick = (itemId) => {
//       setCategoryActiveItem(itemId === categoryActiveItem ? null : itemId);
//       // console.log(categoryActiveItem);
//     };

//     return (
//       <FlatList
//         data={categories}
//         horizontal
//         keyExtractor={(item) => String(item.idcategories)}
//         showsHorizontalScrollIndicator={false}
//         style={{ gap: 15 }}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => handleItemCategoryClick(item.idcategories)}
//             style={[
//               defaultStyles.btnPrimarySecondaryPill,
//               {
//                 paddingHorizontal: item.name.length > 1 ? 15 : 20,
//                 height: 35,
//                 marginRight: 5,
//                 backgroundColor: categoryActiveItem === item.idcategories ? Colors.primary : Colors.primarySecondary,
//               }
//             ]}
//           >
//             <Text
//               style={[
//                 defaultStyles.textRegular,
//                 {
//                   alignSelf: 'center',
//                   color: categoryActiveItem === item.idcategories ? Colors.white : Colors.dark,
//                 }
//               ]}>
//               {item.name}
//             </Text>
//           </TouchableOpacity>
//         )}
//       />
//     )
//   }

//   const renderListTasks = ({ email, tasks, tasksLoading, refetchTasks }) => {
//     let rowRefs = new Map();
//     // const { loading, error, data: tasksList } = useQuery(TASKS, {
//     //   variables: { email: email },
//     // });

//     // useEffect(() => {
//     //   if (!tasksLoading && tasksList) {
//     //     setTasks(tasksList.tasks);
//     //   }
//     // }, [tasksList, tasksLoading]);

//     if (tasksLoading) {
//       return <LoadingIndicator />;
//     }

//     if (error) {
//       return <ErrorIndicator error={error} />;
//     }

//     if (tasks.length === 0) {
//       return <NoTasksIndicator />;
//     }

//     const rightSwipe = (idtasks: any, titleTask: any, categoryTask: any, setDateTask: any, setReminderTask: any) => {
//       return (
//         <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: 120, height: '100%', borderRadius: 10, justifyContent: 'flex-end', backgroundColor: Colors.primary }]}>
//           <TouchableOpacity onPress={() => handleModalEditTask(idtasks, titleTask, categoryTask, setDateTask, setReminderTask)} style={{ backgroundColor: Colors.primary, width: 60, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
//             <Ionicons name='md-pencil' size={24} color={Colors.white} />
//           </TouchableOpacity>
//           {/* <TouchableOpacity onPress={() => deleteThisTask(idtasks)} style={{ backgroundColor: Colors.danger, width: 60, height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
//             <MaterialCommunityIcons name='delete' size={24} color={Colors.white} />
//           </TouchableOpacity> */}
//           <TouchableOpacity onPress={() => modalConfirmDeleteTask(idtasks, titleTask)} style={{ backgroundColor: Colors.danger, width: 60, height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
//             <MaterialCommunityIcons name='delete' size={24} color={Colors.white} />
//           </TouchableOpacity>
//         </View>
//       );
//     };

//     return (
//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => String(item.idtask)}
//         style={{ gap: 15 }}
//         showsVerticalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <View style={{ backgroundColor: Colors.primary, borderRadius: 10, marginBottom: 10 }}>
//             <Swipeable
//               renderRightActions={() => rightSwipe(item.idtask, item.title, item.categories_idcategories, item.set_date, item.set_reminder)}
//               overshootRight={false}
//               key={item.idtask}
//               ref={ref => {
//                 if (ref && !rowRefs.get(item.idtask)) {
//                   rowRefs.set(item.idtask, ref);
//                 }
//               }}
//               onSwipeableWillOpen={() => {
//                 [...rowRefs.entries()].forEach(([key, ref]) => {
//                   if (key !== item.idtask && ref) ref.close();
//                 });
//               }}
//             >
//               <View style={[defaultStyles.flatList, item.is_complete ? { flex: 1, borderColor: Colors.orange } : { flex: 1, borderColor: Colors.g }]}>
//                 <TouchableOpacity
//                   onPress={() => updateTaskIsComplete(item.idtask, item.is_complete)}
//                   style={[
//                     defaultStyles.checkbox,
//                     item.is_complete ? { backgroundColor: Colors.orange, borderColor: Colors.orange } : null,
//                   ]}
//                 >
//                   {item.is_complete && <Ionicons name="checkmark-outline" size={18} style={{ color: 'white' }} />}
//                 </TouchableOpacity>
//                 <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
//                   <TouchableOpacity style={{ justifyContent: 'space-between', flex: 1 }}>
//                     <Text style={{ textAlignVertical: 'center', textDecorationLine: item.is_complete ? 'line-through' : 'none' }}>
//                       {item.title}
//                     </Text>
//                     <Text style={[defaultStyles.textSm, { textAlignVertical: 'center' }]}>{item.set_date}</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity>
//                     <MaterialIcons name="keyboard-arrow-right" size={30} color="black" style={{ alignSelf: 'center' }} />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </Swipeable>
//           </View>
//         )}
//       />
//     );
//   }

//   const LoadingIndicator = () => (
//     <ActivityIndicator size="large" color={Colors.primary} />
//     // <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Loading...</Text>
//   );

//   const ErrorIndicator = ({ error }) => (
//     <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
//       <Text style={defaultStyles.h1}>Error</Text>
//       <Text style={defaultStyles.textLg}>Error: {error.message}</Text>
//     </View>
//   );

//   const NoTasksIndicator = () => (
//     <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
//       <Image
//         source={require('../../assets/images/icon_revity_text.png')}
//         style={{ resizeMode: 'center', width: 100, alignSelf: 'center', height: 40 }}
//       />
//       <Text style={defaultStyles.h1}>Oops</Text>
//       <Text style={defaultStyles.textLg}>Belum ada tugas nihh</Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={[defaultStyles.containerFluid]}>
//       <StatusBar
//         backgroundColor={Colors.primary}
//       />
//       <View style={{ gap: 13, marginBottom: 13 }}>
//         <View></View>
//         <Header />
//         <View style={{ flexDirection: 'row', width: '100%', backgroundColor: Colors.primarySecondary, paddingVertical: 20, paddingRight: 20, paddingLeft: 5, borderRadius: 15, justifyContent: 'space-between' }}>
//           <HomeDoughnutChart />
//           <CardVisualize />
//         </View>
//         <FilterTask />
//         {renderFilterCategories()}
//       </View>
//       {renderListTasks({ email, tasks, tasksLoading, refetchTasks })}
//       {/* {renderListTasks()} */}
//       <FloatingButton
//         style={defaultStyles.floatinBtnPosition}
//         onPress={handlePresentModalPress}
//       />
//       <BottomSheetModal
//         ref={bottomSheetModalRef}
//         keyboardBehavior="interactive"
//         keyboardBlurBehavior="restore"
//         handleIndicatorStyle={{ display: 'none' }}
//         index={1}
//         snapPoints={snapPoints}
//         backdropComponent={renderBackDrop}
//         enableContentPanningGesture={false}
//       >
//         <View style={[defaultStyles.containerFluid]}>
//           <BottomSheetTextInput
//             placeholder='Masukkan tugas baru di sini'
//             value={tempTask.title}
//             // onChangeText={setTitle}
//             onChangeText={(cur) => setTempTask((prevTempTask) => ({ ...prevTempTask, title: cur }))}
//             style={[defaultStyles.input]}
//           />
//           <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'space-between' }}>
//             <BottomSheetScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', paddingVertical: 20 }}>
//               <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
//                 <TouchableOpacity style={[defaultStyles.inputGroupSm, { paddingHorizontal: 12, gap: 5, borderRadius: 100, borderWidth: 2 }]} onPress={handlePresentDropdownPress}>
//                   <Text>{displayCategory}</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{ flexDirection: 'row', gap: 3 }} onPress={() => handleTypeDatepicker('deadline')}>
//                   <MaterialCommunityIcons name='calendar-clock' size={24} color={Colors.primary} style={[defaultStyles.btnIcon]} />
//                   <Text style={{ alignSelf: 'center' }}>{tempTask.tempDeadline}</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{ flexDirection: 'row', gap: 3 }} onPress={() => handleTypeDatepicker('reminder')}>
//                   <MaterialCommunityIcons name='bell-plus' size={24} color={Colors.primary} style={[defaultStyles.btnIcon]} />
//                   <Text style={{ alignSelf: 'center' }}>{tempTask.tempReminder}</Text>
//                 </TouchableOpacity>
//               </View>
//             </BottomSheetScrollView>
//             <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', borderRadius: 100, backgroundColor: Colors.primary, width: 55, height: 55 }}>
//               <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={handleAddTask} disabled={addingTask}>
//                 <Ionicons name='send' size={18} color={addingTask ? Colors.whiteDisabled : Colors.white} style={[defaultStyles.btnIcon]} />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//         <DateTimePickerModal
//           isVisible={isDatePickerVisible}
//           mode="datetime"
//           onConfirm={handleConfirm}
//           onCancel={hideDatePicker}
//         />
//       </BottomSheetModal>
//       <BottomSheetModal
//         ref={editTaskRef}
//         keyboardBehavior="interactive"
//         keyboardBlurBehavior="restore"
//         handleIndicatorStyle={{ display: 'none' }}
//         index={1}
//         snapPoints={snapPointsEditTaskRef}
//         enableContentPanningGesture={false}
//         backdropComponent={renderBackDrop}
//       >
//         <View style={[defaultStyles.containerFluid]}>
//           <BottomSheetTextInput
//             placeholder={title}
//             value={title}
//             onChangeText={setTitle}
//             style={[defaultStyles.input]}
//           />
//           <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'space-between' }}>
//             <BottomSheetScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', paddingVertical: 20 }}>
//               <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
//                 <TouchableOpacity style={[defaultStyles.inputGroupSm, { paddingHorizontal: 12, gap: 5, borderRadius: 100, borderWidth: 2 }]} onPress={handlePresentDropdownPress}>
//                   <Text>{tempTask.taskWithCategory.name || '+ Kategori'}</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{ flexDirection: 'row', gap: 3 }} onPress={() => handleTypeDatepicker('deadline')}>
//                   <MaterialCommunityIcons name='calendar-clock' size={24} color={Colors.primary} style={[defaultStyles.btnIcon]} />
//                   <Text style={{ alignSelf: 'center' }}>{tempDeadline}</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{ flexDirection: 'row', gap: 3 }} onPress={() => handleTypeDatepicker('reminder')}>
//                   <MaterialCommunityIcons name='bell-plus' size={24} color={Colors.primary} style={[defaultStyles.btnIcon]} />
//                   <Text style={{ alignSelf: 'center' }}>{tempReminder}</Text>
//                 </TouchableOpacity>
//               </View>
//             </BottomSheetScrollView>
//             <View style={{ flexDirection: 'row', gap: 20, alignSelf: 'center', justifyContent: 'center', borderRadius: 100, backgroundColor: Colors.primary, width: 55, height: 55 }}>
//               <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={handleEditTask()}>
//                 <Ionicons name='send' size={18} color={Colors.white} style={[defaultStyles.btnIcon]} />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//         <DateTimePickerModal
//           isVisible={isDatePickerVisible}
//           mode="datetime"
//           onConfirm={handleConfirm}
//           onCancel={hideDatePicker}
//         />
//       </BottomSheetModal>
//       <BottomSheetModal
//         ref={selectCategoryRef}
//         keyboardBehavior="interactive"
//         keyboardBlurBehavior="restore"
//         handleIndicatorStyle={{ display: 'none' }}
//         index={1}
//         snapPoints={snapPoints2}
//         enableContentPanningGesture={false}
//         backdropComponent={renderBackDropSelectCategory}
//       >
//         <View style={[defaultStyles.containerFluid, { gap: 15 }]}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             <Text style={[defaultStyles.h3, { alignSelf: 'center' }]}>Pilih Kategori</Text>
//             <TouchableOpacity style={[defaultStyles.inputGroupSm, { paddingHorizontal: 12 }]} onPress={handleAddCategory}>
//               <Text>Tambah Kategori</Text>
//             </TouchableOpacity>
//           </View>
//           <BottomSheetFlatList
//             data={categories}
//             keyExtractor={(item) => String(item.idcategories)}
//             renderItem={({ item }) => (
//               <TouchableOpacity style={[{ height: 40, flexDirection: 'row', gap: 5 }]} onPress={() => onSelectCategory(item)}>
//                 <View style={{ height: 12, width: 12, backgroundColor: Colors.white, alignSelf: 'center', borderRadius: 100, borderWidth: 1.5, borderColor: Colors.primary }}>
//                 </View>
//                 <Text style={{ alignSelf: 'center' }}>{item.name}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       </BottomSheetModal>
//       <BottomSheetModal
//         ref={addCategoryRef}
//         keyboardBehavior="interactive"
//         keyboardBlurBehavior="restore"
//         handleIndicatorStyle={{ display: 'none' }}
//         index={1}
//         snapPoints={snapPoints3}
//         enableContentPanningGesture={false}
//         backdropComponent={renderBackDropAddCategory}
//       >
//         <BottomSheetView style={defaultStyles.containerFluid}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             <BottomSheetTextInput
//               placeholder='Masukkan nama kategori di sini'
//               style={[defaultStyles.input, { width: '83%' }]}
//               onChangeText={setCategoryName_input}
//               value={categoryName_input}
//             />
//             <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', borderRadius: 100, backgroundColor: Colors.primary, width: 45, height: 45 }}>
//               <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={handleAddCategorySend}>
//                 <Ionicons name='send' size={18} color={Colors.white} style={[defaultStyles.btnIcon]} />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </BottomSheetView>
//       </BottomSheetModal>

//       <BottomSheetModal
//         ref={modalErrorDeadlineRef}
//         keyboardBehavior="interactive"
//         keyboardBlurBehavior="restore"
//         handleIndicatorStyle={{ display: 'none' }}
//         index={1}
//         snapPoints={snapPointsWarn}
//         enableContentPanningGesture={false}
//         style={defaultStyles.sheetContainer}
//         bottomInset={40}
//         detached={true}
//         backdropComponent={renderBackDropModalWarn}
//       >
//         <View style={[defaultStyles.modalContainer, { flex: 1 }]}>
//           <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
//             <Text style={[defaultStyles.h1, { color: Colors.danger }]}>Error</Text>
//             <Image source={require('../../assets/images/icon_revity_text.png')} style={{ resizeMode: 'center', width: 100, alignSelf: 'center', height: 40 }} />
//             <Text style={[defaultStyles.textMdBold, { color: Colors.grey }]}>Deadline kosong</Text>
//           </View>
//           <TouchableOpacity onPress={modalErrorDeadlineClose} style={{ position: 'absolute', right: 10, top: 0 }}>
//             <MaterialIcons name="close" size={24} color="black" style={{ alignSelf: 'flex-start' }} />
//           </TouchableOpacity>
//         </View>
//       </BottomSheetModal>
//       <BottomSheetModal
//         ref={modalErrorTitleRef}
//         keyboardBehavior="interactive"
//         keyboardBlurBehavior="restore"
//         handleIndicatorStyle={{ display: 'none' }}
//         index={1}
//         snapPoints={snapPointsWarn}
//         enableContentPanningGesture={false}
//         style={defaultStyles.sheetContainer}
//         bottomInset={40}
//         detached={true}
//         backdropComponent={renderBackDropModalWarn}
//       >
//         <View style={[defaultStyles.modalContainer, { flex: 1 }]}>
//           <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
//             <Text style={[defaultStyles.h1, { color: Colors.danger }]}>Error</Text>
//             <Image source={require('../../assets/images/icon_revity_text.png')} style={{ resizeMode: 'center', width: 100, alignSelf: 'center', height: 40 }} />
//             <Text style={[defaultStyles.textMdBold, { color: Colors.grey }]}>Nama Tugas Kosong</Text>
//           </View>
//           <TouchableOpacity onPress={modalErrorTitleClose} style={{ position: 'absolute', right: 10, top: 0 }}>
//             <MaterialIcons name="close" size={24} color="black" style={{ alignSelf: 'flex-start' }} />
//           </TouchableOpacity>
//         </View>
//       </BottomSheetModal>
//       <BottomSheetModal
//         ref={confirmDeleteTaskRef}
//         keyboardBehavior="interactive"
//         keyboardBlurBehavior="restore"
//         handleIndicatorStyle={{ display: 'none' }}
//         index={1}
//         snapPoints={snapPointsWarn}
//         enableContentPanningGesture={false}
//         style={[defaultStyles.sheetContainer]}
//         bottomInset={40}
//         detached={true}
//         backdropComponent={renderBackDropModalWarn}
//       >
//         <View style={[defaultStyles.modalContainer, { flex: 1, gap: 20 }]}>
//           <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-end' }}>
//             <Image source={require('../../assets/images/icon_revity_text.png')} style={{ resizeMode: 'center', width: 100, alignSelf: 'center', height: 70 }} />
//             <Text style={[defaultStyles.h3, { textAlign: 'center' }]}>Apa Kamu Yakin</Text>
//             <Text style={[defaultStyles.textRegular, { textAlign: 'center' }]}>Ingin menghapus tugas ini? Penghapusan tugas tidak bisa dibatalkan</Text>
//           </View>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
//             <TouchableOpacity onPress={() => deleteThisTask(taskToDelete.id)} style={[defaultStyles.btnDanger, { flex: 0.4, height: 45 }]}>
//               <Text style={defaultStyles.btnText}>HAPUS</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={modalConfirmDeleteTaskClose} style={[defaultStyles.btnSecondary, { flex: 0.4 }]}>
//               <Text style={defaultStyles.btnText}>KEMBALI</Text>
//             </TouchableOpacity>
//           </View>
//           <TouchableOpacity onPress={modalConfirmDeleteTaskClose} style={{ position: 'absolute', right: 10, top: 0 }}>
//             <MaterialIcons name="close" size={24} color="black" style={{ alignSelf: 'flex-start' }} />
//           </TouchableOpacity>
//         </View>
//       </BottomSheetModal>
//     </SafeAreaView>
//   );
// };
// export default Home;
