import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { displayHari, displayFormatDateString } from '../function/displayFormatDate'
import { defaultStyles } from '../constants/Style'
import Colors from '../constants/Colors'

const Today = ({now}: any) => {
    const [today, setToday] = useState('')

    useEffect(() => {
        setToday(displayFormatDateString(now))
    }, [now])
    return (
        <View>
            <Text style={[defaultStyles.textXlBold, { color: Colors.dark }]}>
                Hari ini
            </Text>
            <Text style={[defaultStyles.textMd, { color: Colors.grey }]}>
                {today}
            </Text>
        </View>
    )
}

export default Today