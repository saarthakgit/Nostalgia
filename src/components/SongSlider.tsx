import { StyleSheet, Text, View } from 'react-native'
import React, { use } from 'react'
import  Slider  from '@react-native-community/slider'
import {useProgress} from 'react-native-track-player'

const SongSlider=()=> {
    const {position,duration} = useProgress()
return (
    <View>
      <Slider value={position} minimumValue={0} maximumValue={duration} thumbTintColor = '#767676ff' maximumTrackTintColor = '#FFFFFF'
      style={styles.sliderContainer}/>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>
            {new Date(position*1000).toISOString().substring(15,19)}
        </Text>
        <Text style={styles.time}>
            {new Date((duration-position)*1000).toISOString().substring(15,19)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
     sliderContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent : 'center',
      height: 40,
      marginTop: 100,
  
      flexDirection: 'row',
    },
    timeContainer: {
      width: 340,
      paddingLeft : 15,
      paddingRight : 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    time: {
      color: '#fff',
    },
  });
export default SongSlider