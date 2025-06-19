import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useNavigation } from '@react-navigation/native';

function LogIn() {

    const [loginDetails, setLoginDetails] = useState({
        email:'',
        password:''
    })

    const [errorMessage, setErrorMessage] = useState('')
    const navigation = useNavigation();

    function handleChnage(name, value){
       
        setLoginDetails((details)=>( {...details, [name]: value}))
        setErrorMessage('')
    }


    async function handleLogIn(){
    const { email, password } = loginDetails;

  if (!email || !password) {
    setErrorMessage('Please enter both email and password')
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'businesses', uid));

    if (userDoc.exists() && userDoc.data().role === 'business') {
      navigation.navigate('Enter Code');
    } else {
      setErrorMessage('Access denied. Only business accounts are allowed.');
    }
    // console.log(' Logged in user:', userCredential.user.uid);
     
    
  } catch (error) {
    console.error('Login error:', error.message);
  
       switch (error.code) {
      case 'auth/invalid-email':
        setErrorMessage('The email address is not valid.');
        break;
      case 'auth/user-not-found':
        setErrorMessage('No user found with this email.');
        break;
      case 'auth/wrong-password':
        setErrorMessage('Incorrect password.');
        break;
      case 'auth/too-many-requests':
        setErrorMessage('Too many login attempts. Please try again later.');
        break;
      default:
        setErrorMessage('Login failed. Please try again.');
    }
  }

    }

  

  return (
    <View style={styles.mainCont}>
   <View style={styles.container}>
       <Text style={styles.mainHeader}>Log In</Text>
       {errorMessage !== '' && <Text style={styles.errormessage}>{errorMessage}</Text>}
       <TextInput
       style={styles.textInput}
       placeholder='email'
       value={loginDetails.email}
       onChangeText={(text)=> handleChnage('email', text)}
       />
       <TextInput
        style={styles.textInput}
        placeholder='password'
        value={loginDetails.password}
        onChangeText={(text)=> handleChnage('password', text)}
        secureTextEntry={true}

       />
        <TouchableOpacity onPress={()=>handleLogIn()} style={styles.button}>
    <Text style={styles.buttonTxt}>Log In</Text>
   </TouchableOpacity>
   </View>
  
   </View>
  );
}

export default LogIn;

const styles = StyleSheet.create({
    mainCont:{
        display:'absolute',
        backgroundColor:'white',
      
    
    },
    container:{
      marginTop: 30,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
       gap: 15,

    },

    mainHeader:{
         fontSize: 30,
         fontWeight:'700',
         color:'rgb(46, 16, 101)',
         paddingBottom: 40,


    },
    textInput:{
        backgroundColor: 'rgb(244, 244, 245)',
        width:'85%',
        paddingHorizontal:20,
        paddingVertical: 15,
       borderRadius: 100,
       
        
    },
    button:{
        backgroundColor:'rgb(46, 16, 101)',
         borderRadius: 100,
        width:'85%',
         paddingHorizontal:20,
        paddingVertical: 15,
       
    },
    buttonTxt:{
        color:'white',
        textAlign:"center",
        fontWeight:'bold'
    },
    errormessage:{
      color:'red'
    }
})