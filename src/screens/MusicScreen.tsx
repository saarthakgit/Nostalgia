import { Dimensions, StyleSheet, View ,Image ,Text,FlatList } from 'react-native'
import React , {useState} from 'react'
import TrackPlayer, { Event , Track , useTrackPlayerEvents} from 'react-native-track-player'
import { playListData } from '../constants'
import SongSlider from '../components/SongSlider'
import SongInfo from '../components/SongInfo'
import ControlCenter from '../components/ControlCenter'





const {width} = Dimensions.get('window')

const MusicScreen=()=> {
    const [track , setTrack] = useState<Track | null>()

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged] , async event =>{
        switch (event.type) {
            case Event.PlaybackActiveTrackChanged:
                if (event.index !== undefined) {
                const playingTrack = await TrackPlayer.getTrack(event.index); 
                setTrack(playingTrack)
            }
            break;
                
                break;
        
            default:
                break;
        }
    })

  return (
    <View style={styles.container}>
        <View style={styles.albumContainer}>
                    
                        <Image style={styles.albumArtImg} source={{uri:track?.artwork?.toString()}}/>

                        
                    
                </View>
            <SongInfo track = {track}/>
            <SongSlider/>
            <ControlCenter/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingTop : '30%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#001d23',
    },
    listArtWrapper: {
      flex : 1,
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    albumContainer: {
      width: 250,
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',

    },
    albumArtImg: {
      height: 250,
      width : 250,
      borderRadius: 40,
    },
})

export default MusicScreen