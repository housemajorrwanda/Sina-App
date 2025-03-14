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
    Linking,
    Alert
  } from "react-native";
  // import {  } from "react-native-gesture-handler"
  import { AntDesign } from "@expo/vector-icons";
  import { useSelector } from "react-redux";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  // import PhoneSecurity from "@/assets/images/security.svg";
  import { FontAwesome5 } from "@expo/vector-icons";
  import { useState } from "react";
  import Facebook from "@/assets/images/facebook1.svg"
  import Whatsapp from "@/assets/images/whatsapp1.svg"
  import Twitter from "@/assets/images/twitter1.svg"
  import Instagram from "@/assets/images/instagram1.svg"
  // import {  } from "react-native-gesture-handler";
  const SocialMedia = ({ visible, setClosed }: any) => {
    const user = useSelector((state: any) => state.login?.user);
    const insets = useSafeAreaInsets();
    const [isEnabled, setIsEnabled] = useState(true);
    const [notficationToggled, setNotificationToggled] = useState(false);
    const toggleSwitch = () => {
      setIsEnabled(!isEnabled);
    };
    const handleOpenTwitter=async()=>{
      await Linking.canOpenURL("https://x.com/sinarwanda?lang=en")?await Linking.openURL("https://x.com/sinarwanda?lang=en"):Alert.alert("Unable to open X")
    }
    const handleOpenInstagram=async()=>{
      await Linking.canOpenURL("https://www.instagram.com/nyirangarama/?igshid=vtgtdzzaw9ka")?await Linking.openURL("https://www.instagram.com/nyirangarama/?igshid=vtgtdzzaw9ka"):Alert.alert("Unable to open Instagram")
    }
    const handleOpenFacebook=async()=>{
      await Linking.canOpenURL("https://www.facebook.com/Nyirangarama")?await Linking.openURL("https://www.facebook.com/Nyirangarama"):Alert.alert("Unable to open Facebook")
    }
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
                <View className="flex flex-col w-[90%] mx-auto">
                    <Text className="text-center">Connect With Us Via</Text>
                    <View className="my-2" style={{
                    height:1,
                    width:"90%",
                    margin:"auto",
                    backgroundColor:"#2B6128"
                }} />
                <View className="flex flex-row py-3 items-center justify-between">
                    <TouchableOpacity onPress={()=>handleOpenInstagram()} className="flex flex-col items-center justify-center">
                        <Instagram />
                        <Text>Instagram</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Alert.alert("Coming Soon")} className="flex flex-col items-center justify-center">
                        <Whatsapp />
                        <Text>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleOpenTwitter()} className="flex flex-col items-center justify-center">
                        <Twitter />
                        <Text>X/Twitter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleOpenFacebook()} className="flex flex-col items-center justify-center">
                        <Facebook />
                        <Text>Facebook</Text>
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
  
  export default SocialMedia;
  