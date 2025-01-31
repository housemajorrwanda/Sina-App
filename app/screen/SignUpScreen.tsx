import { View, Text, Image } from "react-native";
import Input from "@/components/input/Input";
import PrimaryButton from "@/components/button/PrimaryButton";
import Icons from "@/constants/Icons";

const SignupScreen = () => {
  return (
<View className="flex-1 bg-white">
<View>
          <Image source={Icons.logo} className="w-32 h-32 mb-6" resizeMode="contain" />
      
    </View>
    <View className="flex-1 bg-gray-200 px-6 py-10 items-center justify-center">
      {/* Input Fields */}
      <View className="w-full space-y-4">
        <Input iconName="user" placeholder="Enter full name" />
        <Input iconName="email" placeholder="Email" keyboardType="email-address" />
        <Input iconName="phone" placeholder="Phone number" keyboardType="phone-pad" />
        <Input iconName="lock" placeholder="Password" secureTextEntry className="bg-green-100 border border-primary" />
        <Input iconName="lock" placeholder="Confirm Password" secureTextEntry className="bg-green-100 border border-primary" />
      </View>

      {/* Login Redirect */}
      <Text className="mt-4 text-gray-500">
        Already have an account? <Text className="text-primary font-semibold">Login</Text>
      </Text>

      {/* Sign Up Button */}
      <PrimaryButton title="Sign up" onPress={() => console.log("Sign up pressed")} />
    </View>
</View>
  );
};

export default SignupScreen;
