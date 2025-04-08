import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppDispatch } from "@/app/store";
import {
  addAccompanimentToCart,
  addToCart,
  removeFromCart,
  setSelectedProduct
} from "../../../store/slice/cartSlice";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native";
const ProductScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Get the product ID from the URL
  const dispatch = useDispatch<AppDispatch>();
  const amount = useSelector((state: RootState) => state?.cart?.amount);
  const cartProducts = useSelector((state: any) => state.cart.products);
  // const selectedProduct=useSelector((state: any)=>state?.cart?.selectedProduct);
  // const router=useRouter();
  const insets = useSafeAreaInsets();
  // Find selected product in Redux store
  // const selectedProduct = 
  const selectedProduct = useSelector((state: any) => {
    // Find the category that contains the product
    const category = state.products?.foodsCategories?.find((cat: any) =>
      cat?.foods?.some((p: any) => p.id === id)
    );
  
    // Find the product inside the category
    const productInCategory = category?.foods?.find((p: any) => p.id === id);
  
    // Find the product in the main products list
    const productInList = state.products?.products?.find((p: any) => p.id === id);
  
    // Debugging (Remove this later)
    console.log("Category Found:", category);
    console.log("Product in Category:", productInCategory);
    console.log("Product in List:", productInList);
  
    // Return the product from the category if found, otherwise return the product from the list
    return productInCategory || productInList || null;
  });
  
  const toggleCheckbox = (item: any) => {
    dispatch(
      addAccompanimentToCart({
        productId: selectedProduct.id,
        accompaniment: item
      })
    );
    // setCheckedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  if (!selectedProduct) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold text-red-500">
          Product not found
        </Text>
      </View>
    );
  }
  // const addMinutes = (time: string, minutesToAdd: number) => {
  //   const [hours, minutes] = time?.split(":").map(Number); // Split "HH:mm" into numbers
  //   const date = new Date();
  //   date.setHours(hours);
  //   date.setMinutes(minutes + minutesToAdd);

  //   // Format as HH:mm
  //   return `${date.getHours().toString().padStart(2, "0")}:${date
  //     .getMinutes()
  //     .toString()
  //     .padStart(2, "0")}`;
  // };
  const orderTime = selectedProduct?.orderTime;
  // const deliveryTime = addMinutes(orderTime, selectedProduct?.delivery_time);

  return (
    <ScrollView
      className="flex-1 bg-orange-500 "
      style={{ paddingTop: insets.top +4 }}
    >
      <View className="bg-orange-500 px-4 flex flex-col ">
        <View className="flex-row">
          <TouchableOpacity
            className="p-2 bg-gray-300 rounded-full"
            onPress={() =>
              router.canGoBack() ? router.back() : router.push("/(cart)")
            }
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <View></View>
        </View>
        <View className="items-center self-center bg-white w-48 h-48 rounded-full">
          <Image
            source={{ uri: selectedProduct.thumbnail }}
            className="w-48 h-48 rounded-full"
            resizeMode="cover"
          />
        </View>
      </View>

      <View className="px-4 py-6 bg-white h-full rounded-t-3xl mt-8">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold">{selectedProduct.name}</Text>
          {/* <View className="flex-row items-center bg-gray-200 rounded-full px-1 py-1">
              <TouchableOpacity
                className="bg-white rounded-full"
                onPress={() =>
                  dispatch(removeFromCart({ product: selectedProduct }))
                }
              >
                <Entypo name="minus" size={24} color="black" />
              </TouchableOpacity>
              <Text className="mx-3 text-lg font-bold">
                {selectedProduct.quantity}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  dispatch(addToCart({ product: selectedProduct }))
                }
              >
                <AntDesign name="pluscircle" size={24} color="#F1A10C" />
              </TouchableOpacity>
            </View> */}
        </View>

        {selectedProduct?.description && <Text className="bg-green-100 p-4 rounded-3xl mt-3 text-gray-600">
          {selectedProduct?.description}
        </Text>}

        {selectedProduct?.possible_accompaniments?.length>0 &&<Text className="font-bold my-4">Add extra request</Text>}
        {selectedProduct?.possible_accompaniments?.map((item: any) => (
          <View key={item.id} className="flex-row justify-between mt-1 my-2">
            <View className="flex-row items-center">
              <Checkbox
                value={
                  selectedProduct?.accompaniments?.some(
                    (acc: any) => acc.id === item.id
                  ) || false
                }
                color={
                  selectedProduct?.accompaniments?.some(
                    (acc: any) => acc.id === item.id
                  )
                    ? "#F1A10C"
                    : undefined
                }
                onValueChange={() => toggleCheckbox(item)}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10
                }}
              />

              <Text className="text-gray-700 ml-2">{item.name}</Text>
            </View>
            <Text className="text-gray-700">{item.price} Rwf</Text>
          </View>
        ))}
        <Text className="font-bold my-4">Add Notes</Text>
        <TextInput
          placeholder="Write your note"
          placeholderTextColor="gray"
          className="bg-green-100 p-4 rounded-3xl mt-2 h-20"
          multiline
          textAlignVertical="top"
        />
        <TouchableOpacity
        className="bg-secondary px-3 py-3 rounded-full my-4"
        onPress={() =>
          dispatch(addToCart({ product: selectedProduct }))
        }
      >
        <Text className="text-white text-2xl text-center font-bold">
          Add To Cart
        </Text>
      </TouchableOpacity>
      </View>
      
    </ScrollView>
  );
};

export default ProductScreen;
