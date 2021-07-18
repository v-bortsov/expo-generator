import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { Provider } from 'react-redux'
import { store } from './src/store'
import { NativeBaseProvider, extendTheme, Text, ColorMode,  } from 'native-base';
import type { StorageManager } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};
// extend the theme
const customTheme = extendTheme({ config });
const colorModeManager: StorageManager = {
  get: async () => {
    try {
      const val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem(
        '@color-mode',
        value
      );
    } catch (e) {
      console.log(e);
    }
  },
};
export default function App() {
  const isLoadingComplete = useCachedResources(); 
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={ store }>
        <NativeBaseProvider theme={customTheme} colorModeManager={colorModeManager}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </Provider>
    );
  }
}
