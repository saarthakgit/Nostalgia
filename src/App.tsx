import { StatusBar, StyleSheet, useColorScheme, View ,Text , ActivityIndicator} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import React , {useState,useEffect} from 'react';
import {setupPlayer,addTrack} from '../musicPlayerServices'
import MusicScreen from './screens/MusicScreen';

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
      <View style={styles.container}>
       <StatusBar barStyle={'light-content'} />
       <MusicScreen/>
      </View>
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
