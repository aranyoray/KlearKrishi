/* eslint-disable no-else-return */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-template */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable global-require */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import * as Location from 'expo-location';
import { Redirect, Stack, useRootNavigationState, useRouter } from 'expo-router';
import { atom, useAtom } from 'jotai';
import _ from 'lodash'
// eslint-disable-next-line import/no-extraneous-dependencies
import { MoveRight, UserCheck } from 'lucide-react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Button, CheckIcon, Input, ScrollView, Select } from 'native-base';
import { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import { api, authAtom } from './_layout';

const locationAtom = atom<Location.LocationObject | null>(null);
const addressAtom = atom<string>("");

type ENUMModes = 'klearkrishi' | 'klearkeemat' | 'redirect' | 'redirect2'

const KlearKishi = ({
  setMode,
}: {
  setMode: React.Dispatch<React.SetStateAction<ENUMModes>>;
}) => {
  const [auth, setAuth] = useAtom(authAtom)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [location, setLocation] = useAtom(locationAtom);
  const [address, setAddress] = useAtom(addressAtom);

  const [fullName, setFullName] = useState<string>()
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const register = async () => {
    if (!fullName || !phoneNumber || !address) return Toast.show({
      text1: "Invalid Entry",
      text2: "Please enter one of the details required.",
      type: 'error'
    });

    setIsLoading(true)

    try {
      // eslint-disable-next-line no-useless-concat
      const data: AxiosResponse<{
        id: string;
        fullName: string;
        latitude: number | null;
        longitude: number | null;
        address: string | null;
        phoneNumber: string;
      }> = await axios.post(api + "/reg", {
        phoneNumber,
        fullName,
        address: location ? [location?.coords.latitude, location?.coords.longitude] : address,
      });



      setAuth({
        ...auth,
        'klearkrishi': data.data
      });

      setMode('redirect')

      return Toast.show({
        text1: "Successful Registration!",
        text2: "Please enter one of the details required.",
        type: 'error'
      });
    } catch (error) {
      console.log(error);
    }


  };

  const registerDebounced = _.debounce(register, 1000)

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
      }}
      className="h-full w-full"
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {/* <Welcome /> */}
      <ScrollView>
        <View className="my-auto flex flex-col items-center py-6">
          <Image source={require('../assets/icon.png')} className="h-32 w-32" />
          <Text
            className="mb-2 text-2xl font-bold tracking-widest text-[#00B601]"
            style={{
              fontFamily: 'Inter',
            }}
          >
            REGISTRATION
          </Text>
          {/* <Text
          className="text-md font-bold tracking-widest text-gray-600"
          style={{
            fontFamily: 'Inter',
          }}
        >
          KLEARKRISHI
        </Text> */}
          <Select
            minWidth="200"
            accessibilityLabel="KlearKishi"
            placeholder="KlearKrishi"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            defaultValue="KlearKrishi"
            onValueChange={(itemValue: any) => setMode(itemValue)}
          >
            <Select.Item
              label="🌿 KlearKrishi (for Farmers)"
              value="klearkrishi"
            />
            <Select.Item
              label="💴 KlearKeemat (for Purchasers)"
              value="klearkeemat"
            />
          </Select>

          <View className="mx-auto mt-12 flex w-2/3 flex-col items-center">
            <Text className="mb-2 self-start font-bold text-[#00B601]">
              Legal Full Name
            </Text>
            <Input
              size="lg"
              className=" bg-gray-100"
              ml={-2}
              rounded="full"
              onChangeText={(text) => setFullName(text)}
              px-4
              py={3}
            />
          </View>
          <View className="mx-auto mt-6 flex w-2/3 flex-col items-center">
            <Text className="mb-2 self-start font-bold text-[#00B601]">
              Phone Number
            </Text>
            <Input
              size="lg"
              className=" bg-gray-100"
              ml={-2}
              keyboardType='numeric'
              onChangeText={(text) => setPhoneNumber(text)}
              rounded="full"
              px-4
              py={3}
            />
          </View>
          <View className="mx-auto mt-6 flex w-2/3 flex-col items-center">
            <Text className="mb-2 self-start font-bold text-[#00B601]">
              Address
            </Text>
            <Input
              size="lg"
              className=" bg-gray-100"
              ml={-2}
              rounded="full"
              px-4
              // isDisabled={address !== null}
              onChangeText={(e) => setAddress(e)}
              value={address}
              // placeholder={address}
              py={3}
            />
          </View>

          <Button isLoading={isLoading} onPress={registerDebounced} size="md" className="mt-8" backgroundColor="amber.500">
            <View className="flex flex-row items-center gap-3">
              <UserCheck color="white" />
              <Text
                style={{
                  fontFamily: 'Product Sans',
                }}
                className="text-white"
              >
                REGISTER
              </Text>
            </View>
          </Button>

          <TouchableOpacity className="flex flex-row items-center gap-2 pt-6 text-blue-500">
            <Text className="text-xs">
              or if you are already registered, click here
            </Text>
            <MoveRight color="blue" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Toast />
    </SafeAreaView>
  );
};

