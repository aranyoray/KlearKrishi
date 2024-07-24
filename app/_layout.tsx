/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { atomWithStorage } from 'jotai/utils'
import {NativeBaseProvider } from "native-base";
import { NativeWindStyleSheet } from 'nativewind';

const authAtom = atomWithStorage('authAtom', false);

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function Layout() {
  const [loaded] = useFonts({
    'Inter': require('../assets/fonts/Inter.ttf'),
    'Product Sans': require('../assets/fonts/Product-Sans.ttf'),
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!loaded) return <></>;

  return <NativeBaseProvider><Stack /></NativeBaseProvider>;
}
