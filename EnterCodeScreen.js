import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import styles  from './styles';
import { collection, setDoc, getDocs, doc } from 'firebase/firestore';
import { db } from './firebase';

function EnterCodeScreen() {
    const [code, setCode] = useState()
    const [codeStatus, setCodeStatus] = useState(false)

    function handleChange(text){
        if (text.length === 6){
            setCodeStatus(true)
        } else{
            setCodeStatus(false)
            
        }
        setCode(text)
    }

    async function checkCode(code){
        try{

            const querry = querry(collection(collection(db,  'sessions'), where ('code', '==', code)))
            const data = await getDocs(querry)

            if (!data.empty){
                 const sessionsDoc = data.docs[0]
                 await updateDoc(doc(db, 'sessions', sessionsDoc.id)),{
                    connected: true
                 }
            }

        }catch (err){
          console.error(err)
        }
    }

  return (
   <View style={styles.mainCont}>
    <Text style={styles.header}>
        Enter connection code:
    </Text>
    <TextInput
    value={code}
    onChangeText={handleChange}
    style={[currentStyles.textInput, codeStatus && {borderColor: 'rgb(57, 181, 88)'}]}
    placeholder=''
    maxLength={6}
    autoCapitalize="characters"
     keyboardType="default" 
     editable={!codeStatus}
     autoFocus
    />

  

{codeStatus === true ?
<TouchableOpacity style={currentStyles.successButton}>
    <Text style={styles.buttonText}>Next</Text>
</TouchableOpacity>:
''

}


   </View>
  );
}

export default EnterCodeScreen;


const currentStyles=StyleSheet.create({

    successButton:{
     display:'flex',
     width: 30 * 6 - 18,
    alignItems:'center',
    marginTop: 20,
    paddingHorizontal: 5,
    paddingVertical: 20,
    backgroundColor: 'rgb(57, 181, 88)',
    borderRadius: 100,
    },
      textInput:{
        backgroundColor: 'rgb(244, 244, 245)',
        width: 30 * 6 - 18,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor:'rgb(212, 212, 216)',
        paddingVertical: 15,
       borderRadius: 3,
       fontSize: 30,
       color: 'rgb( 82, 82, 91)'
        
    },


})