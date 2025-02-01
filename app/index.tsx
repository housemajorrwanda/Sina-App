import { View, Text, Image } from "react-native";
import Input from "@/components/input/Input";
import PrimaryButton from "@/components/button/PrimaryButton";
import Icons from "@/constants/Icons";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { useNavigation, useRouter } from "expo-router";

const LoginScreen = () => {
    const [isChecked, setChecked] = useState(false);
    const router =useRouter()
    const SignUp = () => {
     
      // @ts-ignore
      router.replace("screen/SignUpScreen"); 
    };
    const navigation = useNavigation();
  return (
<View className="flex-1 bg-white">
    <View>
      <View className="items-center mt-10 ">
    <Image source={Icons.logo} className="w-64 h-64 " resizeMode="contain" />

      </View>
    <View className="w-full items-center ">
        <View className="items-center">
            <Text className=" text-2xl font-bold">LOG IN</Text>
        <Text className="mt-4 text-gray-500">
        Don't have account? <Text className="text-primary font-semibold">Sign UP</Text>
      </Text>
        </View>

      <View className=" flex-row  justify-between px-6">
        {/* Google Sign-In */}
        <View className="flex-row items-center bg-white px-2 py-3 rounded-md border border-black shadow-md flex-1">
          <View >
          <Image source={Icons.google} className="w-6 h-6" resizeMode="contain" />
          </View>
          <Text className="ml-3 text-gray-500"> with Google</Text>
        </View>

        {/* Apple Sign-In */}
        <View className="flex-row items-center bg-white px-2 py-3 rounded-md border border-black shadow-md flex-1">

        <Image source={Icons.apple}  className="w-6 h-6" resizeMode="contain" />
          <Text className="ml-3 text-gray-500">with Apple</Text>
        </View>
        
      </View>
    <View className="flex-row items-center my-4">
      <View className="flex-1 h-[1px] bg-gray-400" />
      <Text className="text-gray-400 text-base mx-2">or Log with email</Text>
      <View className="flex-1 h-[1px] bg-gray-400" />
    </View>
    </View>
    </View>
    <View className="flex-1 bg-white px-6 py-4 ">
      <View >
        <Input iconName="user" placeholder="Email or phone number" className="bg-green-100 border border-gray-200" />
        <Input iconName="lock" placeholder="Password" secureTextEntry className="bg-green-100 border border-primary" />
      </View>

      

       <View className="items-center">
       <Text className="mt-4 text-gray-500">
        Forgot Password? <Text className="text-primary font-semibold">Get Help</Text>
      </Text>

      {/* Sign Up Button */}
      <PrimaryButton title="Log In" 

      onPress={()=> {
        router.push("/(tabs)/home")
       } } />
       </View>
    </View>
    <View className="items-center ">
    <Image source={Icons.finger} className="w-16 h-16 mb-6" resizeMode="contain" />
    <View className="flex-row items-center mt-1">
      <Checkbox
        className="mr-2"
        value={isChecked}
        color={isChecked ? "#93BD68" : undefined} 
        onValueChange={setChecked}
      />
      <Text className="text-gray-700">Terms of services Privacy Policy</Text>
    </View>
    </View>

</View>
  );
};

export default LoginScreen;
