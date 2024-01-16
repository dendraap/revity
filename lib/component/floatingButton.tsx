import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Text, Animated, Easing } from 'react-native';
import Colors from '../constants/Colors';
import { defaultStyles } from '../constants/Style'

const FloatingButton = (props: any) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.delay(3000)
    ]).start(() => startAnimation());
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Animated.View
        style={[
          defaultStyles.floatingBtnStyle,
          { alignItems: 'center', justifyContent: 'center', transform: [{ scale: scaleValue }] },
        ]}
      >
        <Text style={{ fontSize: 35, color: Colors.primary }}>+</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default FloatingButton;
