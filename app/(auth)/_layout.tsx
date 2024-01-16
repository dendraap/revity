import { Stack, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import Colors from '../../lib/constants/Colors'

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Poppins-Regular',
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: 'Beranda',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          tabBarLabel: 'Beranda',
          headerShown: false,
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          tabBarLabel: 'Profile',
        }}
        redirect={!isSignedIn}
      />
    </Stack>
  );
};

export default TabsPage;