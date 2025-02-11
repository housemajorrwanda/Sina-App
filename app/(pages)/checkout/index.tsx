import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Success from "@/assets/images/payment/Success.svg";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function index() {
  const amount = 7500;
  return (
    <View className="flex-1 bg-white flex flex-col items-center justify-center">
      <View className="w-[14vw] h-[14vw] rounded-full flex flex-col items-center justify-center bg-muted_text/20">
        <Success />
      </View>
      <Text className="my-4 font-bold text-md">
        Your Payment of 7500Rwf was Successfully recieved
      </Text>
      <View className="w-[90vw] flex flex-col gap-y-4 items-center justify-center">
        <Text className="text-center font-semibold">
          Kindly Keep invoice receipt scan provided below as a proof of your
          payment
        </Text>
        <Text className="text-center font-bold">Payment Details</Text>
        <View className="flex flex-row items-center border border-dark_green w-[100%] gap-x-4 rounded-xl px-2 justify-between py-3">
          <View className="flex-1 flex flex-col gap-y-2 ">
            <View style={styles.content}>
              <Text className="text-sm w-[55%] font-bold">Transaction ID</Text>
              <Text className="text-sm">400 2178 212 333</Text>
            </View>
            <View style={styles.content}>
              <Text className="text-sm w-[55%] font-bold">Date</Text>
              <Text className="text-sm w-[50%]">{new Date().toLocaleDateString()}</Text>
            </View>
            <View style={styles.content}>
              <Text className="text-sm w-[55%] font-bold">Type of Transaction</Text>
              <Text className="text-sm w-[45%]">MTN Momo Pay</Text>
            </View>
            <View style={styles.content}>
              <Text className="text-sm w-[55%] font-bold">Amount</Text>
              <Text className="text-sm w-[50%]">7500 Rwf</Text>
            </View>
            <View style={styles.content}>
              <Text className="text-sm font-bold">Status</Text>
              <View className="flex flex-row items-center bg-muted_text/20 px-2 rounded-full py-1">
                <AntDesign name="checkcircle" size={24} color="#2B6128" />
                <Text className="text-sm font-bold text-dark_green">
                  Successful
                </Text>
              </View>
            </View>
          </View>
          <View className="">
            <Image source={require("@/assets/images/payment/QR Scan 1.png")} />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4
  }
});