const KlearKeemat = ({
  setMode,
}: {
  setMode: React.Dispatch<React.SetStateAction<ENUMModes>>;
}) => {
  const [auth, setAuth] = useAtom(authAtom)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [location, setLocation] = useAtom(locationAtom);
  const [address, setAddress] = useAtom(addressAtom);

  const [fullName, setFullName] = useState<string>()
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const register = async () => {
    if (!fullName || !phoneNumber || !address) return Toast.show({
      text1: "Invalid Entry",
      text2: "Please enter one of the details required.",
      type: 'error'
    });

    setIsLoading(true)

    try {
      // eslint-disable-next-line no-useless-concat
      const data: AxiosResponse<{
        id: string;
        fullName: string;
        latitude: number | null;
        longitude: number | null;
        address: string | null;
        phoneNumber: string;
      }> = await axios.post(api + "/reg/buyer", {
        phoneNumber,
        fullName,
        address: location ? [location?.coords.latitude, location?.coords.longitude] : address,
      });

      setAuth({
        ...auth,
        'klearkeemat': data.data
      });

      setMode('redirect2')

      return Toast.show({
        text1: "Successful Registration!",
        text2: "Please enter one of the details required.",
        type: 'error'
      });
    } catch (error) {
      console.log(error);
    }


  };

  const registerDebounced = _.debounce(register, 1000)

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
      }}
      className="h-full w-full"
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {/* <Welcome /> */}
      <ScrollView>
        <View className="my-auto flex flex-col items-center py-6">
          <Image source={require('../assets/icon.png')} className="h-32 w-32" />
          <Text
            className="mb-2 text-2xl font-bold tracking-widest text-[#00B601]"
            style={{
              fontFamily: 'Inter',
            }}
          >
            REGISTRATION
          </Text>
          {/* <Text
          className="text-md font-bold tracking-widest text-gray-600"
          style={{
            fontFamily: 'Inter',
          }}
        >
          KLEARKRISHI
        </Text> */}
          <Select
            minWidth="200"
            accessibilityLabel="KlearKeemat"
            placeholder="KlearKeemat"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue: any) => setMode(itemValue)}
          >
            <Select.Item
              label="🌿 KlearKrishi (for Farmers)"
              value="klearkrishi"
            />
            <Select.Item
              label="💴 KlearKeemat (for Purchasers)"
              value="klearkeemat"
            />
          </Select>

          <View className="mx-auto mt-12 flex w-2/3 flex-col items-center">
            <Text className="mb-2 self-start font-bold text-[#00B601]">
              Legal Full Name
            </Text>
            <Input
              size="lg"
              className=" bg-gray-100"
              ml={-2}
              rounded="full"
              onChangeText={(text) => setFullName(text)}
              px-4
              py={3}
            />
          </View>
          <View className="mx-auto mt-6 flex w-2/3 flex-col items-center">
            <Text className="mb-2 self-start font-bold text-[#00B601]">
              Phone Number
            </Text>
            <Input
              size="lg"
              className=" bg-gray-100"
              ml={-2}
              keyboardType='numeric'
              onChangeText={(text) => setPhoneNumber(text)}
              rounded="full"
              px-4
              py={3}
            />
          </View>
          <View className="mx-auto mt-6 flex w-2/3 flex-col items-center">
            <Text className="mb-2 self-start font-bold text-[#00B601]">
              Address
            </Text>
            <Input
              size="lg"
              className=" bg-gray-100"
              ml={-2}
              rounded="full"
              px-4
              // isDisabled={address !== null}
              onChangeText={(e) => setAddress(e)}
              value={address}
              // placeholder={address}
              py={3}
            />
          </View>

          <Button isLoading={isLoading} onPress={registerDebounced} size="md" className="mt-8" backgroundColor="amber.500">
            <View className="flex flex-row items-center gap-3">
              <UserCheck color="white" />
              <Text
                style={{
                  fontFamily: 'Product Sans',
                }}
                className="text-white"
              >
                REGISTER
              </Text>
            </View>
          </Button>

          <TouchableOpacity className="flex flex-row items-center gap-2 pt-6 text-blue-500">
            <Text className="text-xs">
              or if you are already registered, click here
            </Text>
            <MoveRight color="blue" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Toast />
    </SafeAreaView>
  );
};

const Home = () => {
  const [location, setLocation] = useAtom(locationAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const [auth] = useAtom(authAtom)
  const router = useRouter()
  const rootNavigationState = useRootNavigationState();

  const [mode, setMode] = useState<ENUMModes>(
    'klearkrishi',
  );

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        return;
      }

      const getLocation = await Location.getCurrentPositionAsync({
        accuracy: 6,
      });
      setLocation(getLocation);

      const req = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${getLocation.coords.latitude}&lon=${getLocation.coords.longitude}&apiKey=e72041fa3aa5434185a0175662f0df7f`,
      );

      // console.log(req.data);
      setAddress(`${req.data.features[0].properties.city}, ${req.data.features[0].properties.state}, ${req.data.features[0].properties.postcode}`)
    })();
  }, [auth]);

  if (!rootNavigationState?.key || !location) return null;

  if (mode == 'klearkrishi') {
    return <KlearKishi setMode={setMode} />;
  } else if (mode == 'klearkeemat') {
    return <KlearKeemat setMode={setMode} />
  } else if (mode == 'redirect') {
    return <Redirect href="/klearkrishi/home" />
  } else return <Redirect href="/klearkeemat/home" />

};
export default Home;
