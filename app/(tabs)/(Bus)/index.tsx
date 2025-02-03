import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  StyleSheet
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { Marker, Region } from "react-native-maps";
import Call from "@/assets/images/payment/call.svg";
import Chat from "@/assets/images/payment/chat.svg";
import Receipt from "@/assets/images/payment/receipt.svg";
import OrderRecieved from "@/assets/images/payment/received_order.svg";
import OrderReady from "@/assets/images/payment/order_ready.svg";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Location from "expo-location";
import MapViewDirections from 'react-native-maps-directions'
const index = () => {
  const insets = useSafeAreaInsets();
  const time = new Date().getHours();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  //mAP API KEY
  const apiKey ='AIzaSyDPn_ruf8ZU47SAarpAiOj9RaSl_2q75qY';
  // const origin = {"latitude":-1.9656003, "longitude": 30.0968913};
  const destination = {latitude:-1.9656003, longitude: 30.0968913};
  // const destination = {latitude: -1.9656003, longitude: 30.4053769};
  const origin = { latitude: location?.coords.latitude??0, longitude:location?.coords?.longitude??0 }; // San Francisco
// const destination = { latitude: 34.0522, longitude: -118.2437 }; // Los Angeles

  const [region, setRegion] = useState<Region | null>(null);
  let greetings;
  if (time < 12) {
    greetings = "Good Morning";
  } else if (time < 18) {
    greetings = "Good Afternoon";
  } else {
    greetings = "Good Evining";
  }
  const [orderState, setOrderState] = useState("receipt");
  const handleOrderChange = () => {
    setOrderState((prevState) => {
      if (prevState === "receipt") {
        return "order_received";
      } else if (prevState === "order_received") {
        return "order_ready";
      } else {
        return "receipt";
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleOrderChange();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  //   console.log(time);
  useEffect(() => {
    (async () => {
      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Allow location access to use this feature."
        );
        return;
      }

      // Get current location
      let locationData = await Location.getCurrentPositionAsync({});
      console.log(locationData.coords);

      setLocation(locationData);
      const { latitude, longitude } = locationData.coords;
      // Set map region
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01, // Zoom level
        longitudeDelta: 0.01
      });
    })();
  }, []);
  const regionTest={
    latitude: 37.7749, longitude: -122.4194,latitudeDelta: 0.01, // Zoom level
    longitudeDelta: 0.01
  }
  return (
    <View className="flex-1 flex flex-col">
      <ScrollView
        style={{
          flexGrow: 1
        }}
        contentContainerStyle={{
          flexGrow: 1
        }}
        className="bg-dark_green"
      >
        <View className="flex-1">
          <ImageBackground
            className="flex flex-col h-[25vh] relative "
            style={{ paddingTop: insets.top }}
            source={require("@/assets/images/payment/Blackbg.png")}
          >
            <View className="flex flex-row items-start justify-between w-[90%] mx-auto">
              <Text className="text-white font-bold text-xl">{greetings}</Text>
              <View className="flex flex-col justity-center items-center">
                <View className="w-[20vw] h-[20vw] rounded-full ">
                  <Image
                    source={require("@/assets/images/payment/dummy_Profile.png")}
                    className="w-[20vw] h-[20vw] rounded-full"
                  />
                </View>
                <Text className="text-white  font-bold text-lg">Richard</Text>
              </View>
            </View>
            <Text className="text-white text-center font-bold">
              Kigali-Musanze
            </Text>
          </ImageBackground>
          {/* Map Vieww */}
          <View className="w-[100%] h-[50vh]">
            <MapView
              region={region || undefined}
              // region={regionTest || undefined}
              showsUserLocation={true}
              showsMyLocationButton={true}
              style={{ width: "100%", height: "100%" }}
            >
              {location && (
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                  }}
                  // coordinate={origin}
                  // title="Your current location"
                  title="You are here"
                />
              )}
              <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={apiKey}
              strokeWidth={4}
              strokeColor="blue"
            />
            </MapView>
          </View>
          {/* After Map  */}
          <View className="flex-1  flex flex-col bg-dark_green flex-1 rounded-t-2xl py-3 -my-4">
            <View className="flex flex-row items-center gap-x-2 justify-between w-[90%] mx-auto">
              <View className="flex flex-row items-center gap-x-2">
                <View className="w-[20vw] h-[20vw] rounded-full">
                  <Image
                    source={require("@/assets/images/payment/dummy_Profile.png")}
                    className="w-[20vw] h-[20vw] rounded-full"
                  />
                </View>
                <View className="flex flex-col w-[50%]">
                  <Text className="text-white text-wrap w-[90%] font-bold text-lg">
                    Emmanuel Ndayambaje
                  </Text>
                  <Text className="text-white ">Customer care</Text>
                </View>
              </View>
              <View className="flex flex-row gap-x-2 w-[45%]">
                <TouchableOpacity className="w-[12vw] h-[12vw] rounded-full bg-white p-2 flex flex-col items-center justify-center">
                  <Call />
                </TouchableOpacity>
                <TouchableOpacity className="w-[12vw] h-[12vw] rounded-full bg-white p-2 flex flex-col items-center justify-center">
                  <Chat />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-1 rounded-t-2xl py-10 mx-auto bg-bg_second w-full flex flex-col items-center justify-center" style={styles.ViewPadding}>
              <View className="w-[90%] flex flex-col items-center">
                <View className="items-center justify-center flex flex-col">
                  <Text className="text-lg font-bold">
                    Estimated Time: 11:30 AM
                  </Text>
                  <Text>Your order should be ready in 10 mins for pickup</Text>
                  <View className="flex flex-row items-center justify-between gap-x-2 my-3 ">
                    <View className="w-[12vw] h-[12vw] relative bg-white rounded-full items-center justify-center flex flex-col">
                      {orderState === "receipt" && (
                        <View className="absolute top-[1vh] -right-[1vw]  ">
                          <AntDesign
                            name="checkcircle"
                            size={Dimensions.get("screen").width * 0.04}
                            color="#F1A10C"
                            className="text-icon_color"
                          />
                        </View>
                      )}
                      <Receipt />
                    </View>
                    <View className="flex-1 h-[2px] bg-dark_green rounded-full"></View>
                    <View className="w-[12vw] h-[12vw] relative bg-white rounded-full items-center justify-center flex flex-col">
                      {orderState === "order_received" && (
                        <View className="absolute top-[1vh] -right-[1vw]  ">
                          <AntDesign
                            name="checkcircle"
                            size={Dimensions.get("screen").width * 0.04}
                            color="#F1A10C"
                            className="text-icon_color"
                          />
                        </View>
                      )}
                      <OrderRecieved />
                    </View>
                    <View className="flex-1 h-[2px] bg-dark_green rounded-full"></View>
                    <View className="w-[12vw] h-[12vw] relative bg-white rounded-full items-center justify-center flex flex-col">
                      {orderState === "order_ready" && (
                        <View className="absolute top-[1vh] -right-[1vw]  ">
                          <AntDesign
                            name="checkcircle"
                            size={Dimensions.get("screen").width * 0.04}
                            color="#F1A10C"
                            className="text-icon_color"
                          />
                        </View>
                      )}
                      <OrderReady />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles=StyleSheet.create({
  ViewPadding:{
    paddingBottom:Platform.OS =='ios'?Dimensions.get('screen').height * 0.09:0
  }
})
export default index;
