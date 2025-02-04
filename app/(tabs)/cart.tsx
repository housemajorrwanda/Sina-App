import { AntDesign, Entypo } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import React, { useState,useEffect } from "react";
import Payment from "../(pages)/payment";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";

import { updateTotal } from "../store/slice/cartSlice";
import { RootState,AppDispatch } from "../store";
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: any;
}
import { useSafeAreaInsets } from "react-native-safe-area-context";


const products: Product[] = [
  {
    id: 1,
    name: "Milk",
    price: 3000,
    quantity: 2,
    image: require("../../assets/images/amata.jpg")
  },
  {
    id: 2,
    name: "Yoghurt",
    price: 1000,
    quantity: 1,
    image: require("../../assets/images/amata.jpg")
  },
  {
    id: 3,
    name: "Agashya",
    price: 5000,
    quantity: 2,
    image: require("../../assets/images/amata.jpg")
  }
];

const extras = [
  { name: "Peanuts Butter", price: "2000 Rwf" },
  { name: "Salad", price: "3500 Rwf" },
  { name: "Spices", price: "300 Rwf" }
];

const CombinedScreen = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [payment, setPayment] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch=useDispatch<AppDispatch>();
  const amount=useSelector((state:RootState)=>state?.cart?.amount)
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    Object.fromEntries(products.map((p) => [p.id, p.quantity]))
  );
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
    const insets = useSafeAreaInsets();
  
  
  const updateQuantity = (id: number, type: "increase" | "decrease") => {
    setQuantities((prev) => ({
      ...prev,
      [id]: type === "increase" ? prev[id] + 1 : Math.max(1, prev[id] - 1)
    }));
    
  };
  useEffect(() => {
    const price = products.reduce(
      (total, product) => total + product.price * (quantities[product.id] || 0),
      0
    );
    setTotalPrice(price);
    dispatch(updateTotal(price));
  }, [quantities, products]);

  const toggleCheckbox = (name: string) => {
    setCheckedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  

  if (selectedProduct) {
    return (
      <ScrollView className="flex-1 bg-orange-500 " style={{ paddingTop: insets.top}}>
        <View className="bg-orange-500 px-4">
          <View className="flex-row">
            <TouchableOpacity
              className="p-2 bg-gray-300 rounded-full"
              onPress={() => setSelectedProduct(null)}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <View></View>
          </View>
          <View className="items-center">
            <Image
              source={selectedProduct.image}
              className="w-48 h-48 rounded-full"
              resizeMode="cover" 
            />
          </View>
        </View>

        <View className="px-4 py-6 bg-white h-full rounded-t-3xl mt-8">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold">{selectedProduct.name}</Text>
            <View className="flex-row items-center bg-gray-200 rounded-full px-1 py-1">
              <TouchableOpacity
                className="bg-white rounded-full"
                onPress={() => updateQuantity(selectedProduct.id, "decrease")}
              >
                <Entypo name="minus" size={24} color="black" />
              </TouchableOpacity>
              <Text className="mx-3 text-lg font-bold">
                {quantities[selectedProduct.id]}
              </Text>
              <TouchableOpacity
                onPress={() => updateQuantity(selectedProduct.id, "increase")}
              >
                <AntDesign name="pluscircle" size={24} color="#F1A10C" />
              </TouchableOpacity>
            </View>
          </View>

          <Text className="bg-green-100 p-4 rounded-3xl mt-3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur. Eget amet vestibulum
            tincidunt elit. In feugiat est faucibus cursus enim accumsan sed
            nunc lorem. Interdum dolor.Lorem ipsum dolor sit amet consectetur.
            Eget amet vestibulum
          </Text>
          <View className="flex-row justify-between m-8">
            <View className="items-center ">
              <Text className="font-bold">Order sent</Text>
              <Text className="text-gray-600">09:00 am</Text>
            </View>
            <View className="items-center">
              <Text className="font-bold">Preparation Time</Text>
              <Text className="text-gray-600">15 mins</Text>
            </View>
            <View className="items-center">
              <Text className="font-bold">Pick up Time</Text>
              <Text className="text-gray-600">11:00 am</Text>
            </View>
          </View>
          <Text className="font-bold my-4">Add extra request</Text>
          {extras.map((item) => (
            <View key={item.name} className="flex-row justify-between mt-1 my-2">
              <View className="flex-row items-center">
                <Checkbox
                  value={checkedItems[item.name] || false}
                  color={checkedItems[item.name] ? "#F1A10C" : undefined}
                  onValueChange={() => toggleCheckbox(item.name)}
                  style={{
                    width: 20, 
                    height: 20, 
                    borderRadius: 10, 
                  }}
                />
                <Text className="text-gray-700 ml-2">{item.name}</Text>
              </View>
              <Text className="text-gray-700">{item.price}</Text>
            </View>
          ))}
          <Text className="font-bold my-4">Add Notes</Text>
          <TextInput
            placeholder="Write your note"
            className="bg-green-100 p-4 rounded-3xl mt-2 h-20"
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <View className="flex-1  bg-white p-4" style={{ paddingTop: insets.top }}>
      {payment && <Payment modal_status={payment} total={totalPrice} onRequestClose={()=>setPayment(false)} />}
      <Text className="text-secondary text-center text-2xl font-bold my-10">
        Checkout
      </Text>
      <View>
        <ScrollView>
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            onPress={() => setSelectedProduct(product)}
          >
            <View className="flex-row items-center justify-between bg-white p-3 mb-3 rounded-3xl border border-secondary border-b-4">
              <Image
                source={product.image}
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
                  onPress={() => updateQuantity(product.id, "decrease")}
                  className="px-1 py-1 bg-yellow-500 rounded-full"
                >
                  <Entypo name="minus" size={16} color="black" />
                </TouchableOpacity>
                <Text className="mx-3 text-lg font-bold">
                  {quantities[product.id]}
                </Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(product.id, "increase")}
                  className="px-1 py-1 bg-secondary rounded-full"
                >
                  <AntDesign name="plus" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        </ScrollView>
      </View>

      <View className="bg-white p-4 my-8 rounded-3xl border border-secondary border-b-4">
        <View className="flex-row items-center justify-between pr-4">
          <Text className="text-lg font-semibold text-gray-700">
            Product Subtotal
          </Text>
          <Text className="text-lg font-semibold text-gray-700">
            {products.reduce(
              (total, product) =>
                total + product.price * quantities[product.id],
              0
            )}{" "}
            Rwf
          </Text>
        </View>
        <View className="flex-row items-center justify-between pr-4 ">
          <Text className="text-lg font-semibold text-gray-700">
            Delivery Subtotal
          </Text>
          <Text className="text-lg font-semibold text-gray-700"> 7500 Rwf</Text>
        </View>
        <View className="flex-row items-center justify-between pr-4 ">
          <Text className="text-lg font-semibold text-gray-700">
            Discount Rate
          </Text>
          <Text className="text-lg font-semibold text-gray-700"> 7500 Rwf</Text>
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

      <TouchableOpacity onPress={()=>setPayment(true)} className="bg-secondary my-8 py-3 rounded-full">
        <Text className="text-center text-white text-lg font-semibold">
          Check Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CombinedScreen;
