import { StyleSheet, Text, View ,TextInput, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native'
import React, {useState} from 'react'
// image picker
import {launchCamera, launchImageLibrary , MediaType , CameraOptions , ImagePickerResponse} from 'react-native-image-picker';

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import HomeScreen from './HomeScreen';



type  OnboardingProps = NativeStackScreenProps<RootStackParamList,'Onboarding'>



const Onboarding = ({navigation} : OnboardingProps) => {
    const [imageUri,setImageUri] = useState('')
// use state for routing
    const[onboarded,setOnboarded] = useState(false)
// const requestCameraPermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: "Camera Permission",
//           message: "We need access to your camera to take a photo.",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK"
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   }
//   return true; 
// };    

// const handleCameraLaunch  = async()=>{
//     const options : CameraOptions = {
//         mediaType : 'photo',
//         quality : 0.8,
//         saveToPhotos : false
//     }
//     const hasPermission = await requestCameraPermission();
//     if (!hasPermission) {
//         console.log("Permission not granted, cannot launch camera.");
//         return; 
//     }else{

    
//     launchCamera(options , (response : ImagePickerResponse)=>{
//         if (response.didCancel){
//             console.log('Operation Cancelled!')
//         }else if(response.errorCode){
//             console.log('Error')
//         }else if(response.errorMessage){
//             console.log('Error')
//         }else if(response.assets && response.assets.length > 0){
//             const imguri   = response.assets?.[0]?.uri
//             if (imguri){
//                 setImageUri(imguri)
//             }
//         }
//     })
// }}
  return (
    
    <View style={styles.container}>
        <TextInput
          style={styles.input}
        //   onChangeText={}
          placeholder='Enter a Username'
          maxLength={15}
        />

        <View style={styles.pfpOptsContainer}>
            <Text>A quick pfp?</Text>
            <TouchableOpacity  style={styles.takephotobtn}>
                <Text> Open Camera ---- fix this</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.choosephotobtn}>
                
            </TouchableOpacity>
        </View>

        {/* sort these ! */}
            <TouchableOpacity onPress={()=>navigation.replace('HomeScreen',{username : 'sample',profilePicUri: 'sampleuri'})}  style={styles.choosephotobtn}>
                <Text>Continue</Text>
            </TouchableOpacity>
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
    choosephotobtn: {},
    takephotobtn : {},
    pfpOptsContainer : {
        flex : 0.2,
        flexDirection : 'row'
    },
    input : {
        borderWidth : 2,
        borderRadius : 5,
        height : 50,
        width : '80%',
        color : '#FFF',
        borderColor : '#64007dff'
    },
    container : {
        flex : 1,
        backgroundColor : '#e388ffff',
        color : '#64007dff',
        padding : 20,
        alignItems : 'center',
        justifyContent : 'center'
    },
})