import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    ActivityIndicator, 
    SafeAreaView 
} from 'react-native'
import React, {useEffect, useState} from 'react'
// image picker
import {launchImageLibrary , MediaType , ImagePickerResponse} from 'react-native-image-picker';
// vision camera
import {
    useCameraPermission,
    useMicrophonePermission,
    Camera, 
    useCameraDevices, 
    useCameraDevice
} from 'react-native-vision-camera'


// Navigation 
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'


type OnboardingProps = NativeStackScreenProps<RootStackParamList,'Onboarding'>

const Onboarding = ({navigation} : OnboardingProps) => {
    const [userName, setUserName] = useState('')
    const [imageUri, setImageUri] = useState('')
    const [isCameraOpen, setIsCameraOpen] = useState(false)
    const [isPermissionChecked, setIsPermissionChecked] = useState(false);
    
    const { 
        hasPermission: hasCamPermission, 
        requestPermission: reqCamPermission,

    } = useCameraPermission()
    
    const { 
        hasPermission: hasMicPermission, 
        requestPermission: reqMicPermission 
    } = useMicrophonePermission()



    // Fetching camera device
    const devices  = useCameraDevices()
    const device = useCameraDevice('back')

    // 1. Initial Permission Check and Request
    useEffect(() => {
        // If permission status is known (true or false), mark as checked
        if (hasCamPermission !== undefined && hasMicPermission !== undefined) {
            setIsPermissionChecked(true);
        }
        
        // Only request if permission hasn't been granted yet
        if (hasCamPermission === false) {
            reqCamPermission()
        }
        if (hasMicPermission === false) {
            reqMicPermission()
        }
    }, [hasCamPermission, hasMicPermission])

    // 2. Handler to open the camera (runs on button press)
    const handleOpenCamera = async () => {
        // Ensure both permissions are explicitly granted
        if (hasCamPermission && hasMicPermission) {
            setIsCameraOpen(true) // Update state to render the camera
        } else {
            // Permission wasn't granted yet, request again or direct user to settings
            const camGranted = await reqCamPermission();
            const micGranted = await reqMicPermission();

            if (camGranted && micGranted) {
                 setIsCameraOpen(true);
            } else {
                // Handle permanent denial: If the request returns false, it means denial
                Alert.alert(
                    "Permission Required", 
                    "Please grant Camera and Microphone access in your device settings to continue.",
                    [{ text: "OK" }]
                );
            }
        }
    }

    // Conditional Render Logic
    
    // Case A: Waiting for permissions check or device (loading)
    // Check if device is null OR if permission status is still undefined (initial loading)
    if (device == null || hasCamPermission === undefined || hasMicPermission === undefined) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#64007dff" />
                <Text style={{color: '#64007dff', marginTop: 10}}>
                    Loading camera and checking permissions...
                </Text>
            </View>
        );
    }
    
    // Case B: Permissions denied (Handle permanent denial here)
    if (!hasCamPermission || !hasMicPermission) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={{color: '#FF0000', fontSize: 20}}>
                    CAMERA ACCESS DENIED
                </Text>
                <Text style={{color: '#64007dff', marginTop: 10, textAlign: 'center'}}>
                    Please go to your device settings to enable Camera and Microphone access.
                </Text>
            </View>
        );
    }

    // Case C: Camera is open (Permissions are guaranteed to be true here)
    if (isCameraOpen) {
        return (
            // The camera view takes up the whole screen
            <View style={styles.cameraFillContainer}>
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    // IMPORTANT: You need a frame processor or a way to capture the photo here
                />
                <TouchableOpacity 
                    style={{flex:1,position:"absolute",bottom : 90, borderRadius:50, height : 70, width : 70 , backgroundColor:'#FFF', alignSelf:'center'}}
                >
                    </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.closeCameraBtn}
                    onPress={() => setIsCameraOpen(false)} // Button to close the camera
                >
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Close Camera</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Case D: Standard Onboarding Screen (Permissions Granted)
    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setUserName}
                value={userName}
                placeholder='Enter a Username'
                placeholderTextColor='rgba(255, 255, 255, 0.6)'
                maxLength={15}
            />

                <Text style={styles.pfpText}>A quick memory?</Text>
            <View style={styles.pfpOptsContainer}>
                
                {/* Fixed Open Camera Button */}
                <TouchableOpacity 
                    onPress={handleOpenCamera} 
                    style={styles.takephotobtn}
                    // Button is only disabled if we are waiting for the permission check to complete
                    disabled={hasCamPermission !== true || hasMicPermission !== true} 
                >
                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>
                        Open Camera
                    </Text>
                </TouchableOpacity>
                
                {/* Choose Photo Button - Not Implemented */}
                <TouchableOpacity style={styles.choosephotobtn}>
                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>Choose Photo</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                onPress={() => navigation.replace('HomeScreen',{
                    username: userName || 'New User',
                    profilePicUri: imageUri || 'default_uri'
                })} 
                style={styles.continueBtn}
            >
                <Text style={{color: '#64007dff', fontWeight: 'bold', fontSize: 18}}>
                    Continue
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Onboarding

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e388ffff',
    },
    cameraFillContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    closeCameraBtn: {
        position: 'absolute',
        bottom: 40,
        marginTop:20,
        marginBottom:'80%',
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255, 0, 0, 0.71)',
        padding: 15,
        borderRadius: 10,
    },
    continueBtn: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 8,
        marginTop: 50,
        width: '80%',
        alignItems: 'center',
    },
    pfpText: {
        color: '#FFF',
        fontSize: 18,
        marginRight: 20,
    },
    choosephotobtn: {
        backgroundColor: '#64007dff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    takephotobtn : {
        backgroundColor: '#64007dff',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        alignItems: 'center',
    },
    pfpOptsContainer : {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    input : {
        borderWidth : 2,
        borderRadius : 8,
        height : 50,
        width : '80%',
        color : '#FFF',
        borderColor : '#64007dff',
        paddingHorizontal: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        fontSize: 16,
    },
    container : {
        flex : 1,
        backgroundColor : '#e388ffff',
        padding : 20,
        alignItems : 'center',
        justifyContent : 'flex-start',
        paddingTop: 80,
    },
})