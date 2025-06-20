import { useEffect } from 'react';
import { useState } from 'react';
import Swiper from 'react-native-swiper';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from './firebase';
import * as FileSystem from 'expo-file-system';
import { fetchFromDir } from './utility_functions/fetchFromDir';


 function GalleryScreen() {

      const [images, setImages] = useState([]);


  const handleFetch = async () => {
  const fetched = await fetchFromDir();
  if (fetched) {
    setImages(fetched);
  }

};

 useEffect(() => {
  console.log('Images updated:', images);
}, [images]);


  return (
    <View style={styles.displayCont}>

   {images.length === 0 &&
    <View style={styles.mainCont}>
   <View style={styles.cont}>

    <Text style={styles.mainHeader}>Current artist Name Surname</Text>
       <TouchableOpacity style={styles.displayButton} onPress={()=>handleFetch()}>
        <Text style={styles.buttonText}>Start Displaying</Text>
      </TouchableOpacity>
   
   </View>
   </View> }

 {images && <View  style={styles.mainDisplayCont} >
<Swiper
  autoplay={true}
  autoplayTimeout={7}
  loop={true}
  showsPagination={true}>
 {images.map((url, index) => (
    <View key={index} style={styles.displayCont}>
      <Image source={{ uri: url }} style={styles.image} />
    </View>
  ))}
</Swiper>
    </View>
  }
   </View>
  );
}

export default GalleryScreen;

const styles= StyleSheet.create({
  mainCont:{
    display:'flex',
     justifyContent:'center',
     flexDirection:'column',
     alignItems:'center',
    height:'100%'
  },
  
  cont:{
    width:'70%',
    display:'flex',
    flex:1,
    gap: 20,
     justifyContent:'center',
     flexDirection:'column',
     alignItems:'center'
  },

  mainHeader:{
      fontSize: 20,
      fontWeight:'bold',
      color: 'rgb(82, 82, 91)',


  },


  displayButton:{
    display:'flex',
    width: '100%',
    alignItems:'center',
   marginHorizontal: 20,
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: 'rgb(46, 16, 101)',
    borderRadius: 3,

  },
  buttonText:{
    color: 'rgb(255, 247, 237)',
    fontWeight: 'bold',
    fontSize: 20,

  },

  mainDisplayCont:{
     display:'flex',
     width: '100%',
     height: '100%'
  },

  displayCont:{
    display: 'flex',
    height: '100%',
    width:'100%',
    flex: 1
  },
  image:{
    height: '100%',
    display: 'flex',
  }
})