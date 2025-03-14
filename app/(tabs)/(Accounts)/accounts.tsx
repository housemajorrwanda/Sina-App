import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView
} from "react-native";
import { useState } from "react";
import {
  AntDesign,
  Entypo,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PersonalInformation from "./Modals/Personalnformation";
// @ts-ignore
import { useSelector } from "react-redux";
import Security from "./Modals/Security";
import Notification from "./Modals/Notification";
import SocialMedia from "./Modals/SocialMedia";
import AskUs from "./Modals/Askus";
import PhoneDetails from "./Modals/PhoneDetails";
// import Student from "../../../assets/images/student.webp";

const SettingsScreen = () => {
  const user=useSelector((state:any)=>state.login?.user)
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [personalInformationVisible, setPersonalInformationVisible] = useState(false);
  const [security, setSecurity] = useState(false);
  const [notification, setNotification] = useState(false);
  const [socialMedia, setSocialMedia] = useState(false);
  const [askUs, setAskUs] = useState(false);
  const [phoneDetails, setPhoneDetails] = useState(false);
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-secondary" style={{ paddingTop: insets.top }}>
      <PersonalInformation visible={personalInformationVisible} setClosed={(e:boolean) => setPersonalInformationVisible(e)} />
      <Security visible={security} setClosed={(e:boolean) => setSecurity(e)} />
      <Notification visible={notification} setClosed={(e:boolean) => setNotification(e)} />
      <SocialMedia visible={socialMedia} setClosed={(e:boolean) => setSocialMedia(e)} />
      <AskUs visible={askUs} setClosed={(e:boolean) => setAskUs(e)} />
      <PhoneDetails visible={phoneDetails} setClosed={(e:boolean) => setPhoneDetails(e)} />
      <ScrollView
        scrollEnabled
        className="flex-1 "
        
        contentContainerStyle={{
          flexGrow: 1,
          // flex:1
        }}
      >
        {/* Header */}
        <View className="flex-1">
          <View className="bg-secondary p-6  items-center">
            <View className="flex-row w-full justify-between items-center mb-4">
              <TouchableOpacity className="bg-white p-2 rounded-full">
                <FontAwesome6 name="sliders" size={24} color="#2B6128" />
              </TouchableOpacity>

              {/* <Ionicons name="notifications-circle" size={24} color="white" /> */}
              <TouchableOpacity className="bg-white p-2 rounded-full">
                <Ionicons name="notifications" size={24} color="#2B6128" />
              </TouchableOpacity>
            </View>
            <View className="flex-row  justify-between">
              <Image source={{uri:user?.user_data?.profile}} className="w-20 h-20  border border-third rounded-full " />
              <View className="items-center">
                <Text className="text-lg text-white font-bold mt-2">
                  {user?.user_data?.full_name || 'Add Full Names'}
                </Text>
                <Text className="text-white text-sm">{user?.user_data?.email || 'Add Email'}</Text>
                <Text className="text-white text-sm">{user?.user_data?.phone_number ?? 'Add Phone Number'}</Text>
              </View>
            </View>
          </View>

          {/* Account Settings */}
          <View className=" flex-1 bg-white p-6 rounded-t-3xl">
            <View className=" p-6 rounded-t-3xl bg-white">
              <Text className="text-gray-700 font-bold py-2 border-b border-secondary">
                Account Settings
              </Text>

              <TouchableOpacity onPress={()=>setPersonalInformationVisible(!personalInformationVisible)} className="flex-row items-center pb-3 justify-between">
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name="account"
                    size={24}
                    color="#2B6128"
                  />
                  <Text className="ml-4 text-gray-700">
                    Personal Information
                  </Text>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="#2B6128k"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>setSecurity(!security)} className="flex-row items-center py-3 justify-between">
                <View className="flex-row items-center">
                  <MaterialIcons
                    name="verified-user"
                    size={24}
                    color="#2B6128"
                  />
                  <Text className="ml-4 text-gray-700">
                    Password & Security
                  </Text>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="#2B6128k"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>setNotification(!notification)} className="flex-row items-center pt-3 justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="notifications" size={24} color="#2B6128" />
                  <Text className="ml-4 text-gray-700">
                    Notification Preference
                  </Text>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="#2B6128k"
                />
              </TouchableOpacity>
            </View>

            {/* Contact Settings */}
            <View className="px-6 bg-white">
              <Text className="text-gray-700 font-bold pb-2  border-b border-secondary">
                Contact Settings
              </Text>

              <TouchableOpacity onPress={()=>setSocialMedia(!socialMedia)} className="flex-row items-center py-3 justify-between">
                <View className="flex-row items-center">
                  <AntDesign name="instagram" size={24} color="#2B6128" />
                  <Text className="ml-4 text-gray-700">Social Media</Text>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="#2B6128k"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>setPhoneDetails(!phoneDetails)} className="flex-row items-center py-3 justify-between">
                <View className="flex-row items-center">
                  <SimpleLineIcons
                    name="screen-smartphone"
                    size={24}
                    color="#2B6128"
                  />
                  <Text className="ml-4 text-gray-700">Phone Details</Text>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="#2B6128k"
                />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center py-3 justify-between">
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name="email-open"
                    size={24}
                    color="#2B6128"
                  />
                  <Text className="ml-4 text-gray-700">Email Account</Text>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="#2B6128k"
                />
              </TouchableOpacity>
              <View className="flex-row items-center py-3  justify-between">
                <View className="flex-row items-center">
                  <Entypo name="location" size={24} color="#2B6128" />
                  <Text className="ml-4 text-gray-700">Location</Text>
                </View>
                <Switch
                  value={locationEnabled}
                  onValueChange={() => setLocationEnabled(!locationEnabled)}
                  trackColor={{ false: "#2B6128", true: "#2B6128" }}
                  thumbColor={locationEnabled ? "#ffffff" : "white"}
                />
              </View>
            </View>

            {/* Other */}
            <View className="px-4 bg-white">
              <Text className="text-gray-700 font-bold mb-2 pb-2 border-b  border-secondary">
                Other
              </Text>
              <TouchableOpacity onPress={()=>setAskUs(!askUs)} className="flex-row items-center py-3 ">
                <MaterialCommunityIcons
                  name="map-marker-question"
                  size={24}
                  color="#2B6128"
                />
                <Text className="ml-4 text-gray-700">FAQ</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center py-3 ">
                <SimpleLineIcons
                  name="earphones-alt"
                  size={24}
                  color="#2B6128"
                />
                <Text className="ml-4 text-gray-700">Help Center</Text>
              </TouchableOpacity>
            </View>

            {/* Delete Account */}
            <TouchableOpacity className="p-4 items-center bg-white">
              <Text className="text-red-600 font-bold">Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
