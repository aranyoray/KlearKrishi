/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable global-require */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import { Stack } from 'expo-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MoveRight, UserCheck } from 'lucide-react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Button, Input } from 'native-base';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Home = () => (
  <SafeAreaView
    style={{
      backgroundColor: 'white',
    }}
    className="h-full w-full"
  >
    <Stack.Screen
      options={{
        headerShown: false,
        headerTitle(props) {
          return (
            // <View
            //   className="ga-2 flex flex-row items-center gap-2 px-2"
            //   style={{
            //     alignItems: 'center',
            //   }}
            // >
            //   <Image
            //     source={require('../assets/icon.png')}
            //     className="h-12 w-12"
            //   />
            //   <Text
            //     className="text-xl"
            //     style={{
            //       fontFamily: 'Product Sans',
            //     }}
            //   >
            //     KlearKrishi
            //   </Text>
            // </View>
            <></>
          );
        },
      }}
    />
    {/* <Welcome /> */}
    <View className="my-auto flex flex-col items-center">
      <Image source={require('../assets/icon.png')} className="h-32 w-32" />
      <Text
        className="text-2xl font-bold tracking-widest text-[#00B601]"
        style={{
          fontFamily: 'Inter',
        }}
      >
        REGISTRATION
      </Text>
      <Text
        className="text-md font-bold tracking-widest text-gray-600"
        style={{
          fontFamily: 'Inter',
        }}
      >
        KLEARKRISHI
      </Text>

      <View className="mx-auto mt-12 flex w-2/3 flex-col items-center">
        <Text className="mb-2 self-start font-bold text-[#00B601]">
          Full Name
        </Text>
        <Input
          size="lg"
          className=" bg-gray-100"
          ml={-2}
          rounded="full"
          px-4
          py={3}
        />
      </View>
      <View className="mx-auto mt-6 flex w-2/3 flex-col items-center">
        <Text className="mb-2 self-start font-bold text-[#00B601]">
          Full Name
        </Text>
        <Input
          size="lg"
          className=" bg-gray-100"
          ml={-2}
          rounded="full"
          px-4
          py={3}
        />
      </View>
      <View className="mx-auto mt-6 flex w-2/3 flex-col items-center">
        <Text className="mb-2 self-start font-bold text-[#00B601]">
          Full Name
        </Text>
        <Input
          size="lg"
          className=" bg-gray-100"
          ml={-2}
          rounded="full"
          px-4
          py={3}
        />
      </View>
      <View className="mx-auto mt-6 flex w-2/3 flex-col items-center">
        <Text className="mb-2 self-start font-bold text-[#00B601]">
          Full Name
        </Text>
        <Input
          size="lg"
          className=" bg-gray-100"
          ml={-2}
          rounded="full"
          px-4
          py={3}
        />
      </View>

      <Button size="md" className="mt-8" backgroundColor="amber.500">
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
  </SafeAreaView>
);

export default Home;
