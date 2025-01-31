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
    const handleLogin = () => {
      // Perform authentication logic here
// @ts-ignore

      router.replace("(tabs)"); // Navigate to the tabs after login
    };
    const navigation = useNavigation();
  return (
<View className="flex-1 bg-white">
    <View>
    <Image source={Icons.logo} className="w-32 h-32 mb-6" resizeMode="contain" />
    <View className="w-full items-center mt-6">
        <View>
            <Text>LOG IN</Text>
        <Text className="mt-4 text-gray-500">
        Don't have account? <Text className="text-primary font-semibold">Sign UP</Text>
      </Text>
        </View>

      <View className="w-full flex-row justify-center space-x-4 mt-4">
        {/* Google Sign-In */}
        <View className="flex-row items-center bg-white px-4 py-3 rounded-lg shadow-md flex-1">
          <View>
          <Image source={Icons.google} className="w-6 h-6" resizeMode="contain" />
          </View>
          <Text className="ml-3 text-gray-700"> with Google</Text>
        </View>

        {/* Apple Sign-In */}
        <View className="flex-row items-center bg-white px-4 py-3 rounded-lg shadow-md flex-1">
        <Image source={Icons.apple}  className="w-6 h-6" resizeMode="contain" />
          <Text className="ml-3 text-gray-700">with Apple</Text>
        </View>
        
      </View>
    <Text className="text-gray-500 text-base">Or Log with email</Text>

    </View>
    </View>
    <View className="flex-1 bg-gray-200 px-6 py-10 items-center justify-center">
      <View className="w-full space-y-4">
        <Input iconName="user" placeholder="Email or phone number" />
        <Input iconName="lock" placeholder="Password" secureTextEntry className="bg-green-100 border border-primary" />
      </View>

      
      <Text className="mt-4 text-gray-500">
        Forgot Password? <Text className="text-primary font-semibold">Get Help</Text>
      </Text>

      {/* Sign Up Button */}
      <PrimaryButton title="Log In" 
// @ts-ignore
      onPress={()=> {
        router.push("/screen/HomeScreen")
// @ts-ignore
        // router.push("/(tabs)")

        // @ts-ignore
        // navigation.navigate("screen/homeScreen")

       } } />
    </View>
    <View>
    <Image source={Icons.finger} className="w-32 h-32 mb-6" resizeMode="contain" />

    </View>
    <View className="flex-row items-center mt-2">
      <Checkbox
        className="mr-2"
        value={isChecked}
        color={isChecked ? "#93BD68" : undefined} // Use green color when checked
        onValueChange={setChecked}
      />
      <Text className="text-gray-700">Terms of services Privacy Policy</Text>
    </View>
</View>
  );
};

export default LoginScreen;
