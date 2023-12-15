// ListTask.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { defaultStyles } from '../../revity/constants/Style';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../revity/constants/Colors';
import CheckBox from '../../revity/component/checkbox';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const ListTask = ({ }) => {

  console.log(tasks);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const handleCheckBoxToggle = () => {
    setToggleCheckBox(!toggleCheckBox);
  };

  return (
    <FlatList
      keyExtractor={(item) => item.idtasks} // Use the correct syntax for keyExtractor
      data={tasks}
      renderItem={({ item }) => (
        <View key={item.idtasks}>
          <TouchableOpacity style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[defaultStyles.textSm, { fontSize: 16 }]}>
              {item.is_complete ? 'Selesai' : 'Belum Selesai'}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </TouchableOpacity>
          {/* {item.map((task, taskIndex) => ( */}
            <View key={item.idtasks} style={defaultStyles.flatList}>
              <View>
                <TouchableOpacity
                  onPress={handleCheckBoxToggle}
                  style={[
                    defaultStyles.checkbox,
                    toggleCheckBox ? defaultStyles.checked : defaultStyles.unchecked,
                  ]}
                >
                  {toggleCheckBox && (
                    <Ionicons name="checkmark-outline" size={30} style={{ color: 'white' }} />
                  )}
                </TouchableOpacity>
              </View>
              {/* <View style={{ height: 20, width: 20, borderRadius: 100, borderWidth: 1, borderColor: Colors.grey, alignSelf: 'center' }}></View> */}
              <View style={{ backgroundColor: Colors.danger, width: '100%' }}>
                <Text style={defaultStyles.h4}>{item.title}</Text>
                <Text style={defaultStyles.textSm}>{item.deadline}</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
            </View>
          {/* ))} */}
        </View>
      )}
    />
  );
};

export default ListTask;
