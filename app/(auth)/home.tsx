import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../constants/Colors';
import { defaultStyles } from '../../constants/Style';
import { StatusBar } from 'expo-status-bar';
import  Header from '../../component/header';
import CardVisualize from '../../component/cardVisualize';
import HomeDoughnutChart from '../../component/doughnatchart'

const Home = () => {
  const { user } = useUser();

  return (
    <ScrollView>
      <SafeAreaView style={[defaultStyles.containerFluid, { justifyContent: 'center', backgroundColor: Colors.white }]}>
        <StatusBar
          backgroundColor={Colors.primary}
        />
        <View style={{ flex: 0.015 }}></View>
        <Header />
				<CardVisualize />
				<HomeDoughnutChart />

        <Text>HomePage</Text>
        <Text>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>

      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;