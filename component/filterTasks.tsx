import { View, Text, TouchableOpacity, Modal, Button, FlatList, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Colors from '../../revity/constants/Colors'
import { defaultStyles } from '../../revity/constants/Style';
import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput, BottomSheetModal, BottomSheetView, BottomSheetFlatList, BottomSheetScrollView } from '@gorhom/bottom-sheet';


const FilterTask = () => {
    const [isClicked, setIsClicked] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryActiveItem, setCategoryActiveItem] = useState(null);
    const [timeActiveItem, setTimeActiveItem] = useState(null);

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const monthName = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(today);
    const dayName = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(today);
    const currentDate = `${dayName}, ${date} ${monthName} ${year}`;

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ["43%", "43%"], []);
    const renderBackDrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />,
        []
    );

    const handleFilterPress = useCallback(() => {
        setIsClicked(!isClicked);
        bottomSheetModalRef.current?.present();
    }, []);

    const handleFilterPressClose = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const handleItemCategoryClick = (itemId) => {
        setCategoryActiveItem(itemId === categoryActiveItem ? null : itemId);
    };
    const handleItemTimeClick = (itemId) => {
        setTimeActiveItem(itemId === timeActiveItem ? null : itemId);
    };
    const [statusTask, setStatusTask] = useState([
        { id: 1, name: 'Sudah Selesai' },
        { id: 2, name: 'Belum Selesai' },
    ])
    const [time, setTime] = useState([
        { id: 1, timeName: 'Minggu ini' },
        { id: 2, timeName: 'Bulan ini' },
        { id: 3, timeName: 'Hari ini' },
        { id: 4, timeName: 'Semua' },
    ])
    // const [fixCategory, setFixCategory] = useState(category);
    const [fixTime, setFixTime] = useState(time);


    return (
        <View>
            <View style={[defaultStyles.separatorView, { justifyContent: 'space-between' }]}>
                <View>
                    <Text style={[defaultStyles.textXlBold, { color: Colors.dark }]}>
                        Tugas hari ini
                    </Text>
                    <Text style={[defaultStyles.textMd, { color: Colors.grey }]}>
                        {currentDate}
                    </Text>
                </View>
                <TouchableOpacity style={[defaultStyles.dropdownSelector, { justifyContent: 'space-between', paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' },
                ]} onPress={handleFilterPress}>
                    <Text style={[defaultStyles.textMd]}>Filter</Text>
                    {isClicked ? (
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" style={{ alignSelf: 'center' }} />
                    ) : (
                        <MaterialIcons name="keyboard-arrow-up" size={24} color="black" style={{ alignSelf: 'center' }} />
                    )}
                </TouchableOpacity>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    keyboardBehavior="interactive"
                    keyboardBlurBehavior="restore"
                    handleIndicatorStyle={{ display: 'none' }}
                    index={0}
                    bottomInset={40}
                    detached={true}
                    snapPoints={snapPoints}
                    style={defaultStyles.sheetContainer}
                    backdropComponent={renderBackDrop}
                >
                    <BottomSheetView style={[defaultStyles.modalContainer]}>
                        <View style={{ gap: 10 }}>
                            <Text style={[defaultStyles.h2]}>Filter</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            </View>
                            <View>
                                <Text style={[defaultStyles.textMdBold]}>
                                    Status Tugas
                                </Text>
                                <ScrollView showsHorizontalScrollIndicator={false}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', maxWidth: '100%' }}>
                                        {statusTask.map((item) => (
                                            <TouchableOpacity
                                                key={item.id}
                                                style={[defaultStyles.flatlistCategory, { backgroundColor: categoryActiveItem === item.id ? Colors.primary : Colors.white, borderColor: categoryActiveItem === item.id ? Colors.primary : Colors.grey }]}
                                                onPress={() => handleItemCategoryClick(item.id)}
                                            >
                                                <Text style={[defaultStyles.textRegular, { color: categoryActiveItem === item.id ? Colors.white : Colors.grey }]}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>
                            <View>
                                <Text style={[defaultStyles.textMdBold]}>
                                    Waktu
                                </Text>
                                <View>
                                    <ScrollView showsHorizontalScrollIndicator={false}>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', maxWidth: '100%' }}>
                                            {time.map((item) => (
                                                <TouchableOpacity
                                                    key={item.id}
                                                    style={[defaultStyles.flatlistCategory, { backgroundColor: timeActiveItem === item.id ? Colors.primary : Colors.white, borderColor: timeActiveItem === item.id ? Colors.primary : Colors.grey }]}
                                                    onPress={() => handleItemTimeClick(item.id)}
                                                >
                                                    <Text style={[defaultStyles.textRegular, { color: timeActiveItem === item.id ? Colors.white : Colors.grey }]}>{item.timeName}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={[defaultStyles.btnPrimary]} onPress={handleFilterPressClose}>
                            <Text style={[defaultStyles.btnText, defaultStyles.textMdBold]}>
                                Selesai
                            </Text>
                        </TouchableOpacity>
                    </BottomSheetView>
                    <TouchableOpacity style={{ position: 'absolute', top: 0, right: 10 }} onPress={handleFilterPressClose}>
                        <MaterialIcons name="close" size={24} color="black" style={{ alignSelf: 'flex-start' }} />
                    </TouchableOpacity>
                </BottomSheetModal>
            </View>
        </View>
    )
}
export default FilterTask