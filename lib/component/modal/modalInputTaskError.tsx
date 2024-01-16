import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { defaultStyles } from '../../constants/Style'
import Colors from '../../constants/Colors';

const ModalInputTaskError = ({ modalError, modalErrorSnap, modalErrorBackDrop, tempTask, setTempTask, tempCategory, setTempCategory, closeModalError }: any) => {
    return (
        <BottomSheetModal
            ref={modalError}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            handleIndicatorStyle={{ display: 'none' }}
            index={1}
            snapPoints={modalErrorSnap}
            enableContentPanningGesture={false}
            style={defaultStyles.sheetContainer}
            bottomInset={40}
            detached={true}
            backdropComponent={modalErrorBackDrop}
        >
            <View style={[defaultStyles.modalContainer, { flex: 1 }]}>
                <View style={{  width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <Image source={require('../../../assets/images/error2.png')} style={{ resizeMode: 'center',  height: '70%' }} />
                    <Text style={[defaultStyles.textLgBold, { color: Colors.dark }]}>Oops, terjadi kesalahan</Text>
                    <Text style={[defaultStyles.textRegular, { color: Colors.grey }]}>{tempCategory.is_category ? tempCategory.errCode : tempTask.errCode}</Text>
                </View>
                <TouchableOpacity
                    onPress={closeModalError}
                    style={{ position: 'absolute', right: 10, top: 0 }}>
                    <MaterialIcons name="close" size={24} color="black" style={{ alignSelf: 'flex-start' }} />
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    )
}

export default ModalInputTaskError