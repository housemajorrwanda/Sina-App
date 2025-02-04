import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { MaskedTextInput } from "react-native-mask-text";
import Svg, { Image } from "react-native-svg";
import { useSelector } from "react-redux";
import { RootState } from "../store";
export default function CardPayment() {
  const [cardNumber, setCardNumber] = useState("");
  //   const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const savedCard = "1111 1111 1111 1245";
  const expiry = "09/09";
  const  amount  = useSelector((state:RootState) => state.cart.amount);
  const maskCard = (cardNumber: string) => {
    const lastFourDigits = cardNumber.slice(-4); // Get last 4 digits
    const maskedPart = cardNumber.slice(0, -4).replace(/\d/g, "X"); // Mask the rest with 'X'
    return maskedPart + lastFourDigits; // Combine both parts
  };
  return (
    <View className="py-4 px-3">
      {/* Card Logo */}
      <Text className="text-muted_text text-lg">Saved Cards</Text>
      <View className="bg-muted_text/30 rounded-lg p-2 w-[90%] flex flex-col gap-y-8 px-4">
        <Text className="italic text-md text-muted_text self-end">
          Debit Card
        </Text>
        <Text className="text-md font-bold">{maskCard(savedCard)}</Text>
        <View className="flex flex-row justify-between w-[60%] self-end">
          <View className="flex flex-col justify-end">
            <Text className="text-muted_text text-xs uppercase">Expires</Text>
            <Text className="text-muted_text text-xs">{expiry}</Text>
          </View>
          <Svg width="50" height="30">
            <Image
              href={require("@/assets/images/payment/visa.png")}
              width="50"
              height="30"
            />
          </Svg>
        </View>

        </View>
        <View className="flex flex-col gap-y-3">
          <Text className="text-muted_text text-md">New Payment Method</Text>
          <View className="flex flex-row items-center gap-x-2 w-[90%]">
            
            
            {/* <TextInput className="flex-1 border border-text_muted rounded-md px-2 py-2" /> */}
          </View>
        </View>
        <View style={{ width: "90%", height: 1, backgroundColor: "#7A7A7A",marginVertical:Dimensions.get('screen').height * 0.02 }} />
        <View>
          <View className="w-[80%] flex flex-row items-center justify-between">
            <Text className="text-lg">Price</Text>
            <Text className="font-bold text-lg">{amount} Rwf</Text>
          </View>
        </View>
        <TouchableOpacity className="bg-secondary w-[90%] mx-auto py-3 flex flex-col items-center justify-center rounded-full">
            <Text className="text-white font-bold">Pay</Text>
        </TouchableOpacity>
      </View>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "90%",
    alignSelf: "center"
  },
  cardContainer: {
    alignItems: "flex-end",
    marginBottom: 20
  },
  input: {
    marginBottom: 10
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    marginTop: 20
  }
});
