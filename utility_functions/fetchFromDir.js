import * as FileSystem from 'expo-file-system';

const DIRECTORY = FileSystem.documentDirectory + 'artworks'


export async function fetchFromDir(){
    try{
        const images = await FileSystem.readDirectoryAsync(DIRECTORY)

        const files = images.map((file)=> `${DIRECTORY}/${file}`)
        return files
    } catch(err){
        console.error(err)
    }
}