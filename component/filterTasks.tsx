import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../revity/constants/Colors';
import { defaultStyles } from '../../revity/constants/Style';
import { MaterialIcons } from '@expo/vector-icons';

const FilterTask = () => {
    return (
        <View style={[defaultStyles.separatorView, { justifyContent: 'space-between' }]}>
            <View>
                <Text style={[defaultStyles.textSmBold, { fontSize: 25, color: Colors.dark }]}>
                    Tugas hari ini
                </Text>
                <Text style={[defaultStyles.textSm, { fontSize: 15, color: Colors.secondary }]}>
                    Senin, 23 Agustus
                </Text>
            </View>
            <View>
                {/* <TouchableOpacity style={[defaultStyles.dropdownSelector, { justifyContent: 'space-between', paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={[defaultStyles.textSm, { fontSize: 16 }]}>Filter</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

export default FilterTask