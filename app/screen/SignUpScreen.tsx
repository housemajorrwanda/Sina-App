import { View, Text, Image, ActivityIndicator, Alert, ScrollView } from "react-native";
import Input from "@/components/input/Input";
import PrimaryButton from "@/components/button/PrimaryButton";
import Icons from "@/constants/Icons";
import index from "../index";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { RegisterUser } from "../store/slice/LoginSlice";
import { useRouter } from "expo-router";
const SignupScreen = () => {
  const insets = useSafeAreaInsets();
  const [full_name, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone_number, setPhonenumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const router=useRouter();
  const loading = useSelector((state: any) => state?.login?.loading);
  const handleRegister = async () => {
    if (
      !full_name ||
      !email ||
      !phone_number ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const result = await dispatch(
        RegisterUser({ full_name, email, phone_number, password })
      );
      
      if (RegisterUser.rejected.match(result)) {
        let errorMessage = "An unknown error occurred";

        if (result?.payload?.error) {
          errorMessage = Array.isArray(result?.payload?.error)
            ? result?.payload?.error.join("\n") // Join multiple error messages
            : result?.payload?.error; // Single error message
        }

        return Alert.alert("Register Failed", errorMessage);
      }
      router.push("")
    } catch (error) {
      console.log(error);
    }
    
  };
  return (
    <ScrollView className="flex-1 bg-gray-200" style={{ paddingTop: insets.top }}>
      <View>
        <View className="items-center mt-10 pt-3 ">
          <Image
            source={Icons.logo}
            className="w-58 h-58 "
            resizeMode="contain"
          />
        </View>
      </View>
      <View className="flex- bg-gray-200 px-6 py-8 items-center justify-between">
        {/* Input Fields */}
        <View className="flex justify-between w-full space-y-4">
          <Input
            value={full_name}
            onChangeValue={(text: string) => setFullName(text)}
            iconName="user"
            placeholder="Enter full name"
            className="my-4"
          />
          <Input
            value={email}
            onChangeValue={(text: string) => setEmail(text)}
            iconName="email"
            placeholder="Email"
            keyboardType="email-address"
            className="mb-4"
          />
          <Input
            value={phone_number}
            onChangeValue={(text: string) => setPhonenumber(text)}
            iconName="phone"
            placeholder="Phone number"
            keyboardType="phone-pad"
            className="mb-4"
          />
          <Input
            value={password}
            onChangeValue={(text: string) => setPassword(text)}
            iconName="lock"
            placeholder="Password"
            secureTextEntry
            className="bg-green-100 mb-3 border border-primary"
          />
          <Input
            value={confirmPassword}
            onChangeValue={(text: string) => setConfirmPassword(text)}
            iconName="lock"
            placeholder="Confirm Password"
            secureTextEntry
            className="bg-green-100 border border-primary"
          />
        </View>
        {loading && (
          <ActivityIndicator size="large" collapsable color="#93BD68" />
        )}
        {/* Login Redirect */}
        <Text className="mt-4 text-gray-500">
          Already have an account?{" "}
          <Text
            onPress={() => {
              // @ts-ignore

              router.push("");
            }}
            className="text-secondary font-semibold"
          >
            Login
          </Text>
        </Text>

        {/* Sign Up Button */}
        <PrimaryButton title="Sign up" onPress={() => handleRegister()} />
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
