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
  const AccountRecovery = ({ visible, setClosed }: any) => {
    const user = useSelector((state: any) => state.login?.user);
    const insets = useSafeAreaInsets();
    const [recovery_email, setEmailRecovery] = useState(false);
    const [two_factor, setTwoFactor] = useState(false);
    const [securityQuestion, setSeurityQuestion] = useState(false);
    const [notficationToggled, setNotificationToggled] = useState(false);
    const toggleSwitch = () => {
      setEmailRecovery(!recovery_email);
    };
    const toggleSecuritySwitch = () => {
      setSeurityQuestion(!securityQuestion);
    };
    const toggleTwoFactorSwitch = () => {
      setTwoFactor(!two_factor);
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
            className="flex-1 flex flex-col justify-end w-[100%] "
          >
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View
                className="bg-white rounded-t-3xl  w-[100%] px-3 py-12 pb-20 flex flex-col gap-y-2"
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
                <View className="flex flex-col w-[90%] items-center justify-center py-6 mx-auto">
                    <Text className="text-xl ">Account Recovery</Text>
                </View>
                <View className="flex flex-col gap-y-3 ">
                  <View className="flex flex-row justify-between items-center w-[90%] mx-auto">
                    <View className="flex flex-col  items-start">
                      <Text className="text-lg">
                        Add Recovery Email
                      </Text>
                    </View>
                    <Switch
                      trackColor={{ false: "gray", true: "#2B6128" }}
                      thumbColor={recovery_email ? "#fff" : "#fff"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={recovery_email}
                      // style={{
                      //   width: 30,
                      //   height: 20
                      // }}
                    />
                  </View>
                  <View className="flex flex-row justify-between items-center w-[90%] mx-auto">
                    <View className="flex flex-col  items-start">
                      <Text className="text-lg">
                        Use Two-Factor Authentication
                      </Text>
                    </View>
                    <Switch
                      trackColor={{ false: "gray", true: "#2B6128" }}
                      thumbColor={two_factor ? "#fff" : "#fff"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleTwoFactorSwitch}
                      value={two_factor}
                      // style={{
                      //   width: 30,
                      //   height: 20
                      // }}
                    />
                  </View>
                  <View className="flex flex-row justify-between items-center w-[90%] mx-auto">
                    <View className="flex flex-col  items-start">
                      <Text className="text-lg">
                        Use Security Question
                      </Text>
                    </View>
                    <Switch
                      trackColor={{ false: "gray", true: "#2B6128" }}
                      thumbColor={securityQuestion ? "#fff" : "#fff"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSecuritySwitch}
                      value={securityQuestion}
                      // style={{
                      //   width: 30,
                      //   height: 20
                      // }}
                    />
                  </View>
                  
  
                  
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  
  export default AccountRecovery;
  