import {
  View,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { useEffect } from "react";
import Input from "@/components/input/Input";
import PrimaryButton from "@/components/button/PrimaryButton";
import Icons from "@/constants/Icons";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { useNavigation, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store";
import { getProfile, loginUser } from "./store/slice/LoginSlice";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [isChecked, setChecked] = useState(false);
  const [phone_number, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const insets = useSafeAreaInsets();
  const loading = useSelector((state: any) => state?.login?.loading);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const LocalAuthenticating = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    try {
      const supported = await LocalAuthentication.hasHardwareAsync();
      if (!supported) {
        console.log("Local authentication is not supported on this device");
        return;
      }

      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        console.log("No biometric authentication methods are enrolled");
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Unlock your app"
      });

      if (result.success) {
        const result = await dispatch(getProfile());
        if (getProfile.rejected.match(result)) {
          Alert.alert(
            "Login Authenticate you Please use phone number and your password"
          );

          return;
        }
        if (getProfile.fulfilled.match(result)) {
          // AsyncStorage.setItem("accessToken", result?.payload?.access_token);
          router.push("/(tabs)/home");
        }
      } else {
        console.log("Authentication failed!");
      }
    } catch (e) {
      console.error("Error performing local authentication: ", e);
    }
  };
  useEffect(() => {
    LocalAuthenticating();
  }, []);
  const LoginFunctionality = async () => {
    if (!isChecked) {
      return Alert.alert(
        "Terms and Condition", // Title of the alert
        "Please agree to the terms and conditions",
        [
          { text: "Cancel", onPress: () => setChecked(false) },
          { text: "OK", onPress: () => setChecked(true) }
        ]
      );
    }
    try {
      const result: any = await dispatch(
        loginUser({ phone_number: phone_number, password: password })
      );
      console.log(result);
      if (loginUser.rejected.match(result)) {
        Alert.alert(
          "Login Failed",
          result?.payload?.error || "Failed to logs you in "
        );
        return;
      }
      router.push("/(tabs)/home");
      // console.log(await result)
    } catch (error: any) {
      console.log(error);
      Alert.alert("Login Failed", error.message);
    }
  };
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: isKeyboardVisible ? { display: "none" } : undefined
    });
  }, [isKeyboardVisible, navigation]);

  return (
    <ScrollView className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View>
        <View className="items-center mt-10 ">
          <Image
            source={Icons.logo}
            className="w-58 h-58 "
            resizeMode="contain"
          />
        </View>
        <View className="w-full items-center ">
          <View className="items-center">
            <Text className=" text-2xl font-bold">LOG IN</Text>

            <Text className="mt-4 text-gray-500">
              Don't have account?{" "}
              <Text
                onPress={() => {
                  // @ts-ignore

                  router.push("screen/SignUpScreen");
                }}
                className="text-secondary font-semibold"
              >
                Sign UP
              </Text>
            </Text>
          </View>
        </View>

        <View className=" flex-row items-center justify-between p-6">
          {/* Google Sign-In */}
          <TouchableOpacity
            onPress={() => Alert.alert("Coming Soon")}
            className="flex-row items-center bg-white px-2 py-3 rounded-md border border-black  px-4 "
          >
            <View>
              <Image source={Icons.google} resizeMode="contain" />
            </View>
            <Text className=" px-4 text-gray-500"> with Google</Text>
          </TouchableOpacity>

          {/* Apple Sign-In */}
          <TouchableOpacity
            onPress={() => Alert.alert("Coming Soon")}
            className="flex-row items-center bg-white pr-6 px-4 py-3 rounded-md border border-black shadow-md "
          >
            <Image source={Icons.apple} resizeMode="contain" />
            <Text className="px-4 text-gray-500">with Apple</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center  px-6">
          <View className="flex-1 h-[1px] bg-gray-400" />
          <Text className="text-gray-400 text-base mx-2">
            or Log with email
          </Text>
          <View className="flex-1 h-[1px] bg-gray-400" />
        </View>
      </View>
      <View className="bg-white px-6 py-4 ">
        <View className="space-y-4 items-center">
          {loading && (
            <ActivityIndicator size="large" collapsable color="#93BD68" />
          )}
          <Input
            iconName="user"
            value={phone_number}
            onChangeValue={(text: string) => setPhoneNumber(text)}
            placeholder="Email or phone number"
            className="bg-black border border-gray-200 my-4"
          />
          <Input
            value={password}
            onChangeValue={(text: string) => setPassword(text)}
            iconName="lock"
            placeholder="Password"
            secureTextEntry
            className="bg-green-100 border border-primary"
          />
        </View>

        <View className="items-center">
          <Text className="mt-4 text-gray-500">
            Forgot Password?{" "}
            <Text className="text-secondary font-semibold">Get Help</Text>
          </Text>

          {/* Sign Up Button */}
          <PrimaryButton title="Log In" onPress={() => LoginFunctionality()} />
        </View>
      </View>
      <View className="items-center ">
        <TouchableOpacity onPress={() => LocalAuthenticating()}>
          <Image
            source={Icons.finger}
            className="w-16 h-16 mb-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View className="flex-row items-center mt-1">
          <Checkbox
            className="mr-2"
            value={isChecked}
            color={isChecked ? "#93BD68" : undefined}
            onValueChange={setChecked}
          />
          <Text className="text-gray-700">
            Terms of services Privacy Policy
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
