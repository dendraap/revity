import { View, Text, SafeAreaView, Keyboard, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-expo';
import Colors from '../../lib/constants/Colors';
import { defaultStyles } from '../../lib/constants/Style';
import { StatusBar } from 'expo-status-bar';
import Header from '../../lib/component/header';
import Banner from '../../lib/component/banner';
import Today from '../../lib/component/today';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import FloatingButton from '../../lib/component/floatingButton';
import ListTask from '../../lib/component/listTask';
import ModalAddTask from '../../lib/component/modal/modalInputTask'
import ModalSelectCategory from '../../lib/component/modal/modalSelectCategory';
import ModalInputTaskError from '../../lib/component/modal/modalInputTaskError';
import ModalInputCategory from '../../lib/component/modal/modalInputCategory';
import ModalDeleteCategory from '../../lib/component/modal/modalDeleteCategory';

import { useTask, useAddTask, useUpdateTaskStatus, useUpdateTask, useDeleteTask } from '../../lib/graphql/taskHooks';
import { useCategories, useAddCategory, useDeleteCategory, } from '../../lib/graphql/categoryHooks';
import { displayFormatDate } from '../../lib/function/displayFormatDate'

const Home = () => {
  const { user } = useUser();
  const email = user?.emailAddresses[0].emailAddress;
  const [tempTask, setTempTask] = useState({
    idtask: "",
    title: "",
    email: email,
    set_date: "",
    set_reminder: null,
    is_complete: false,
    categories_idcategories: "",
    taskWithCategory: {
      idcategories: "",
      name: "+ Kategori",
    },
    tempDeadline: "",
    tempReminder: "",
    last_modified: new Date().toISOString(),
    description: null,
    displayDate: '',
    errCode: '',
  })
  const [tempCategory, setTempCategory] = useState({
    idcategories: "",
    name: "",
    email: email,
    errCode: '',
    is_category: false,
  })
  const [addOrEditTask, setAddOrEditTask] = useState('')
  const [now, setNow] = useState(new Date().toISOString())
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date().toISOString());
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);


  // TASKS
  const { tasks, loading: fetchingTask, error: errFetchingTask } = useTask(email)
  const { addTask, addingTask } = useAddTask();
  const { updateStatusTask } = useUpdateTaskStatus();
  const { updateTask, updatingTask } = useUpdateTask();
  const { deleteTask, deletingTask } = useDeleteTask();

  // CATEGORIES
  const { categories, loading: fetchingCategories, error: errFetchingCategories } = useCategories(email)
  const { addCategory, addingCategory } = useAddCategory();
  const { deleteCategory, deletingCategory } = useDeleteCategory();

  const modalInputTask = useRef<BottomSheetModal>(null)
  const modalSelectCategory = useRef<BottomSheetModal>(null)
  const modalAddCategory = useRef<BottomSheetModal>(null)
  const modalDeleteCategory = useRef<BottomSheetModal>(null)
  const modalError = useRef<BottomSheetModal>(null)
  const modalInputTaskSnap = useMemo(() => ['19%', '19%'], [])
  const modalSelectCategorySnap = useMemo(() => ['40%', '40%'], [])
  const modalAddCategorySnap = useMemo(() => ['12%', '12%'], [])
  const modalDeleteCategorySnap = useMemo(() => ['35%', '35%'], [])
  const modalErrorSnap = useMemo(() => ['30%', '30%'], [])
  const modalBackDrop = useCallback(
    (props: any) => {
      const { index, animatedIndex } = props

      const backDropPress = () => {
        setTempTask({
          idtask: "", title: "",
          email: email,
          set_date: "",
          set_reminder: null,
          is_complete: false,
          categories_idcategories: "",
          taskWithCategory: {
            idcategories: "",
            name: "+ Kategori",
          },
          tempDeadline: "",
          tempReminder: "",
          last_modified: new Date().toISOString(),
          description: null,
          displayDate: '',
          errCode: '',
        })
        modalInputTask.current?.dismiss();
      }
      return (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          onPress={backDropPress}
        />
      );
    }, [setTempTask]
  )

  const modalSelectCategoryBackDrop = useCallback(
    (props: any) => {
      const { index, animatedIndex } = props
      return (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      );
    }, [setTempTask]
  )

  const modalAddCategoryBackDrop = useCallback(
    (props: any) => {
      const { index, animatedIndex } = props
      const backDropPress = () => {
        setTempCategory({
          idcategories: "",
          name: "",
          email: email,
          errCode: '',
          is_category: false,
        })
        modalAddCategory.current?.dismiss();
      }
      return (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          onPress={backDropPress}
        />
      );
    }, [setTempCategory]
  )

  const modalDeleteCategoryBackDrop = useCallback(
    (props: any) => {
      const { index, animatedIndex } = props

      const backDropPress = () => {
        modalDeleteCategory.current?.dismiss()
      }
      return (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          onPress={backDropPress}
        />
      );
    }, []
  )

  const modalErrorBackDrop = useCallback(
    (props: any) => {
      const { index, animatedIndex } = props
      return (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      );
    }, [setTempTask]
  )

  const presentModalSelectCategoryTask = useCallback(() => {
    modalSelectCategory.current?.present()
  }, [])

  const presentModalAddTask = useCallback(() => {
    setAddOrEditTask('add')
    modalInputTask.current?.present()
  }, [])

  const presentModalInputCategory = useCallback(() => {
    modalAddCategory.current?.present()
  }, [])

  const handleSelectThisTask = (temp: any) => {
    setTempTask((prev: any) => ({
      ...prev,
      categories_idcategories: temp.categories_idcategories,
      taskWithCategory: {
        ...prev.taskWithCategory,
        idcategories: temp.taskWithCategory.categories_idcategories,
        name: temp.taskWithCategory.name,
      },
    }))
    modalSelectCategory.current?.dismiss()
  }

  const handleAddTask = async (tempTask: any, setTempTask: any) => {
    if (tempTask.title.length === 0) {
      Keyboard.dismiss()
      setTempTask((prev: any) => ({
        ...prev, errCode: 'Masukkan nama tugasmu'
      }))
      setTempCategory((prev: any) => ({
        ...prev, is_category: false
      }))
      modalError.current?.present()
    } else if (tempTask.set_date.length === 0) {
      Keyboard.dismiss()
      setTempTask((prev: any) => ({
        ...prev, errCode: 'Pilih tanggal tenggat tugas'
      }))
      setTempCategory((prev: any) => ({
        ...prev, is_category: false
      }))
      modalError.current?.present()
    } else {
      if (tempTask.categories_idcategories.length == 0) {
        tempTask.categories_idcategories = '8d21d870-fe89-47c0-b306-e4b5281c541c'
      }
      const task = await addTask({ tempTask })
      setTempTask({
        idtask: "",
        title: "",
        email: email,
        set_date: "",
        set_reminder: null,
        is_complete: false,
        categories_idcategories: "",
        taskWithCategory: {
          idcategories: "",
          name: "+ Kategori",
        },
        tempDeadline: "",
        tempReminder: "",
        last_modified: new Date().toISOString(),
        description: null,
        displayDate: '',
        errCode: '',
      })
      modalInputTask.current?.dismiss()
    }
  }

  const handleStatusTask = async (idtask: any, email: any, is_complete: any) => {
    const checkTask = await updateStatusTask(idtask, email, is_complete)
  }

  const handleUpdateTask = (idtasks: any, title: any, email: any, set_date: any, set_reminder: any, is_complete: any, categories: any, taskWithCategoryId: any, taskWithCategoryName: any, displayDate: any, modal: any) => {
    setAddOrEditTask('edit')
    setTempTask({
      idtask: idtasks,
      title: title,
      email: email,
      set_date: set_date,
      set_reminder: set_reminder,
      is_complete: is_complete,
      categories_idcategories: categories,
      taskWithCategory: {
        idcategories: taskWithCategoryId,
        name: taskWithCategoryName,
      },
      tempDeadline: displayFormatDate(set_date),
      tempReminder: set_reminder ? displayFormatDate(set_reminder) : '',
      last_modified: new Date().toISOString(),
      description: null,
      displayDate: displayDate,
      errCode: '',
    })
  }

  const handleUpdateThisTask = async (tempTask: any, setTempTask: any) => {
    if (tempTask.title.length === 0) {
      Keyboard.dismiss()
      setTempTask((prev: any) => ({
        ...prev, errCode: 'Nama tugas kosong'
      }))
      modalError.current?.present()
    } else if (tempTask.set_date.length === 0) {
      Keyboard.dismiss()
      setTempTask((prev: any) => ({
        ...prev, errCode: 'Deadline kosong'
      }))
      modalError.current?.present()
    } else {
      const task = await updateTask({ tempTask })
      setTempTask({
        idtask: "",
        title: "",
        email: email,
        set_date: "",
        set_reminder: null,
        is_complete: false,
        categories_idcategories: "",
        taskWithCategory: {
          idcategories: "",
          name: "+ Kategori",
        },
        tempDeadline: "",
        tempReminder: "",
        last_modified: new Date().toISOString(),
        description: null,
        displayDate: '',
        errCode: '',
      })
      modalInputTask.current?.dismiss()
    }
  }

  const handleDeleteTask = async (idtasks: any) => {
    const deleteThisTask = await deleteTask(idtasks, email)
  }

  const handleAddCategory = async (tempCategory: any, setTempCategory: any) => {
    if (tempCategory.name.length === 0) {
      Keyboard.dismiss()
      setTempCategory((prev: any) => ({
        ...prev, errCode: 'Masukkan nama kategorimu', is_category: true
      }))
      modalError.current?.present()
    } else {
      const category = await addCategory({ tempCategory })
      setTempCategory({
        idcategories: "",
        name: "",
        email: email,
        errCode: '',
        is_category: false,
      })
      modalAddCategory.current?.dismiss()
    }
  }

  const handleWantToDeleteCategory = (id: any) => {
    setTempCategory((prev: any) => ({
      ...prev, idcategories: id
    }))
    modalDeleteCategory.current?.present();
  }

  const handleCancelDeleteCategory = () => {
    modalDeleteCategory.current?.dismiss()
  }

  const handleDeleteCategory = async (idcategories: any) => {
    const deleteThisCategory = await deleteCategory(idcategories)
    modalDeleteCategory.current?.dismiss()
    setTempCategory((prev: any) => ({
      ...prev, idcategories: ""
    }))
  }

  const closeModalError = () => {
    modalError.current?.dismiss();
  }

  if (fetchingTask) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }
  if (errFetchingTask) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{errFetchingTask}</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={[defaultStyles.containerFluid]}>
      <StatusBar
        backgroundColor={Colors.primary}
      />
      <View style={[{ marginBottom: 13, gap: 15 }]}>
        <View></View>
        <Header />
        <Banner
          tasks={tasks}
          fetchingTask={fetchingTask}
          fetchingCategories={fetchingCategories}
          now={now}
        />
        <Today now={now} />
      </View>
      <ListTask
        tasks={tasks}
        categories={categories}
        onCheck={handleStatusTask}
        onEdit={handleUpdateTask}
        onDelete={handleDeleteTask}
        modal={modalInputTask}
        fetchingTask={fetchingTask}
        updatingTask={updatingTask}
        deletingTask={deletingTask}
        fetchingCategories={fetchingCategories}
        now={now}
      />
      <ModalAddTask
        modalInputTask={modalInputTask}
        modalInputTaskSnap={modalInputTaskSnap}
        modalBackDrop={modalBackDrop}
        tempTask={tempTask}
        setTempTask={setTempTask}
        handleAddTaskParam={handleAddTask}
        modalSelectCategory={modalSelectCategory}
        presentModalSelectCategoryTask={presentModalSelectCategoryTask}
        addOrEdit={addOrEditTask}
        setAddOrEditTask={setAddOrEditTask}
        handleUpdateThisTask={handleUpdateThisTask}
        addingTask={addingTask}
        updatingTask={updatingTask}
      />
      <ModalSelectCategory
        modalSelectCategory={modalSelectCategory}
        modalSelectCategorySnap={modalSelectCategorySnap}
        modalSelectCategoryBackDrop={modalSelectCategoryBackDrop}
        categories={categories}
        tempTask={tempTask}
        setTempTask={setTempTask}
        onSelectCategory={handleSelectThisTask}
        presentModalInputCategory={presentModalInputCategory}
        onDelete={handleWantToDeleteCategory}
        deletingCategory={deletingCategory}
      />
      <ModalInputTaskError
        modalError={modalError}
        modalErrorSnap={modalErrorSnap}
        modalErrorBackDrop={modalErrorBackDrop}
        tempTask={tempTask}
        setTempTask={setTempTask}
        tempCategory={tempCategory}
        setTempCategory={setTempCategory}
        closeModalError={closeModalError}
      />
      <ModalInputCategory
        modal={modalAddCategory}
        snap={modalAddCategorySnap}
        backdrop={modalAddCategoryBackDrop}
        tempCategory={tempCategory}
        setTempCategory={setTempCategory}
        handleAddCategoryParams={handleAddCategory}
        addingCategory={addingCategory}
      />
      <ModalDeleteCategory
        modal={modalDeleteCategory}
        snap={modalDeleteCategorySnap}
        backdrop={modalDeleteCategoryBackDrop}
        tempCategory={tempCategory}
        onCancel={handleCancelDeleteCategory}
        onDelete={handleDeleteCategory}
        deletingCategory={deletingCategory}
      />
      <FloatingButton style={defaultStyles.floatinBtnPosition} onPress={presentModalAddTask} />
    </SafeAreaView>
  )
}
export default Home;