import * as FileSystem from 'expo-file-system';
import { fetchImages } from './fetchImages';

const DIRECTORY = FileSystem.documentDirectory + 'artworks'

export async function writeToDir(){
try{

 
 const dirFiles = await FileSystem.readDirectoryAsync(DIRECTORY)

 if(dirFiles.length === 0){
   const images =  await fetchImages()

   await Promise.all(
    images.map((url, index)=>{
        const path = `${DIRECTORY}/artwork_${index}`
        return FileSystem.downloadAsync(url, path)
    })
)
 } else{
    return 
 }



}catch(err){
    console.error(err)
}
}
