import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  TextInput,
  Touchable,
  Alert
} from "react-native";
// import {  } from "react-native-gesture-handler"
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { CountryPicker } from "react-native-country-codes-picker";
// import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { updateProfilePartial } from "@/app/store/slice/LoginSlice";
import { UseDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import Spinner from "react-native-loading-spinner-overlay";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { DatePickerModal } from "react-native-paper-dates";
// import "react-native-paper-dates/locale/en"; // Ensure you set the correct locale

const PersonalInformation = ({ visible, setClosed }: any) => {
  const user = useSelector((state: any) => state.login?.user);
  const [birthDate, setBirtDate] = useState<Date>(new Date());
  const [chooseDate, setchooseDate] = useState(false);
  const [chooseCountry, setChooseCountry] = useState(false);
  const [country, setCountry] = useState(null);
  const insets = useSafeAreaInsets();
  const [name, setName] = useState(user?.user_data?.full_name);
  const [alternate_name, setAlternateName] = useState(
    user?.user_data?.alternate_name
  );
  const [image, setImage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  //Saving Updated Record
  const handlePartialUpdate = async () => {
    setLoading(true);
    const profileData: any = {};
    if (name !== user?.user_data?.full_name) profileData.full_name = name;
    if (alternate_name !== user?.user_data?.alternate_name)
      profileData.alternate_name = alternate_name;
    if (country !== user?.user_data?.country) profileData.country = country;

    if (image)
      profileData.profile = {
        uri: image,
        type: "image/jpeg",
        name: user?.user_data?.phone_number
      };
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

      Alert.alert("Failed to Update Profile", errorMessage);
      setLoading(false);
    }
  };
  const handleConfirm = (date: any) => {
    setBirtDate(date);
    setchooseDate(false);
  };
  const hideDatePicker = () => {
    setchooseDate(false);
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
          className="flex-1 flex flex-col justify-end"
        >
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View
              className="bg-white rounded-t-3xl py-6 px-4 flex flex-col gap-y-2"
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
              <View className="flex flex-col items-center  justify-center">
                <TouchableOpacity
                  onPress={() => pickImage()}
                  className="flex flex-col items-center"
                >
                  <Image
                    source={{ uri: image ? image : user?.user_data?.profile }}
                    className="w-20 h-20 rounded-full border border-third"
                  />
                  <Text>Edit Photo</Text>
                </TouchableOpacity>
                <View className="flex flex-col items-start gap-y-2 py-2 w-[100%] pb-12">
                  <TextInput
                    className="border-b border-dark_green py-2 px-2 w-[90%] mx-auto text-zinc-900"
                    value={name}
                    onChangeText={(e) => setName(e)}
                    placeholderTextColor="gray"
                    placeholder={user?.user_data?.full_name || "Edit Name"}
                  />
                  <TextInput
                    className="border-b border-dark_green py-2 px-2 w-[90%] mx-auto text-zinc-900"
                    placeholderTextColor="gray"
                    value={alternate_name}
                    onChangeText={(e) => setAlternateName(e)}
                    placeholder={
                      user?.user_data?.alternate_name ||
                      "Add alternative person's name"
                    }
                  />
                  <View className="flex flex-row items-center justify-center mx-auto w-[90%] gap-x-2">
                    <TouchableOpacity
                      onPress={() => setchooseDate(!chooseDate)}
                      className="border-b border-dark_green py-2 px-2 w-[45%]  mx-auto text-zinc-900"
                    >
                      <Text>
                        {user?.user_data?.full_name ||
                          birthDate.toDateString() ||
                          "Choose Date"}
                      </Text>
                    </TouchableOpacity>

                    <DateTimePickerModal
                      isVisible={chooseDate}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                    {/* <DatePickerModal
        locale="en"
        mode="single"
        visible={chooseDate}
        onDismiss={() => setchooseDate(false)}
        date={birthDate}
        onConfirm={(params:any) => {
          setBirtDate(params.date);
          setchooseDate(false);
        }}
      /> */}

                    <TouchableOpacity
                      onPress={() => setChooseCountry(!chooseCountry)}
                      className="border-b border-dark_green py-2 px-2 w-[45%]  mx-auto text-zinc-900"
                    >
                      <Text>
                        {user?.user_data?.country || country || "Country "}
                      </Text>
                    </TouchableOpacity>
                    <CountryPicker
                      lang="en"
                      show={chooseCountry}
                      // when picker button press you will get the country object with dial code
                      pickerButtonOnPress={(item: any) => {
                        console.log(item);
                        setCountry(item.name?.en);
                        setChooseCountry(false);
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => handlePartialUpdate()}
                    className="w-[90%] mx-auto my-2 bg-dark_green rounded-full py-2 flex flex-col items-center justify-center"
                  >
                    <Text className="text-white font-bold text-lg">
                      Save Changes
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PersonalInformation;
