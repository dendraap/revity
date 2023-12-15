import React, {useRef} from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Animated} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const Checkbox = ({
//   text,
  onPress,
  isChecked,
//   containerStyle,
//   textStyle,
//   checkboxStyle,
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    const toValue = isChecked ? 0 : 30;
    Animated.timing(animatedWidth, {
      toValue: toValue,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={() => {
          startAnimation();
          onPress();
        }}
        style={[
          styles.checkbox,
          isChecked,
        ]}
    >
        <Animated.View style={{width: animatedWidth}}>
          <Ionicons name="checkmark-outline" size={30} style={{color: Colors.primary}} />
        </Animated.View>
      </TouchableOpacity>
      <Text style={[styles.checkboxText]}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 100,
    height: 30,
    width: 30,
  },
  checkboxSelected: {
    // backgroundColor: 'green',
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Checkbox;