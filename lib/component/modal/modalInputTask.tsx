import { BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput } from "@gorhom/bottom-sheet"
import { Touchable, View, Text, ActivityIndicator } from "react-native"
import { defaultStyles } from "../../constants/Style"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import Colors from "../../constants/Colors"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react"
import { displayFormatDateString } from "../../function/displayFormatDate"

const ModalAddTask = ({
  modalInputTask,
  modalInputTaskSnap,
  modalBackDrop,
  tempTask,
  setTempTask,
  handleAddTaskParam,
  modalSelectCategory,
  presentModalSelectCategoryTask,
  addOrEdit,
  setAddOrEditTask,
  handleUpdateThisTask,
  addingTask,
  updatingTask,
}: any) => {
  const [handleSelectDate, setHandleSelectDate] = useState({
    visible: false,
    type: '',
    errCode: '',
  })

  const addNewTask = () => {
    handleAddTaskParam(tempTask, setTempTask)
  }
  const editTask = () => {
    handleUpdateThisTask(tempTask, setTempTask)
  }

  const handleDeadlineAndReminder = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const formattedDate = `${year}-${month}-${day} ${hours}`;
    const selectedDate = `${year}-${month}-${day}T${hours}`;

    if (handleSelectDate.type === 'deadline') {
      setTempTask((prev: any) => ({
        ...prev, tempDeadline: formattedDate, set_date: selectedDate, displayDate: displayFormatDateString(selectedDate)
      }))
    } else if (handleSelectDate.type === 'reminder') {
      setTempTask((prev: any) => ({
        ...prev, tempReminder: formattedDate, set_reminder: selectedDate
      }))
    }
    hideDatePicker();
  }

  const hideDatePicker = () => {
    setHandleSelectDate((prev: any) => ({
      ...prev, visible: false
    }))
  }

  const handleTypeDatepicker = (dateType: any) => {
    setHandleSelectDate((prev: any) => ({
      ...prev, visible: true
    }))

    if (dateType === 'deadline') {
      return setHandleSelectDate((prev: any) => ({
        ...prev, type: 'deadline'
      }))
    } else if (dateType === 'reminder') {
      return setHandleSelectDate((prev: any) => ({
        ...prev, type: 'reminder'
      }))
    }
  }

  const titleValidationLive = () => {
    if (tempTask.title.length == 0) {
      return (
        <Text style={[defaultStyles.textRegular, { color: Colors.danger }]}>*Masukkan nama tugas</Text>
      )
    } else if (tempTask.title.length == 30) {
      return (
        <Text style={[defaultStyles.textRegular, { color: Colors.secondary }]}>*Tidak bisa melebihi 30 karakter</Text>
      )
    } else {
      return (
        <Text style={[defaultStyles.textRegular, { color: Colors.white }]}>*</Text>
      )
    }
  }

  const handleInputChange = (text: any) => {
    const isValidInput = !text.startsWith(' ');
    if (isValidInput) {
      setTempTask((prevTempTask: any) => ({ ...prevTempTask, title: text }))
    }
  };

  return (
    <BottomSheetModal
      ref={modalInputTask}
      keyboardBehavior='interactive'
      keyboardBlurBehavior="restore"
      handleIndicatorStyle={{ display: 'none' }}
      index={1}
      snapPoints={modalInputTaskSnap}
      backdropComponent={modalBackDrop}
      enableContentPanningGesture={false}
    >
      <View style={[defaultStyles.containerFluid]}>
        <BottomSheetTextInput
          placeholder='Masukkan tugas baru disini'
          value={tempTask.title}
          maxLength={30}
          onChangeText={handleInputChange}
          style={[defaultStyles.input]}
        />
        <View style={{ marginBottom: 0, marginLeft: 5 }}>{titleValidationLive()}</View>
        <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'space-between' }}>
          <BottomSheetScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', paddingVertical: 2 }}>
            <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
              <TouchableOpacity
                style={[defaultStyles.inputGroupSm, { paddingHorizontal: 12, gap: 5, borderRadius: 100, borderWidth: 2 }]}
                onPress={presentModalSelectCategoryTask}
              >
                {
                  tempTask.taskWithCategory.name == 'Semua'
                  ? <Text>Tidak terkategori</Text>

                  : <Text>{tempTask.taskWithCategory.name}</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', gap: 3 }}
                onPress={() => handleTypeDatepicker('deadline')}
              >
                <MaterialCommunityIcons name='calendar-clock' size={24} color={Colors.primary} style={[defaultStyles.btnIcon]} />
                <View
                  style={
                    tempTask.tempDeadline == '' ? { height: 'auto' } : [defaultStyles.btnPrimarySecondaryPill, { height: 'auto', paddingHorizontal: 10 }]
                  }
                >
                  {(tempTask.set_date.length == 0) ? <Text style={{ textAlignVertical: 'center', left: -3, color: Colors.danger }}>*</Text> : <Text style={{ alignSelf: 'center' }}>{tempTask.tempDeadline}</Text>}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', gap: 3 }}
                onPress={() => handleTypeDatepicker('reminder')}
              >
                <MaterialCommunityIcons name='bell-plus' size={24} color={Colors.primary} style={[defaultStyles.btnIcon]} />
                <View style={
                  tempTask.tempReminder == '' ? { height: 'auto' } : [defaultStyles.btnPrimarySecondaryPill, { height: 'auto', paddingHorizontal: 10 }]
                }>
                  <Text style={{ alignSelf: 'center' }}>{tempTask.tempReminder}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </BottomSheetScrollView>
          <View
            style={{
              flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 100,
              backgroundColor: Colors.primary, width: 55, height: 55
            }}
          >
            <TouchableOpacity
              style={{ alignItems: 'center', justifyContent: 'center' }}
              onPress={
                addOrEdit === 'add'
                  ? addNewTask
                  : editTask
              }
              disabled={addOrEdit === 'add' ? addingTask : updatingTask}
            >
              {
                 addOrEdit === 'add'
                 ? addingTask
                   ? <ActivityIndicator size="large" color="#ffffff"/>
                   : <Ionicons name='send' size={18} color={Colors.white}  style={[defaultStyles.btnIcon]}/>
                 : updatingTask
                   ? <ActivityIndicator size="large" color="#ffffff"/>
                   : <Ionicons name='send' size={18} color={Colors.white}  style={[defaultStyles.btnIcon]}/>
              }
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={handleSelectDate.visible}
        mode="datetime"
        onConfirm={handleDeadlineAndReminder}
        onCancel={hideDatePicker}
      />
    </BottomSheetModal>
  )
}

export default ModalAddTask