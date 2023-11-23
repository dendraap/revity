import React from 'react';
import { Stack } from 'expo-router';
import Colors from '../../constants/Colors'

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
        headerBackTitle: 'Back',
        headerTitleStyle: {
          fontFamily: 'Poppins-Regular',
        },
      }}>
      <Stack.Screen
        name="login"
        options={{
          headerTitle: 'Revity - Remember Your Activity',
          headerShown: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          headerTitle: 'Buat Akun',
          headerShown: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="reset"
        options={{
          headerTitle: 'Reset Password',
        }}></Stack.Screen>
    </Stack>
  );
};

export default PublicLayout;