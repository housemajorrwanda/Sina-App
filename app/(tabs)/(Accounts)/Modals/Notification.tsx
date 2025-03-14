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
const Notification = ({ visible, setClosed }: any) => {
  const user = useSelector((state: any) => state.login?.user);
  const insets = useSafeAreaInsets();
  const [isEnabled, setIsEnabled] = useState(true);
  const [notficationToggled, setNotificationToggled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };
  const notification_types = [
    "All",
    "Promotions",
    "Our Products",
    "Order Details"
  ];
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
              <TouchableOpacity
                onPress={() => setClosed(false)}
                className="flex flex-col w-10 h-10 rounded-full bg-dark_green items-center justify-center"
              >
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
              <View className="flex flex-col ">
                <View className="flex flex-row justify-between items-center w-[90%] mx-auto">
                  <View className="flex flex-col  items-start">
                    <Text className="font-bold text-lg">
                      Enable Notification
                    </Text>
                  </View>
                  <Switch
                    trackColor={{ false: "gray", true: "#2B6128" }}
                    thumbColor={isEnabled ? "#fff" : "#fff"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    // style={{
                    //   width: 30,
                    //   height: 20
                    // }}
                  />
                </View>

                <View className="flex flex-col mx-auto gap-y-2 py-2 w-[90%] my-2 pb-12">
                  <TouchableOpacity
                    onPress={() => setNotificationToggled(!notficationToggled)}
                    className="flex flex-row items-center justify-between w-[93%]"
                  >
                    <Text className="text-lg ml-2">
                      Notification Preferences
                    </Text>
                    {notficationToggled ? (
                      <FontAwesome5
                        name="chevron-down"
                        size={20}
                        color="black"
                      />
                    ) : (
                      <FontAwesome5
                        name="chevron-right"
                        size={20}
                        color="black"
                      />
                    )}
                  </TouchableOpacity>
                  {notficationToggled && (
                    <FlatList
                      className="self-end px-2 gap-y-2 bg-[#2B6128]/30 w-[39%] py-4 rounded-lg"
                      data={notification_types}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            onPress={() =>
                              setNotificationToggled(!notficationToggled)
                            }
                            className="mb-2 px-2"
                            key={index}
                          >
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  )}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Notification;
