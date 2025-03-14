import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
  FlatList
} from "react-native";
// import {  } from "react-native-gesture-handler"
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import PhoneSecurity from "@/assets/images/security.svg";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
// import {  } from "react-native-gesture-handler";
const AskUs = ({ visible, setClosed }: any) => {
  const user = useSelector((state: any) => state.login?.user);
  const insets = useSafeAreaInsets();
  const [isEnabled, setIsEnabled] = useState(true);
  const [notficationToggled, setNotificationToggled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };
  
  const handleSendMessage=()=>{
    setClosed(false)
  }
  return (
    <Modal
      animationType="slide"
      className="flex-1 "
      transparent
      visible={visible}
      onRequestClose={() => setClosed(false)}
    >
      <TouchableWithoutFeedback onPress={() => setClosed(false)}>
        <View
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          className="flex-1 flex flex-col justify-end w-[100%]"
        >
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View
              className="bg-white rounded-t-3xl  w-[100%] px-3 py-6 flex flex-col gap-y-2"
              style={{
                paddingVertical: insets.bottom + insets.top
              }}
            >
              <View className="flex w-[60%] justify-between flex-row items-center ">
                <TouchableOpacity
                  onPress={() => setClosed(false)}
                  className="flex flex-col w-10 h-10 rounded-full bg-dark_green items-center justify-center"
                >
                  <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Text className="font-bold text-lg">Ask Us</Text>
              </View>
              <View className="flex flex-col items-center">
                <TextInput className="bg-[#2B6128]/30 w-[80%]  max-h-40 px-3 items-start text-start justify-start rounded-xl h-20" multiline placeholder="Write your Question Here" placeholderTextColor='gray' />
                <TouchableOpacity onPress={()=>handleSendMessage()} className="bg-dark_green py-2 px-6 my-3 rounded-xl">
                    <Text className="text-white">Send </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AskUs;
