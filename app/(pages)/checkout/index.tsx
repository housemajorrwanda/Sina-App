import React from "react";
import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
import Success from "@/assets/images/payment/Success.svg";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSelector,useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
// import AntDesign from '@expo/vector-icons/AntDesign';
export default function index() {
  const paymentDetails = useSelector((state:any) => state.cart.paymentData);
  console.log("paymentDetails", paymentDetails);
  const router=useRouter();
  const inset=useSafeAreaInsets();
  return (
    <View className="flex-1 flex bg-white flex-col" style={{paddingTop:inset.top}}>
      <TouchableOpacity onPress={()=>router.replace("(tabs)/home")} className="my-2 bg-gray-300 rounded-full h-12 w-12 mx-2 flex flex-col items-center justify-center">
      <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <View className="flex-1 my-[5vh] flex flex-col items-center ">
      <View className="w-[14vw] h-[14vw] rounded-full flex flex-col items-center justify-center bg-muted_text/20">
        <Success />
      </View>
      <Text className="my-4 font-bold text-md">
        `Your Payment of {paymentDetails?.data?.amount} Rwf was Successfully recieved
      </Text>
      <View className="w-[90vw] flex flex-col gap-y-4 items-center justify-center">
        <Text className="text-center font-semibold">
          Kindly Keep invoice receipt scan provided below as a proof of your
          payment
        </Text>
        <View className="flex flex-col my-[3vh] gap-y-3">
        <Text className="text-center font-bold text-xl">Payment Details</Text>
        <View className="flex flex-row items-center border border-dark_green w-[100%] gap-x-4 rounded-xl px-2 justify-between py-3">
          <View className="flex-1 flex flex-col gap-y-2 ">
            <View style={styles.content} className="">
              <Text className="text-sm w-[55%] font-bold">Transaction ID</Text>
              <Text className="text-sm w-[60%] text-wrap">{paymentDetails?.data?.id}</Text>
            </View>
            <View style={styles.content}>
              <Text className="text-sm w-[55%] font-bold">Date</Text>
              <Text className="text-sm w-[50%]">{new Date(paymentDetails?.data?.created_at).toLocaleDateString()}</Text>
            </View>
            <View style={styles.content}>
              <Text className="text-sm w-[55%] font-bold">Type of Transaction</Text>
              <Text className="text-sm w-[45%]">MTN Momo Pay</Text>
            </View>
            <View style={styles.content}>
              <Text className="text-sm w-[55%] font-bold">Amount</Text>
              <Text className="text-sm w-[50%]">{paymentDetails?.data?.amount} Rwf</Text>
            </View>
            <View style={styles.content}>
              <Text className="text-sm font-bold">Status</Text>
              <View className="flex flex-row items-center bg-muted_text/20 px-2 rounded-full py-1">
                <AntDesign name="checkcircle" size={24} color="#2B6128" />
                <Text className="text-sm font-bold text-dark_green">
                  {paymentDetails?.data?.status}
                </Text>
              </View>
            </View>
          </View>
          <View className="">
            {paymentDetails?.data?.qr_code?<Image className="w-[25vw] h-[10vh]" source={{uri:paymentDetails?.data?.qr_code}} />:<Text>Unseccessfull Payment</Text> }
            
          </View>
        </View>
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
