import { View, Text, Image } from "react-native";
import Input from "@/components/input/Input";
import PrimaryButton from "@/components/button/PrimaryButton";
import Icons from "@/constants/Icons";
import index from '../index'
import { useSafeAreaInsets } from "react-native-safe-area-context";
const SignupScreen = () => {
        const insets = useSafeAreaInsets();
  
  return (
<View className="flex-1 bg-gray-200" style={{ paddingTop: insets.top }}>
<View>
            <View className="items-center mt-10 pt-3 ">
          <Image source={Icons.logo} className="w-58 h-58 " resizeMode="contain" />
      
            </View>
    </View>
    <View className="flex- bg-gray-200 px-6 py-8 items-center justify-between">
      {/* Input Fields */}
      <View className="flex justify-between w-full space-y-4">
        <Input iconName="user" placeholder="Enter full name" className="my-4" />
        <Input iconName="email" placeholder="Email" keyboardType="email-address" className="mb-4" />
        <Input iconName="phone" placeholder="Phone number" keyboardType="phone-pad" className="mb-4" />
        <Input iconName="lock" placeholder="Password" secureTextEntry className="bg-green-100 mb-3 border border-primary" />
        <Input iconName="lock" placeholder="Confirm Password" secureTextEntry className="bg-green-100 border border-primary" />
      </View>

      {/* Login Redirect */}
      <Text className="mt-4 text-gray-500">
        Already have an account? <Text 
                onPress={()=> {
                  // @ts-ignore
                  
                    router.push("")
                   } }
        className="text-secondary font-semibold">Login</Text>
      </Text>

      {/* Sign Up Button */}
      <PrimaryButton title="Sign up" onPress={() => console.log("Sign up pressed")} />
    </View>
</View>
  );
};

export default SignupScreen;
