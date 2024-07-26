/* eslint-disable no-void */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
/*  */

import { router, Stack } from 'expo-router';
import { useAtom } from 'jotai';
import { CameraIcon, CircleUser, MoveLeft } from 'lucide-react-native';
import { Actionsheet, Box, Divider, FormControl, ScrollView, Input, Text, View, Stack as NativeStack, Button } from "native-base";
import { useState } from 'react';
import { Image, StyleSheet, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api, authAtom } from '../_layout';
import { Camera, CameraType } from 'expo-camera'
import Toast from 'react-native-toast-message';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'

// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
const Home = () => {
  const [isActionSheet, setActionSheet] = useState<boolean>(false)
  const [auth, setAuth] = useAtom(authAtom);
  const [camera, setCamera] = useState<Camera | null | undefined>();

  const [chooseImage, setChooseImage] = useState<boolean>(false)
  const [image, setImage] = useState<string>();
  const [uploadingImage, setUploadingImage] = useState<boolean>(false)
  const [uploaded, setUploaded] = useState<boolean>(false);

  const [apiResult, setAPIResult] = useState();

  const uploadImage = async () => {
    if (!image) return;

    try {
      const data = new FormData();
      const blob = await (await fetch(image)).blob();
      data.append('image', blob, 'image.png');

      const res = await axios.post(`${api}/uploadImage`, data)

    } catch (error) {

    }
  };

  const getBase64fromURI = (uri: string) => {
    setUploadingImage(true);

    try {
      FileSystem.readAsStringAsync(uri, {
        encoding: 'base64'
      }).then(data => {
        setImage(data);

        void uploadImage()
      })
    } catch (error) {
      // 
    }
  }

  const imageFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false
    });

    if (!result.canceled) {
      // const fileFetch = await fetch(result.assets[0].uri);
      // const file = await fileFetch.blob();

      const uri = result.assets[0]?.uri!;
      getBase64fromURI(uri);
    } else {
      alert('You did not select any image.');
    }
  };

  const captureImage = async () => {
    if (camera) {
      // @ts-ignore
      // console.log(camera.takePictureAsync)

      const data = await camera.takePictureAsync(null);
      getBase64fromURI(data.uri);
      setChooseImage(false);

      // uploadImage()
    }
  }

  if (!auth.klearkrishi) return <></>;

  if (chooseImage) return (
    <TouchableHighlight onPress={() => captureImage()} style={styles.container}>
      <Camera ref={(ref) => setCamera(ref)} style={styles.camera} type={CameraType.back}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} />
        </View>
      </Camera>
    </TouchableHighlight>
  )

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
          headerBackVisible: true,
          headerBackButtonMenuEnabled: true,
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
                    Create Item Listing
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />

      <TouchableOpacity className='flex flex-row items-center gap-2 rounded-md px-4'>
        <MoveLeft color="black" size={14} />
        <Text>Go Back</Text>
      </TouchableOpacity>

      {/* <Box alignItems="center" className='py-12'>
        <Box w="100%" maxWidth="300px">
          <FormControl isRequired>
            <NativeStack mx="4">
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" defaultValue="12345" placeholder="password" />
              <FormControl.HelperText>
                Must be atleast 6 characters.
              </FormControl.HelperText>
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Atleast 6 characters are required.
              </FormControl.ErrorMessage>
            </NativeStack>
          </FormControl>
        </Box>
      </Box> */}

      <ScrollView w="80%" className='mx-auto flex'>
        <NativeStack space={2.5} alignSelf="center" px="4" safeArea mt="4" w={{
          base: "100%",
          md: "25%"
        }}>
          <Box>
            <Text bold fontSize="xl" mb="4">
              Add a New Item Stock!
            </Text>
            <FormControl mb="5">
              <FormControl.Label>Waste Product</FormControl.Label>
              <Input placeholder='You are requested to click a photo of the waste.' isDisabled />
              <FormControl.HelperText>
                Required
              </FormControl.HelperText>
            </FormControl>
            <Divider />
          </Box>
          <Box>
            <FormControl mb="5">
              <FormControl.Label>Rate</FormControl.Label>
              <Input keyboardType="numeric" />
              <FormControl.HelperText>
                Price per unit quantity
              </FormControl.HelperText>
            </FormControl>
            <Divider />
          </Box>
          <Box>
            <FormControl mb="5">
              <FormControl.Label>Max. Quantity Purchasable</FormControl.Label>
              <Input />
            </FormControl>
          </Box>
          {!uploadingImage ? (
            <>
              <Button isLoading={chooseImage} onPress={() => {
                setChooseImage(true)
              }}>
                <View className='flex flex-row items-center gap-2 text-white'>
                  <CameraIcon color="white" />
                  <Text className='text-white'>Identify Waste via Camera</Text>
                </View>
              </Button>
              <Button variant="subtle" isLoading={chooseImage} onPress={() => {
                imageFromLibrary()
              }}>
                <View className='flex flex-row items-center gap-2 text-black'>
                  <CameraIcon color="black" />
                  <Text className='text-black'>Photo in Gallery</Text>
                </View>
              </Button>
            </>
          ) : (
            <Button isLoading disabled isLoadingText='Please wait...'>
              <View className='flex flex-row items-center gap-2 text-white'>
                <CameraIcon color="white" />
                <Text className='text-white'>Identify Waste via Camera</Text>
              </View>
            </Button>
          )}
        </NativeStack>
      </ScrollView>

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

      <Toast />
    </SafeAreaView >
  );
};


export default Home;
