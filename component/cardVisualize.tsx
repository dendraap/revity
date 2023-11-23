import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../revity/constants/Colors'
import { defaultStyles } from '../../revity/constants/Style'

const CardVisualize = () => {
    return (
        <View style={{ flexDirection: 'row', gap: 7 }}>
            <View style={{ flex: 1, backgroundColor: Colors.primary, flexDirection: 'row', borderRadius: 7, paddingHorizontal: 5, paddingVertical: 10, gap: 4 }}>
                <Image source={require('../../revity/assets/images/totalJadwal.png')} style={{ resizeMode: 'contain', width: 30 }} />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={[defaultStyles.textSm, { color: Colors.white }]}>Total Jadwal</Text>
                    <Text style={[defaultStyles.textSmBold, { color: Colors.white }]}>208</Text>
                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: Colors.success, flexDirection: 'row', borderRadius: 7, paddingHorizontal: 5, paddingVertical: 10, gap: 4 }}>
                <Image source={require('../../revity/assets/images/jadwalSelesai.png')} style={{ resizeMode: 'contain', width: 30 }} />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={[defaultStyles.textSm, { color: Colors.white }]}>Total Jadwal</Text>
                    <Text style={[defaultStyles.textSmBold, { color: Colors.white }]}>208</Text>
                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: Colors.orange, flexDirection: 'row', borderRadius: 7, paddingHorizontal: 5, paddingVertical: 10, gap: 4 }}>
                <Image source={require('../../revity/assets/images/jadwalPending.png')} style={{ resizeMode: 'contain', width: 30 }} />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={[defaultStyles.textSm, { color: Colors.white }]}>Total Jadwal</Text>
                    <Text style={[defaultStyles.textSmBold, { color: Colors.white }]}>208</Text>
                </View>
            </View>
        </View>
    )
}

export default CardVisualize