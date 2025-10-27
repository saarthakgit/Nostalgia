import { StatusBar, StyleSheet, useColorScheme, View ,Text , ActivityIndicator} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import React , {useState,useEffect} from 'react';
import {setupPlayer,addTrack} from '../musicPlayerServices'

// Screens
import MusicScreen from './screens/MusicScreen';
import HomeScreen from './screens/HomeScreen'
import GetStarted from './screens/GetStarted';
import Onboarding from './screens/Onboarding';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'


export type RootStackParamList = {
  GetStarted : undefined,
  HomeScreen : {username:string , profilePicUri : string},
  Onboarding : undefined,
  MusicScreen : undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function App() {
      const[playerReady , setplayerReady] = useState(false)

      async function setup(){
        let isSetup = await setupPlayer()

        if (isSetup) {
          await addTrack()
        } 

        setplayerReady(isSetup)
      }

      useEffect(() => {
        setup()
      }, [])
      
if(!playerReady){
  return(
    <SafeAreaView style={styles.setupNotReady}>
      <ActivityIndicator/>
    </SafeAreaView>
  )
}
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      {/* <View style={styles.container}>
       <StatusBar barStyle={'light-content'} /> */}
       <Stack.Navigator initialRouteName='GetStarted'>
        <Stack.Screen name = 'GetStarted' options={{headerShown : false}} component={GetStarted}/>
        <Stack.Screen name = 'Onboarding' options={{headerShown : false}} component={Onboarding}/>
        <Stack.Screen name = 'HomeScreen' options={{headerShown : false}} component={HomeScreen}/>
        <Stack.Screen name = 'MusicScreen' options={{headerShown : false}} component={MusicScreen}/>
       
       </Stack.Navigator>
      {/* </View> */}
      </NavigationContainer>
    </SafeAreaProvider> 
  );
}


const styles = StyleSheet.create({
  container : {
    flex : 1,
  },
  setupNotReady : {
    // flex : 1,
    // backgroundColor : '#FFFFFF',
    // alignItems : 'center',
    // justifyContent : 'center'
  }
});

export default App;
