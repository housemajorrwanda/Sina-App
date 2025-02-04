import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "../store";
// import CountryPicker, { Country } from "react-native-country-picker-modal";
export default function MobileMoney() {
  const [countryCode, setCountryCode] = useState<string>("+250"); // Default Rwanda
  const [showPicker, setShowPicker] = useState<boolean>(false); //
  const amount=useSelector((state:RootState)=>state.cart.amount)
  return (
    <View className="flex flex-col justify-center">
      <Text className="text-muted_text text-md mt-4">Saved Numbers</Text>
      <View className="my-2 gap-y-2">
        <TouchableOpacity className="flex flex-row items-center gap-x-2 ">
          <Image source={require("@/assets/images/payment/Mtn.png")} />
          <View className="flex flex-col items-start ">
            <Text>MTN</Text>
            <Text className="ml-2 text-sm text-muted_text">
              +250 789 456 789
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row items-center gap-x-2 ">
          <Image source={require("@/assets/images/payment/Mtn.png")} />
          <View className="flex flex-col items-start ">
            <Text>MTN</Text>
            <Text className="ml-2 text-sm text-muted_text">
              +250 789 456 789
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row items-center gap-x-2 ">
          <Image source={require("@/assets/images/payment/Airtel.png")} />
          <View className="flex flex-col items-start ">
            <Text>Airtel</Text>
            <Text className="ml-2 text-sm text-muted_text">
              +250 789 456 789
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="divide-y-2 divide-indigo-500 gap-y-4 flex flex-col my-4">
        <View className="flex flex-col gap-y-3">
          <Text className="text-muted_text text-md">New Payment Method</Text>
          <View className="flex flex-row items-center gap-x-2 w-[90%]">
            <TouchableOpacity
              className="py-2 px-3 bg-muted_text/30 rounded-md"
              onPress={() => setShowPicker(true)}
            >
              <Text
                style={{
                  color: "back",
                  fontWeight: "bold"
                }}
              >
                {countryCode}
              </Text>
            </TouchableOpacity>

            <CountryPicker
            lang={'pl'}
              show={showPicker}
              // when picker button press you will get the country object with dial code
              pickerButtonOnPress={(item) => {
                setCountryCode(item.dial_code);
                setShowPicker(false);
              }}
            />
            <TextInput
              className="flex-1 border border-text_muted rounded-md px-2 py-2"
              placeholder="07822..."
            />
          </View>
        </View>
        <View style={{ width: "90%", height: 1, backgroundColor: "#7A7A7A" }} />
        <View>
          <View className="w-[80%] flex flex-row items-center justify-between">
            <Text className="text-lg">Price</Text>
            <Text className="font-bold text-lg">{amount} RWF</Text>
          </View>
        </View>
        <TouchableOpacity className="bg-secondary w-[90%] mx-auto py-3 flex flex-col items-center justify-center rounded-full">
          <Text className="text-white font-bold">Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
