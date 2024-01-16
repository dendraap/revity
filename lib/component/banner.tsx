import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../constants/Colors';
import { defaultStyles } from '../constants/Style'
import { PieChart } from 'react-native-gifted-charts';

const Banner = ({ tasks, fetchingTask, fetchingCategories, now }: any) => {
    const [taskInformation, setTaskInformation] = useState({
        total: 0,
        complete: 0,
        pending: 0,
        telat: 0,
    })

    const [pieData, setPieData] = useState([
        {
            value: 1,
            color: Colors.orange,
            text: '0%'
        },
        {
            value: 1,
            color: Colors.primary,
            text: '0%'
        },
        {
            value: 1,
            color: Colors.success,
            text: '0%'
        },
    ]);

    const persenChart = (pembilang: any, penyebut: any) => {
        const persen = Math.round((pembilang / penyebut) * 100)
        return persen === 0 || Number.isNaN(persen)
            ? ''
            : `${persen}%`
    }

    useEffect(() => {
        if (!fetchingTask && !fetchingCategories) {
            setTaskInformation((prev: any) => ({
                ...prev,
                total: tasks.length,
                complete: (tasks.filter((task: any) => task.is_complete).length),
                pending: (tasks.filter((task: any) => !task.is_complete && task.set_date > now).length),
                telat: (tasks.filter((task: any) => !task.is_complete && task.set_date < now).length)
            }))
            setPieData([
                {
                    value: taskInformation.telat === 0 ? 0.0001 : taskInformation.telat,
                    color: Colors.orange,
                    text: persenChart(taskInformation.telat, taskInformation.total)
                },
                {
                    value: taskInformation.pending === 0 ? 0.0001 : taskInformation.pending,
                    color: Colors.primary,
                    text: persenChart(taskInformation.pending, taskInformation.total)
                },
                {
                    value: taskInformation.complete === 0 ? 0.0001 : taskInformation.complete,
                    color: Colors.success,
                    text: persenChart(taskInformation.complete, taskInformation.total)
                },
            ])
        }
    }, [tasks, fetchingTask, fetchingCategories, now])

    return (
        <View style={{ flexDirection: 'row', width: '100%', backgroundColor: Colors.primarySecondary, paddingVertical: 20, paddingRight: 20, paddingLeft: 5, borderRadius: 15, justifyContent: 'space-between' }}>
            {
                !fetchingTask && !fetchingCategories
                    ? <>
                        <PieChart
                            donut
                            innerRadius={30}
                            radius={65}
                            showText
                            focusOnPress
                            toggleFocusOnPress
                            textColor="white"
                            textSize={14}
                            labelsPosition='outward'
                            data={pieData}
                        />
                        <View style={{ flexDirection: 'column', gap: 7, width: '40%' }}>
                            <View style={{ flex: 1, backgroundColor: Colors.success, flexDirection: 'row', borderRadius: 7, paddingHorizontal: 5, paddingVertical: 10, gap: 4 }}>
                                <Image source={require('../../assets/images/jadwalSelesai.png')} style={{ resizeMode: 'contain', width: 30, alignSelf: 'center' }} />
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={[defaultStyles.textRegular, { color: Colors.white }]}>Sudah selesai</Text>
                                    <Text style={[defaultStyles.textRegularBold, { color: Colors.white }]}>{taskInformation.complete}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, backgroundColor: Colors.primary, flexDirection: 'row', borderRadius: 7, paddingHorizontal: 5, paddingVertical: 10, gap: 4 }}>
                                <Image source={require('../../assets/images/jadwalPending.png')} style={{ resizeMode: 'contain', width: 30, alignSelf: 'center' }} />
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={[defaultStyles.textRegular, { color: Colors.white }]}>Belum Selesai</Text>
                                    <Text style={[defaultStyles.textRegularBold, { color: Colors.white }]}>{taskInformation.pending}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, backgroundColor: Colors.orange, flexDirection: 'row', borderRadius: 7, paddingHorizontal: 5, paddingVertical: 10, gap: 4 }}>
                                <Image source={require('../../assets/images/jadwalTotal.png')} style={{ resizeMode: 'contain', width: 30, height: 30, alignSelf: 'center' }} />
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={[defaultStyles.textRegular, { color: Colors.white }]}>Telat</Text>
                                    <Text style={[defaultStyles.textRegularBold, { color: Colors.white }]}>{taskInformation.telat}</Text>
                                </View>
                            </View>
                        </View>
                    </>

                    : null
            }

        </View>
    )
}

export default Banner