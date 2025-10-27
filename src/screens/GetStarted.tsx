import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import Onboarding from './Onboarding'

type GetStartedProps = NativeStackScreenProps<RootStackParamList,"GetStarted">


const GetStarted = ({navigation} : GetStartedProps) => {
    return (
        <View style={styles.container}>
      <View style={styles.paratextContainer}>
        <Text style={styles.paratext}>Lets Dive in!</Text>
      </View>
      <View style={styles.nametextContainer}>
        <Text style={styles.nametext}>Nostalgia</Text>
      </View>
      <View style={styles.btncontainer}>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Onboarding')}>
            <Text style={{fontSize : 20, color : '#e388ffff'
            }}>Get Started!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default GetStarted

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#e388ffff',
        color : '#64007dff',
        padding : 20
    },
    paratextContainer : {
        flex : 0.4
    },
    paratext : {
        color : '#64007dff',
        fontSize : 40,
    },
    nametextContainer : {
        flex : 0.4
    },
    nametext : {
        color : '#64007dff',
        fontSize : 60,
    },
    btncontainer : {
        flex : 0.2,
        borderRadius : 5,
        borderWidth : 5,
        borderColor : '#FFF'
    },
    btn : {
        backgroundColor : '#64007dff',
        margin : '10%',
        height : 80,
        width : '80%',
        alignItems : 'center',
        justifyContent : 'center',
        
    }
})