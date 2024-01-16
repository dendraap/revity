import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet'
import Colors from "../../constants/Colors"
import { defaultStyles } from '../../constants/Style'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const ModalSelectCategory = ({
    modalSelectCategory,
    modalSelectCategorySnap,
    modalSelectCategoryBackDrop,
    categories,
    tempTask,
    setTempTask,
    onSelectCategory,
    presentModalInputCategory,
    onDelete,
    deletingCategory

}: any) => {
    const selectThisCategory = (id: any, name: any) => {
        tempTask.categories_idcategories = id
        tempTask.taskWithCategory.idcategories = id
        tempTask.taskWithCategory.name = name
        onSelectCategory(tempTask)
    }

    const wantToDeleteCategory = (id: any) => {
        onDelete(id)
    }
    return (
        <BottomSheetModal
            ref={modalSelectCategory}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            handleIndicatorStyle={{ display: 'none' }}
            index={1}
            snapPoints={modalSelectCategorySnap}
            enableContentPanningGesture={false}
            backdropComponent={modalSelectCategoryBackDrop}
        >
            <View style={[defaultStyles.containerFluid, { gap: 15 }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[defaultStyles.h3, { alignSelf: 'center' }]}>Pilih Kategori</Text>
                    <TouchableOpacity
                        style={[defaultStyles.inputGroupSm, { paddingHorizontal: 12 }]}
                        onPress={presentModalInputCategory}
                    >
                        <Text>Tambah Kategori</Text>
                    </TouchableOpacity>
                </View>
                <BottomSheetFlatList
                    data={categories}
                    contentContainerStyle={{ gap: 5 }}
                    keyExtractor={(item: any) => String(item.idcategories)}
                    renderItem={({ item }) => (
                        (item.idcategories == '8d21d870-fe89-47c0-b306-e4b5281c541c')
                            ? null
                            : (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <TouchableOpacity
                                        style={[{ height: 40, flexDirection: 'row', gap: 5, flex: 1 }]}
                                        onPress={() => selectThisCategory(item.idcategories, item.name)}
                                    >
                                        <View style={{ height: 12, width: 12, backgroundColor: Colors.white, alignSelf: 'center', borderRadius: 100, borderWidth: 1.5, borderColor: Colors.primary }}>
                                        </View>
                                        <Text style={{ alignSelf: 'center' }}>{item.name}</Text>
                                    </TouchableOpacity>
                                    {
                                        ((item.idcategories == '8d21d870-fe89-47c0-b306-e4b5281c541c') || (item.idcategories == 'e1c79702-2f3c-49c5-af82-0668790e574d') || (item.idcategories == '61598021-b7f6-47f0-947c-464d5f128414') || (item.idcategories == '2d773e88-33db-4bae-b72e-c70395dee76d'))
                                            ? null
                                            : (
                                                <TouchableOpacity
                                                    onPress={() => wantToDeleteCategory(item.idcategories)}
                                                    disabled={deletingCategory}
                                                    style={{ width: 60, alignItems: 'center', justifyContent: 'center' }}>
                                                    <MaterialCommunityIcons name='delete' size={24} color={deletingCategory ? Colors.dangerDisabled : Colors.danger} />
                                                </TouchableOpacity>
                                            )
                                    }

                                </View>
                            )
                    )}
                />
            </View>
        </BottomSheetModal>
    )
}

export default ModalSelectCategory