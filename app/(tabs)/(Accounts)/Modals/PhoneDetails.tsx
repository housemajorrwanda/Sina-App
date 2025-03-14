import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
  FlatList,
  Alert
  // Touchable
} from "react-native";
// import {  } from "react-native-gesture-handler"
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import PhoneSecurity from "@/assets/images/security.svg";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
// import CountryPicker from "react-native-country-picker-modal";
import { CountryPicker } from "react-native-country-codes-picker";
import { updateProfilePartial } from "@/app/store/slice/LoginSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import Spinner from "react-native-loading-spinner-overlay";
const PhoneDetails = ({ visible, setClosed }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: any) => state.login?.user);
  const insets = useSafeAreaInsets();
  const [isEnabled, setIsEnabled] = useState(true);
  const [countryCode, setCountryCode] = useState(null);
  const [chooseCountry, setChooseCountry] = useState(false);
  const [country, setCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(user?.user_data?.phone_number);
  const [alternativePhoneNumber, setAlternativePhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChangePhoneNumber = async () => {
    const profileData: any = {};
    if (phoneNumber !== user?.user_data?.phone_number) {
      profileData.phone_number = phoneNumber;
    }
    setLoading(true);
    const result: any = await dispatch(updateProfilePartial(profileData));
    if (updateProfilePartial.fulfilled.match(result)) {
      Alert.alert("Profile Updated");
      setClosed(false);
      setLoading(false);
    } else if (updateProfilePartial.rejected.match(result)) {
      console.log("Error Payload:", result.payload);

      // Type-check payload safely
      let errorMessage: any = "Something went wrong. Please try again.";

      if (result.payload && typeof result.payload === "object") {
        if ("details" in result.payload) {
          errorMessage = result.payload.details;
        } else if ("detail" in result.payload) {
          errorMessage = result.payload.detail;
        }
      } else if (typeof result.payload === "string") {
        errorMessage = result.payload;
      }

      Alert.alert("Failed to Update Profile", "Try another phone number");
      setLoading(false);
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
              className="bg-white rounded-t-3xl  w-[100%] px-3 py-12 flex flex-col gap-y-2"
              style={{
                paddingVertical: insets.bottom + insets.top
              }}
            >
              <View className="w-[90%] mx-auto flex gap-y-2 py-3 flex-col items-center">
                <Text className="font-bold text-lg">Change Phone Number</Text>
                <View className="flex flex-row items-center w-[90%] mx-auto justify-between gap-x-2">
                  <TouchableOpacity
                    onPress={() => setChooseCountry(!chooseCountry)}
                    className=" border-b border-b-dark_green flex flex-row gap-x-2 "
                  >
                    <Text>
                      {countryCode != null ? `${countryCode}` : "Country"}
                    </Text>
                    <FontAwesome5 name="chevron-down" size={17} color="gray" />
                  </TouchableOpacity>
                  <TextInput
                    className="flex-1 border-b border-dark_green"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                  />
                </View>

                <CountryPicker
                  lang="en"
                  show={chooseCountry}
                  // when picker button press you will get the country object with dial code
                  pickerButtonOnPress={(item: any) => {
                    setCountryCode(item.dial_code);
                    setChooseCountry(false);
                  }}
                />

                <Text className="font-bold text-lg">
                  Add Alternative Phone Number
                </Text>
                <View className="flex flex-row items-center w-[90%] mx-auto justify-between gap-x-2">
                  <TouchableOpacity
                    onPress={() => setChooseCountry(!chooseCountry)}
                    className="border-b border-b-dark_green flex flex-row gap-x-2 "
                  >
                    <Text>
                      {countryCode != null ? `${countryCode}` : "Country"}
                    </Text>
                    <FontAwesome5 name="chevron-down" size={17} color="gray" />
                  </TouchableOpacity>
                  <TextInput
                    className="flex-1 border-b border-dark_green"
                    placeholder="Phone number"
                    value={alternativePhoneNumber}
                    onChangeText={(text) => setAlternativePhoneNumber(text)}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handleChangePhoneNumber()}
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

export default PhoneDetails;
