/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { atom } from 'jotai';
import { NativeBaseProvider } from "native-base";
import { NativeWindStyleSheet } from 'nativewind';

import Authwall from './_authwall';


type AuthAtom = {
  'klearkrishi': {
    id: string;
    fullName: string;
    latitude: number | null;
    longitude: number | null;
    address: string | null;
    phoneNumber: string;
  } | null,
  'klearkeemat': {
    id: string;
    fullName: string;
    latitude: number | null;
    longitude: number | null;
    address: string | null;
    phoneNumber: string;
  } | null
}

const authDefaultAtom = atom<AuthAtom>({
  klearkrishi: null,
  klearkeemat: null
});

export const authAtom = atom((get) => get(authDefaultAtom), async (get, set, value: AuthAtom) => {
  set(authDefaultAtom, value);
  await AsyncStorage.setItem("klearkrishi_auth", JSON.stringify(value.klearkrishi));
})


export const api = process.env.NODE_ENV == 'development' ? `https://0d95-106-219-123-18.ngrok-free.app` : '';


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

  return <NativeBaseProvider><Authwall><Stack /></Authwall></NativeBaseProvider>;
}
