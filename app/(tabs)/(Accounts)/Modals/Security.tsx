import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
  Dimensions,
  Alert
} from "react-native";
// import {  } from "react-native-gesture-handler"
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PhoneSecurity from "@/assets/images/security.svg";
import { AppDispatch } from "@/app/store";
import { useState } from "react";
import { changePassword } from "@/app/store/slice/LoginSlice";
import Spinner from "react-native-loading-spinner-overlay";
const Security = ({ visible, setClosed }: any) => {
  const user = useSelector((state: any) => state.login?.user);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const [isEnabled, setIsEnabled] = useState(true);
  const [old_password, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };
  const handleChangePassword = async () => {
    if (old_password === "" || password === "" || confirm_password === "")
      return Alert.alert("Please fill All fields");
    if (password !== confirm_password)
      return Alert.alert("Password and Confirm Password are not same");
    setLoading(true);
    const res = await dispatch(
      changePassword({ oldPassword: old_password, newPassword: password })
    );
    setLoading(false);
    if (changePassword.fulfilled.match(res))
      return Alert.alert("Password Changed Successfully");
    if (changePassword.rejected.match(res)) {
      let errorMessage: any = "Something went wrong. Please try again.";

      if (res.payload && typeof res.payload === "object") {
        if ("error" in res.payload) {
          errorMessage = res.payload.error;
        } else if ("detail" in res.payload) {
          errorMessage = res.payload.detail;
        }
      } else if (typeof res.payload === "string") {
        errorMessage = res.payload;
      }
      // console.log(res.payload?.error)
      return Alert.alert("Failed to Update Password", errorMessage);
    }
  };
  return (
    <Modal
      animationType="slide"
      className="flex-1 "
      transparent
      visible={visible}
      onRequestClose={() => setClosed(false)}
    >
      <Spinner
        visible={loading}
        color="green"
        size="large"
        textContent="Updating..."
      />
      <TouchableWithoutFeedback onPress={() => setClosed(false)}>
        <View
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          className="flex-1 flex flex-col justify-end w-[100%]"
        >
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View
              className="bg-white rounded-t-3xl  w-[100%] px-3 py-10 flex flex-col gap-y-2"
              style={{
                paddingVertical: insets.bottom + insets.top
              }}
            >
              <TouchableOpacity
                onPress={() => setClosed(false)}
                className="flex flex-col w-10 h-10 rounded-full bg-dark_green items-center justify-center"
              >
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
              <View className="flex flex-col ">
                <View className="flex flex-row justify-between items-center w-[90%] mx-auto my-2">
                  <TouchableOpacity className="flex flex-col items-center">
                    <PhoneSecurity />
                  </TouchableOpacity>
                  <View className="flex flex-col ml-2 w-[80%] items-start">
                    <Text className="font-bold text-lg">
                      Use Phone Security
                    </Text>
                    <Text>
                      This Allows to unlock and pay using phone's security
                      Password,fingerprint or face ID
                    </Text>
                  </View>
                  <Switch
                    trackColor={{ false: "gray", true: "#2B6128" }}
                    thumbColor={isEnabled ? "#fff" : "#fff"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    // style={{
                    //     width:Dimensions.get('screen').width * 0.2,
                    //     height:Dimensions.get('screen').width * 0.2
                    // }}
                  />
                </View>
                <View
                  className="my-2"
                  style={{
                    height: 1,
                    width: "90%",
                    margin: "auto",
                    backgroundColor: "#2B6128"
                  }}
                />
                <View className="flex flex-col items-start gap-y-2 py-2 mx-auto w-[90%] pb-12">
                  <Text className="font-bold text-zinc-600 text-lg">
                    Change Password
                  </Text>
                  <TextInput
                    className="border-b border-dark_green w-[100%] py-2 px-2  mx-auto text-zinc-900"
                    placeholderTextColor="gray"
                    placeholder="Old Password"
                    value={old_password}
                    onChangeText={(e) => setOldPassword(e)}
                  />
                  <TextInput
                    className="border-b border-dark_green w-[100%] py-2 px-2  mx-auto text-zinc-900"
                    placeholderTextColor="gray"
                    placeholder="Enter New Password"
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                  />
                  <TextInput
                    className="border-b border-dark_green w-[100%] py-2 px-2  mx-auto text-zinc-900"
                    placeholderTextColor="gray"
                    placeholder="Confirm New Password"
                    value={confirm_password}
                    onChangeText={(e) => setConfirmPassword(e)}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handleChangePassword()}
                  className="w-[90%] mx-auto my-2 bg-dark_green rounded-full py-2  flex flex-col items-center justify-center"
                >
                  <Text className="text-white font-bold text-lg">
                    Save Changes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Security;
