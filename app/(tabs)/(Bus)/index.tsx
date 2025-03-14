import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback
} from "react";
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
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  ActivityIndicator
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
import MapViewDirections from "react-native-maps-directions";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { AppDispatch } from "@/app/store";
import { fetchOrders } from "@/app/store/slice/cartSlice";
const index = () => {
  const insets = useSafeAreaInsets();
  const time = new Date().getHours();
  const [visible, setClosed] = useState<boolean>(true);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [choosenOrder, setChoosenOrder] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: any) => state?.login?.user);
  const { orders, loading, error } = useSelector((state: any) => state?.cart);
  //mAP API KEY
  const apiKey = "AIzaSyDPn_ruf8ZU47SAarpAiOj9RaSl_2q75qY";
  // const origin = {"latitude":-1.9656003, "longitude": 30.0968913};
  const destination = { latitude: -1.662962, longitude: 29.887083 };
  // const destination = {latitude: -1.9656003, longitude: 30.4053769};
  const origin = {
    latitude: location?.coords.latitude ?? 0,
    longitude: location?.coords?.longitude ?? 0
  }; // San Francisco
  // const destination = { latitude: 34.0522, longitude: -118.2437 }; // Los Angeles
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchOrders());
      setClosed(true);
    }, [dispatch])
  );

  console.log("orders", orders);
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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleOrderChange();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);
  //   console.log(time);
  //Handling Estimated Time and Order Status
  const createdAt = new Date(choosenOrder?.created_at); // Convert to Date object
  const preparationTime = choosenOrder?.preparation_time ?? 0; // Ensure it's a valid number

  // Add preparation time (in minutes)
  const estimatedTime = new Date(createdAt.getTime() + preparationTime * 60000);
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
      // console.log(locationData.coords);

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
  const regionTest = {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.01, // Zoom level
    longitudeDelta: 0.01
  };
  const renderOrdersItem = ({ item }: any) => {
    console.log("order item", item);

    return (
      <TouchableOpacity
        onPress={() => {
          setChoosenOrder(item), setClosed(false);
        }}
        className={`flex flex-row justify-between my-2 bg-gray-200 ${
          item?.payment_status == "pending"
            ? "bg-third"
            : item?.payment_status == "completed"
            ? "bg-[#2B6128]"
            : ""
        } w-[90%] mx-auto p-2 py-3 rounded-md`}
      >
        <Text>
          {new Date(item.created_at).toLocaleString("en-US", {
            timeZone: "Africa/Kigali", // Change to your preferred timezone
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true // Change to false for 24-hour format
          })}
        </Text>
        <Text>{item?.total_price}</Text>
        <Text>{item?.payment_status}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View className="flex-1 flex flex-col">
      {/* Listing All User Orders */}
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
                  <Text className="text-lg text-third font-bold">
                    Recent Orders
                  </Text>
                  <View className="flex flex-col items-start gap-y-2 py-2 w-[100%] pb-12">
                    <FlatList
                      className="w-full max-h-[100%]"
                      keyExtractor={(item) => item?.id.toString()}
                      data={orders}
                      renderItem={renderOrdersItem}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* end of Order Lists */}
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
                    source={{ uri: user?.user_data?.profile }}
                    className="w-20 h-20 rounded-full border border-third"
                  />
                </View>
                <Text className="text-white  font-bold text-lg">
                  {user?.user_data?.full_name || user?.user_data?.phone_number}
                </Text>
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
            <View
              className="flex-1 rounded-t-2xl py-10 mx-auto bg-bg_second w-full flex flex-col items-center justify-center"
              style={styles.ViewPadding}
            >
              <View className="w-[90%] flex flex-col items-center">
                {choosenOrder ? (
                  <View className="items-center justify-center flex flex-col">
                    <Text className="text-lg font-bold">
                      Estimated Time:
                      {estimatedTime.toLocaleString("en-US", {
                        timeZone: "Africa/Kigali",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",

                        hour12: true
                      })}
                    </Text>
                    <Text>
                      Your order should be ready in{" "}
                      {choosenOrder?.preparation_time} mins for pickup
                    </Text>
                    <View className="flex flex-row items-center justify-between gap-x-2 my-3 ">
                      <View className="w-[12vw] h-[12vw] relative bg-white rounded-full items-center justify-center flex flex-col">
                        {choosenOrder?.payment_status == "pending" && (
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
                        {choosenOrder?.payment_status === "completed" &&
                          estimatedTime > new Date() && (
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
                        {choosenOrder?.payment_status === "completed" &&
                          estimatedTime <= new Date() && (
                            <View className="absolute top-[1vh] -right-[1vw] ">
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
                ) : (
                  <TouchableOpacity onPress={() => setClosed(true)}>
                    <Text>Please Choose to Track it's Progress</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  ViewPadding: {
    paddingBottom:
      Platform.OS == "ios" ? Dimensions.get("screen").height * 0.09 : 0
  }
});
export default index;
