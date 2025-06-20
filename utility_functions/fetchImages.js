
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';




export async function fetchImages (){
 try{
   const snapshot = await getDocs(collection(db,'exhibitions'))
   const data = snapshot.docs.map(doc => ({
      id: doc.id,         
  ...doc.data() 
   }))
   const images = data[0].images
  
   
   return images

 } catch(err){
   console.error(err)
 }
}

