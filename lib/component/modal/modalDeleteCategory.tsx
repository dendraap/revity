import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { BottomSheetModal, BottomSheetView, BottomSheetTextInput } from '@gorhom/bottom-sheet'
import Colors from "../../constants/Colors"
import { defaultStyles } from '../../constants/Style'

const ModalDeleteCategory = ({
    modal,
    snap,
    backdrop,
    tempCategory,
    onCancel,
    onDelete,
    deletingCategory
}: any) => {
    return (
        <BottomSheetModal
            ref={modal}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            handleIndicatorStyle={{ display: 'none' }}
            index={1}
            snapPoints={snap}
            enableContentPanningGesture={false}
            style={[defaultStyles.sheetContainer]}
            bottomInset={40}
            detached={true}
            backdropComponent={backdrop}
        >
            <View style={[defaultStyles.modalContainer, { flex: 1, gap: 15 }]}>
                <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Image source={require('../../../assets/images/delete.png')} style={{ resizeMode: 'center', height: '65%', alignSelf: 'center'}} />
                    <Text style={[defaultStyles.textLgBold, { textAlign: 'center' }]}>Hapus tugas</Text>
                    <Text style={[defaultStyles.textRegular, { textAlign: 'center' }]}>Tindakan ini akan menghapus semua tugas pada kategori tersebut</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <TouchableOpacity
                        style={[defaultStyles.btnDanger, { flex: 0.4, height: 43 }]}
                        onPress={() => onDelete(tempCategory.idcategories)}
                    >
                        {
                            deletingCategory
                                ? <ActivityIndicator size="small" color="#ffffff" />
                                : <Text style={defaultStyles.btnText}>HAPUS</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[defaultStyles.btnDangerOutline, { flex: 0.4, height: 43 }]}
                        onPress={onCancel}
                    >
                        <Text style={[defaultStyles.btnText, {color: Colors.danger}]}>KEMBALI</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{ position: 'absolute', right: 10, top: 0 }}
                    onPress={onCancel}
                >
                    <MaterialIcons name="close" size={24} color="black" style={{ alignSelf: 'flex-start' }} />
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    )
}

export default ModalDeleteCategory