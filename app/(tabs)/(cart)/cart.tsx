import { AntDesign, Entypo } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import React, { useState, useEffect } from "react";
import Payment from "../../(pages)/payment";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";

// import { updateTotal } from "../store/slice/cartSlice";
import { RootState, AppDispatch } from "../../store";
// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   thumbnail: any;
// }
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  addAccompanimentToCart,
  addToCart,
  removeFromCart,
  setSelectedProduct,
  updatePaymentModal
} from "../../store/slice/cartSlice";

const CombinedScreen = () => {
  // const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [payment, setPayment] = useState<boolean>(false);
  // const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const amount = useSelector((state: RootState) => state?.cart?.amount);
  const cartProducts = useSelector((state: any) => state.cart.products);
  const paymentModal = useSelector((state: any) => state.cart.paymentModal);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1  bg-white p-4" style={{ paddingTop: insets.top }}>
      {paymentModal && (
        <Payment />
      )}
      <Text className="text-secondary text-center text-2xl font-bold my-10">
        Checkout
      </Text>
      <View>
        <ScrollView>
          {cartProducts?.length == 0 ? (
            <View className="flex-1 flex- flex-col items-center justify-center ">
              <Text className="text-third">
                You have No products in your Cart
              </Text>
            </View>
          ) : (
            cartProducts.map((product: any) => (
              <TouchableOpacity
                key={product.id}
                onPress={() => router.push(`/(cart)/${product?.id}`)}
              >
                <View className="flex-row items-center justify-between bg-white p-3 mb-3 rounded-3xl border border-secondary border-b-4">
                  <Image
                    source={{ uri: product.thumbnail }}
                    className="w-12 h-12 rounded-full border border-secondary"
                  />
                  <View className="flex-1 mx-4">
                    <Text className="text-lg font-semibold text-green-900">
                      {product.name}
                    </Text>
                    <Text className="text-gray-600">{product.price} Rwf</Text>
                  </View>
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() =>
                        dispatch(removeFromCart({ product, quantity: 1 }))
                      }
                      className="px-1 py-1 bg-yellow-500 rounded-full"
                    >
                      <Entypo name="minus" size={16} color="black" />
                    </TouchableOpacity>
                    <Text className="mx-3 text-lg font-bold">
                      {product.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        dispatch(addToCart({ product, quantity: 1 }))
                      }
                      className="px-1 py-1 bg-secondary rounded-full"
                    >
                      <AntDesign name="plus" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
      {cartProducts?.length > 0 && (
        <>
          <View className="bg-white p-4 my-8 rounded-3xl border border-secondary border-b-4">
            <View className="flex-row items-center justify-between pr-4">
              <Text className="text-lg font-semibold text-gray-700">
                Product Subtotal
              </Text>
              <Text className="text-lg font-semibold text-gray-700">
                {amount}
                Rwf
              </Text>
            </View>
            <View className="flex-row items-center justify-between pr-4 ">
              <Text className="text-lg font-semibold text-gray-700">
                Delivery Subtotal
              </Text>
              <Text className="text-lg font-semibold text-gray-700">
                {" "}
                7500 Rwf
              </Text>
            </View>
            <View className="flex-row items-center justify-between pr-4 ">
              <Text className="text-lg font-semibold text-gray-700">
                Discount Rate
              </Text>
              <Text className="text-lg font-semibold text-gray-700">
                {" "}
                7500 Rwf
              </Text>
            </View>
            <View className="flex-row items-center justify-between pr-4">
              <Text className="text-lg font-semibold text-gray-700">
                Total Price
              </Text>
              <Text className="text-lg font-semibold text-gray-700">
                {/* {products.reduce(
              (total, product) =>
                total + product.price * quantities[product.id],
              0
            )} */}
                {amount}
                Rwf
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() =>dispatch(updatePaymentModal({isVisible:true}))}
            className="bg-secondary my-8 py-3 rounded-full"
          >
            <Text className="text-center text-white text-lg font-semibold">
              Check Out
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CombinedScreen;
