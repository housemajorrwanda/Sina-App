import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput,ActivityIndicator, Alert } from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { clearCart, Payment, PaymentCheck, updatePaymentModal } from "../store/slice/cartSlice";
import Spinner from "react-native-loading-spinner-overlay";
import { useRouter } from "expo-router";
import { createOrder } from "../store/slice/cartSlice";
// import CountryPicker, { Country } from "react-native-country-picker-modal";
export default function MobileMoney() {
  const [countryCode, setCountryCode] = useState<string>("+250"); // Default Rwanda
  const [showPicker, setShowPicker] = useState<boolean>(false); //
  const [phone_number, setMobileNumber] = useState<string>(""); //
  const loading=useSelector((state:any)=>state.cart?.loading)
  const amount=useSelector((state:RootState)=>state.cart.amount)
  const [paymentState,setPaymentState] = useState<string>("Requesting...");
  const dispatch=useDispatch<AppDispatch>();
  const cartItems=useSelector((state:any)=>state?.cart?.products)
  console.log("cart data to be paid",cartItems);
  const router=useRouter();
//   const PaymentFunction = async () => {
//     handleOrder()
//     const result = await dispatch(Payment({ phone_number, amount }));
    
//     if (Payment.fulfilled.match(result)) {
//       // console.log("payload",result?.payload?.payment_id)
//       setPaymentState("Processing...")
//         checkPayment(result?.payload?.payment_id);
//     }
// };
const handleOrder = () => {
  dispatch(createOrder({"cartItems":cartItems,"phone_number":phone_number,"amount":amount}))
    .then((result:any) => {
      if (createOrder.fulfilled.match(result)) {
        console.log(result?.payload);
        
        Alert.alert("Success", "Order placed successfully!");
        checkPayment(result?.payload?.order_payment);
      } else {
        Alert.alert("Error", result.payload || "Failed to place order.");
      }
    });
};
const checkPayment = async (id: any) => {
  // console.log("captured id",id)
    const interval = setInterval(async () => {
        const response = await dispatch(PaymentCheck({"id":id}));
        // console.log("check payment response",response)
        if(PaymentCheck.rejected.match(response)){
          clearInterval(interval); // Stop checking when payment is rejected
            console.log("Payment rejected!");

        }
        console.log("Checking payment status...",response?.payload?.data?.status);
        if (response?.payload?.data?.status === "completed") { 
          setPaymentState("Payment Completed!Redirecting ....");
          await dispatch(clearCart());
          dispatch(updatePaymentModal({isVisible:false}));
          router.push("/(pages)/checkout");  // First, navigate
          setTimeout(() => clearInterval(interval), 2000);
        }
        if (response?.payload?.data?.status === "failed") { 
          setPaymentState("Payment Failed!Redirecting ....");
          Alert.alert(
            "Payment Failed",
            "Payment Failed. Please try again later",
            [
              {
                text: "OK",
                onPress: () => {
                  clearInterval(interval); // Ensure interval is cleared
                  router.push("/(pages)/checkout"); // Navigate after alert dismissal
                },
              },
            ]
          );
          router.push("/(pages)/checkout");  // First, navigate
          setTimeout(() => clearInterval(interval), 2000);
        }
    }, 7000);
};

  return (
    <View className="flex flex-col justify-center">
     <Spinner visible={loading} animation="slide" textContent={paymentState} size="large" />
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
              value={phone_number}
              onChangeText={(e)=>setMobileNumber(e)}
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
        <TouchableOpacity onPress={()=>handleOrder()} className="bg-secondary w-[90%] mx-auto py-3 flex flex-col items-center justify-center rounded-full">
          <Text className="text-white font-bold">Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
