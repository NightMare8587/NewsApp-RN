import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function index() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const checkIfLoggedIn = async () => {
        const value = await AsyncStorage.getItem("isLoggedIn");

        if(value == "true") {
            router.push("/(news)")
        }
    } 
    useEffect(() => {
        checkIfLoggedIn()
    },[])
    const loginButtonPress = () => {
        if(email == "" || password == "") {
            Toast.show({
                type: 'error',
                text1: "Fields can't be empty",
                text2: "h"
            })
        } else {
            Toast.show({
                type: 'success',
                text1: "Login Success"
            })
            setTimeout(storeData,1000)
        }
    }

    const storeData = async () => {
        try{
            await AsyncStorage.setItem("isLoggedIn","true")
            router.push("/(news)")
        } catch(e) {

        }
    }

    
  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>Welcome to Fatafat News</Text>
      <Text style={styles.subtitleTextStyle}>Most trusted news app in india</Text>
      <TextInput 
      style={styles.inputField}
      placeholder='Enter your email'
      value={email}
      onChangeText={setEmail}
      />
      <TextInput 
      style={styles.inputField}
      placeholder='Enter your password'
      value={password}
      onChangeText={setPassword}
      />
      <View style={styles.loginButton}>
      <Button
        title='Login'
        color={styles.loginButton.color}
        onPress={loginButtonPress}  />
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor : '#f8ae56',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleTextStyle : {
        fontSize : 38,
        fontWeight: '600',
        textAlign: 'center',
        marginHorizontal: 40
    },
    subtitleTextStyle: {
        fontSize: 24,
        fontWeight: 400,
        textAlign: 'center',
        marginHorizontal: 20,
        marginTop: 10
    },
    inputField: {
        width: '90%',
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 2,
        fontSize: 20,
        marginTop: 10,
        borderRadius: 12,
        paddingStart: 10
    },
    loginButton: {
        color: '#f86f56',
        backgroundColor: '#f86f56',
        borderRadius: 20,
        marginTop: 20
    }
})