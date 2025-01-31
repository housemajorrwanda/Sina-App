import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";


interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CheckoutScreen = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Milk", price: 3000, quantity: 2, image: "https://via.placeholder.com/50" },
    { id: 2, name: "Milk", price: 3000, quantity: 2, image: "https://via.placeholder.com/50" },
    { id: 3, name: "Yoghurt", price: 1000, quantity: 1, image: "https://via.placeholder.com/50" },
    { id: 4, name: "Agashya", price: 5000, quantity: 2, image: "https://via.placeholder.com/50" },
  ]);

  const updateQuantity = (id: number, type: "increase" | "decrease") => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: type === "increase" ? product.quantity + 1 : Math.max(1, product.quantity - 1) }
          : product
      )
    );
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <View className="flex-1 bg-white p-4">      
      <Text className="text-green-700 text-center text-xl font-bold mb-4">Checkout</Text>
      <ScrollView>
        {products.map((product) => (
          <View key={product.id} className="flex-row items-center justify-between bg-green-100 p-3 mb-3 rounded-lg">            
            <Image source={{ uri: product.image }} className="w-12 h-12 rounded-lg" />
            <View className="flex-1 mx-4">
              <Text className="text-lg font-semibold text-green-900">{product.name}</Text>
              <Text className="text-gray-600">{product.price} Rwf</Text>
            </View>
            <View className="flex-row items-center">              
              <TouchableOpacity onPress={() => updateQuantity(product.id, "decrease")} className="px-3 py-1 bg-yellow-500 rounded-lg">
                <Text className="text-lg font-bold text-white">-</Text>
              </TouchableOpacity>
              <Text className="mx-3 text-lg font-bold">{product.quantity}</Text>
              <TouchableOpacity onPress={() => updateQuantity(product.id, "increase")} className="px-3 py-1 bg-green-500 rounded-lg">
                <Text className="text-lg font-bold text-white">+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <View className="bg-gray-100 p-4 rounded-lg my-4">        
        <Text className="text-lg font-semibold text-gray-700">Product Subtotal: {calculateTotal()} Rwf</Text>
        <Text className="text-lg font-semibold text-gray-700">Delivery Subtotal: 7500 Rwf</Text>
        <Text className="text-lg font-semibold text-gray-700">Discount Rate: 7500 Rwf</Text>
        <Text className="text-lg font-semibold text-green-700 mt-2">Total Price: {calculateTotal()} Rwf</Text>
      </View>
      
      <TouchableOpacity className="bg-green-600 py-3 rounded-lg">
        <Text className="text-center text-white text-lg font-semibold">Check Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutScreen;
