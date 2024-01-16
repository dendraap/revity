import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { BottomSheetModal, BottomSheetView, BottomSheetTextInput } from '@gorhom/bottom-sheet'
import Colors from "../../constants/Colors"
import { defaultStyles } from '../../constants/Style'

const ModalInputCategory = ({
    modal,
    snap,
    backdrop,
    tempCategory,
    setTempCategory,
    handleAddCategoryParams,
    addingCategory
}: any) => {
    const handleInputChange = (text: any) => {
        const isValidInput = !text.startsWith(' ');
        if (isValidInput) {
            setTempCategory((prev: any) => ({ ...prev, name: text }))
        }
    };

    const titleValidationLive = () => {
        if (tempCategory.name.length == 0) {
            return (
                <Text style={[defaultStyles.textRegular, { color: Colors.danger }]}>*Masukkan nama kategori</Text>
            )
        } else if (tempCategory.name.length == 30) {
            return (
                <Text style={[defaultStyles.textRegular, { color: Colors.secondary }]}>*Tidak bisa melebihi 30 karakter</Text>
            )
        } else {
            return (
                <Text style={[defaultStyles.textRegular, { color: Colors.white }]}>*</Text>
            )
        }
    }

    const addNewCategory = () => {
        handleAddCategoryParams(tempCategory, setTempCategory)
    }

    return (
        <BottomSheetModal
            ref={modal}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            handleIndicatorStyle={{ display: 'none' }}
            index={1}
            snapPoints={snap}
            enableContentPanningGesture={false}
            backdropComponent={backdrop}
        >
            <BottomSheetView style={defaultStyles.containerFluid}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <BottomSheetTextInput
                        placeholder='Masukkan nama kategori di sini'
                        style={[defaultStyles.input, { width: '83%' }]}
                        onChangeText={handleInputChange}
                        value={tempCategory.name}
                        maxLength={30}
                    />
                    <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', borderRadius: 100, backgroundColor: Colors.primary, width: 45, height: 45 }}>
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={addNewCategory}
                            disabled={addingCategory}
                        >
                            {
                                addingCategory
                                    ? <ActivityIndicator size="large" color="#ffffff" />
                                    : <Ionicons name='send' size={18} color={Colors.white} style={[defaultStyles.btnIcon]} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginBottom: 0, marginLeft: 5 }}>{titleValidationLive()}</View>
            </BottomSheetView>
        </BottomSheetModal>

    )
}

export default ModalInputCategory