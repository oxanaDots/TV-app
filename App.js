// App.js

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EnterCodeScreen from './EnterCodeScreen';
import GalleryScreen from './GalleryScreen';
import LogIn from './LogIn';
import { useEffect } from 'react';
import { writeToDir } from './utility_functions/writeToDir';
import * as FileSystem from 'expo-file-system'

const Stack = createStackNavigator();

const DIRECTORY = FileSystem.documentDirectory + 'artworks';


export default function App() {

 useEffect(() => {
    async function setup() {
      try {
        const dirInfo = await FileSystem.getInfoAsync(DIRECTORY);
        if (!dirInfo.exists) {
          console.log('Directory does not exist. Creating...');
          await FileSystem.makeDirectoryAsync(DIRECTORY, { intermediates: true });
        }

        const files = await FileSystem.readDirectoryAsync(DIRECTORY);
        console.log('Files in directory:', files);

        if (files.length === 0) {
          console.log('Directory is empty. Fetching images...');
          await writeToDir();
        } else {
          console.log('Directory has images. No need to fetch.');
        }
      } catch (error) {
        console.error('Error during setup:', error);
      }
    }

    setup();
  }, []);



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Log In">
        <Stack.Screen name="Log In" component={LogIn} />
        <Stack.Screen name="Enter Code" component={EnterCodeScreen} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


