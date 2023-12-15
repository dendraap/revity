import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../revity/constants/Colors'
import { defaultStyles } from '../../revity/constants/Style'

const CardVisualize = () => {
    return (
        <View style={{ flexDirection: 'column', gap: 7, width: '40%' }}>
            <View style={{ flex: 1, backgroundColor: Colors.primary, flexDirection: 'row', borderRadius: 7, paddingHorizontal: 5, paddingVertical: 10, gap: 4 }}>
                <Image source={require('../../revity/assets/images/totalJadwal.png')} style={{ resizeMode: 'contain', width: 30, alignSelf: 'center' }} />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={[defaultStyles.textRegular, { color: Colors.white }]}>Total Jadwal</Text>
                    <Text style={[defaultStyles.textRegularBold, { color: Colors.white }]}>208</Text>
                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: Colors.success, flexDirection: 'row', borderRadius: 7, paddingHorizontal: 5, paddingVertical: 10, gap: 4 }}>
                <Image source={require('../../revity/assets/images/jadwalSelesai.png')} style={{ resizeMode: 'contain', width: 30, alignSelf: 'center' }} />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={[defaultStyles.textRegular, { color: Colors.white }]}>Total Jadwal</Text>
                    <Text style={[defaultStyles.textRegularBold, { color: Colors.white }]}>208</Text>
                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: Colors.orange, flexDirection: 'row', borderRadius: 7, paddingHorizontal: 5, paddingVertical: 10, gap: 4 }}>
                <Image source={require('../../revity/assets/images/jadwalPending.png')} style={{ resizeMode: 'contain', width: 30, alignSelf: 'center' }} />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={[defaultStyles.textRegular, { color: Colors.white }]}>Total Jadwal</Text>
                    <Text style={[defaultStyles.textRegularBold, { color: Colors.white }]}>208</Text>
                </View>
            </View>
        </View>
    )
}

export default CardVisualize