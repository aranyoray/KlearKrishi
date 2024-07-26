/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */

import { Redirect, router, Stack } from 'expo-router';
import { useAtom } from 'jotai';
import { CircleUser, LayoutPanelLeft, PlusCircle } from 'lucide-react-native';
import { Actionsheet, Center, Container, Heading, Text, View } from "native-base";
import { useState } from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { authAtom } from '../_layout';

// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies

const Home = () => {
  const [isActionSheet, setActionSheet] = useState<boolean>(false)
  const [auth, setAuth] = useAtom(authAtom);
  const [redirect, setRedirect] = useState<string | null>(null)

  if (!auth.klearkrishi) return <></>;

  if (redirect) return <Redirect href={redirect} />

  return (
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
                    Welcome, {auth.klearkrishi?.fullName}!
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
            Welcome to <Text color="emerald.500">KlearKrishi!</Text>
          </Heading>
          <Text mt="3" fontWeight="medium">
            NativeBase is a simple, modular and accessible component library that
            gives you building blocks to build you React applications.
          </Text>
        </Container>
      </Center>

      <Center className='pb-3 pt-12'>
        <Container>
          <View className='flex flex-row items-center gap-3'>
            <LayoutPanelLeft color="black" />
            <Heading fontFamily="Inter" className='border-b-2 border-gray-300'>Stocks Management</Heading>
          </View>
        </Container>
      </Center>

      <TouchableOpacity onPress={() => setRedirect('/klearkrishi/createItem')} className='mx-auto flex rounded-md bg-cyan-400 px-4 py-2 text-white'>
        <View className='flex flex-row items-center gap-2'>
          <PlusCircle color="black" size={16} />
          <Text>Create Stock Listing</Text>
        </View>
      </TouchableOpacity>


      {/* <View className='flex flex-row items-center gap-2 px-6'>
        <View className='flex flex-row items-center border-2 border-gray-400 px-4 py-2'>
          <Text>

          </Text>
        </View>
      </View> */}





      <Actionsheet isOpen={isActionSheet} onClose={() => setActionSheet(false)}>
        <Actionsheet.Content borderTopRadius="0">
          <Actionsheet.Item>Switch Account or to Buyer</Actionsheet.Item>
          <Actionsheet.Item onPress={() => {
            setAuth({
              ...auth,
              klearkrishi: null
            });
            router.push('/')
          }}>Logout</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </SafeAreaView >
  );
};
export default Home;
