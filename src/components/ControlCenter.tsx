import { View, Text , StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import TrackPlayer, { isPlaying, State, usePlaybackState } from 'react-native-track-player'
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { playbackService } from '../../musicPlayerServices';
import { playListData } from '../constants';


const ControlCenter = () => {

    const {state} = usePlaybackState()
    const playbackstate : any = state
    const skipToNext = async ()=>{
        TrackPlayer.skipToNext()
    }
    const skipToPrev = async ()=>{
        TrackPlayer.skipToPrevious()
    }
    const PlayPauseToggle = async (playback : State)=>{
        const ActiveTrack = await TrackPlayer.getActiveTrack()

        if(ActiveTrack !== null){
            if(playback === State.Paused || playback === State.Ready){
                await TrackPlayer.play()
            }else{
                await TrackPlayer.pause()
            }
        }

    }

    let toggle : any = ''
    {playbackstate === State.Playing ? toggle='pause' : toggle ='play-circle'} 
  return (
    <View style={styles.container}>
        {/* previous */}
      <TouchableOpacity onPress={skipToPrev} > 
        <MaterialIcons style={styles.icon} name={'skip-previous'} size = {40} ></MaterialIcons>
      </TouchableOpacity>

{/* toggleplayback */}

      <TouchableOpacity onPress={()=>{PlayPauseToggle(playbackstate)}} > 
      
        <MaterialIcons style={styles.icon} name={toggle} size = {80} ></MaterialIcons>
      </TouchableOpacity>

{/* next */}
      <TouchableOpacity  onPress={skipToNext}  > 
        <MaterialIcons style={styles.icon} name={'skip-next'} size = {40}></MaterialIcons>
      </TouchableOpacity>


    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      marginBottom: 56,
  
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      color: '#aabfa8ff',
      marginLeft : 20,
      marginRight : 20
    },
  });


export default ControlCenter