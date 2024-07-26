/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */

import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { Redirect, router, Stack } from 'expo-router';
import { useAtom } from 'jotai';
import { Blocks, CircleUser, Navigation, PhoneIcon } from 'lucide-react-native';
import { Actionsheet, Button, Center, Container, Heading, ScrollView, Text, View } from "native-base";
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { haversineDistance } from '../../hooks/distance';
import { api, authAtom } from '../_layout';

// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies

interface SellerType {
  fullName: string;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  phoneNumber: string;
}

const Home = () => {
  const [isActionSheet, setActionSheet] = useState<boolean>(false)
  const [auth, setAuth] = useAtom(authAtom);
  const [redirect, setRedirect] = useState<string | null>(null);
  const [sellers, setSellers] = useState<SellerType[]>([{ fullName: "Liam Smith", latitude: 28.448712, longitude: 77.304692, address: null, phoneNumber: "254-749-2147" },
  { fullName: "Olivia Martinez", latitude: 28.511287, longitude: 77.398674, address: null, phoneNumber: "396-869-2234" },
  { fullName: "James Wilson", latitude: 28.430198, longitude: 77.310905, address: null, phoneNumber: "245-456-6798" },
  { fullName: "Sophia Thomas", latitude: 28.389035, longitude: 77.252407, address: null, phoneNumber: "678-453-9231" },
  { fullName: "Emma Brown", latitude: 28.505638, longitude: 77.336196, address: null, phoneNumber: "532-893-4735" },
  { fullName: "Mason White", latitude: 28.472507, longitude: 77.357892, address: null, phoneNumber: "841-546-7832" },
  { fullName: "Benjamin Anderson", latitude: 28.387132, longitude: 77.287964, address: null, phoneNumber: "743-329-5840" },
  { fullName: "Isabella Taylor", latitude: 28.328834, longitude: 77.314372, address: null, phoneNumber: "292-587-3294" },
  { fullName: "Ava Johnson", latitude: 28.476825, longitude: 77.425847, address: null, phoneNumber: "964-372-9014" },
  { fullName: "Noah Davis", latitude: 28.394261, longitude: 77.281284, address: null, phoneNumber: "314-962-7758" }
  ])

  const fetchNearbySellers = async () => {
    console.log('huh?')
    if (auth.klearkeemat) {
      console.log('huh? 2')
      try {
        const res: AxiosResponse<SellerType[]> = await axios.post(`${api}/nearby-sellers`, {
          lat: auth.klearkeemat.latitude,
          lon: auth.klearkeemat.longitude
        });

        // setSellers(res.data);
      } catch (error) {
        console.log('error')
        console.log(JSON.stringify(error))
      }
    }
  }


  useEffect(() => {
    void fetchNearbySellers();

    Toast.show({
      text1: 'Note',
      text2: 'You can check the trading inventory of a seller by pressing on their name!'
    })
  }, [auth])

  if (!auth.klearkeemat) return <></>;

  if (redirect) return <Redirect href={redirect} />

  return (
    <ScrollView>
      <SafeAreaView
        style={{
          backgroundColor: 'white',
        }}
        className="h-full w-full"
      >
        <Stack.Screen
          options={{
            headerRight(props) {
              return (
                <TouchableOpacity onPress={() => setActionSheet(true)} className="ml-auto mr-5">
                  <CircleUser size={25} color="black" />
                </TouchableOpacity>
              );
            },
            headerTitle() {
              return (
                <View
                  className="flex flex-row items-center px-2"
                  style={{
                    alignItems: 'center',
                  }}
                >
                  <View className="flex flex-row items-center gap-2">
                    <Image
                      source={require('../../assets/icon.png')}
                      className="h-12 w-12"
                    />
                    <Text
                      className="text-xl"
                      style={{
                        fontFamily: 'Product Sans',
                      }}
                    >
                      Welcome, {auth.klearkeemat?.fullName}!
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        />

        <Center>
          <Container>
            <Heading>
              Welcome to <Text color="emerald.500">KlearKeemat!</Text>
            </Heading>
            <Text mt="3" fontWeight="medium">
              Intelligent Android App for Evaluating Calorific and Market Value of Agricultural Co-Products.
            </Text>
            <Text mt="3" fontWeight="medium">
              * Blue Marker is your location.
            </Text>
          </Container>
        </Center>
        {/* 
      <Center className='pb-3 pt-12'>
        <Container>
          <View className='flex flex-row items-center gap-3'>
            <Handshake color="black" />
            <Heading fontFamily="Inter" className='border-b-2 border-gray-300'>Nearby Sellers</Heading>
          </View>
        </Container>
      </Center> */}

        <Container className='my-8'>
          <MapView
            style={{ width: 600, height: 300 }}
            region={{
              latitude: auth.klearkeemat.latitude!,
              longitude: auth.klearkeemat.longitude!,
              latitudeDelta: 0.4,
              longitudeDelta: 0.4,
            }}
          >
            <Marker pinColor="blue" coordinate={{
              latitude: auth.klearkeemat.latitude!,
              longitude: auth.klearkeemat.longitude!,
            }} />
            {sellers?.map((s, i) => (
              <Marker key={i} pinColor="red" coordinate={{
                latitude: s.latitude!,
                longitude: s.longitude!,
              }} />
            ))}
          </MapView>
        </Container>

        <ScrollView>
          {sellers?.map((s, i) => (
            <View key={i} className='mb-10 flex w-full flex-col gap-2 gap-y-4 px-12'>
              <View>
                <TouchableOpacity onLongPress={() => Toast.show({
                  type: 'info',
                  text1: 'View Inventory',
                  text2: `of ${s.fullName}`
                })} className='flex flex-row items-center gap-2'>
                  <Text className='text-2xl font-bold' fontFamily="Inter">{s.fullName}</Text>
                  <View>
                    <Blocks color="black" />
                  </View>
                </TouchableOpacity>
                <Text className='mb-2 text-sm' fontFamily="Inter">+91 {s.phoneNumber.substring(0, 5)} {s.phoneNumber.substring(5, 10)}</Text>
                <Text className='mt-1 text-sm text-gray-600' fontFamily="Inter">
                  {haversineDistance(auth.klearkeemat?.latitude, auth.klearkeemat?.longitude, s.latitude, s.longitude).toFixed(2)} KMs away
                </Text>
              </View>
              <View className='flex flex-row'>
                <Button size="xs" className='mr-2 w-1/2' backgroundColor="blue.400">
                  <View className='flex flex-row items-center gap-2'>
                    <Navigation color="white" size={18} />
                    <Text color="white">Directions</Text>
                  </View>
                </Button>

                <Button size="xs" className='w-1/2'>
                  <View className='flex flex-row items-center gap-2'>
                    <PhoneIcon color="white" size={18} />
                    <Text color="white">Call Now</Text>
                  </View>
                </Button>
              </View>
            </View>
          ))}
        </ScrollView>


        {/* <View className='flex flex-row items-center gap-2 px-6'>
        <View className='flex flex-row items-center border-2 border-gray-400 px-4 py-2'>
          <Text>

          </Text>
        </View>
      </View> */}





        <Actionsheet isOpen={isActionSheet} onClose={() => setActionSheet(false)}>
          <Actionsheet.Content borderTopRadius="0">
            {/* <Actionsheet.Item>Switch Account or to Buyer</Actionsheet.Item> */}
            <Actionsheet.Item onPress={() => {
              setAuth({
                ...auth,
                klearkeemat: null
              });
              router.push('/')
            }}>Logout</Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
        <Toast />
      </SafeAreaView>
    </ScrollView>
  );
};
export default Home;
