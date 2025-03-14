import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { addToCart } from "@/app/store/slice/cartSlice";
const CategoryScreen = () => {
  const { id } = useLocalSearchParams();
  console.log(id);
  const products = useSelector((state: any) => state?.products?.products);
  console.log(products);
  const category_products=products?.filter((product:any)=>product?.shop_category==id)
  const dispatch=useDispatch<AppDispatch>()
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1 bg-white"
      style={{
        paddingVertical: insets.top
      }}
    >
      <FlatList
        data={category_products}
        className="my-2 w-[98%] mx-auto"
        keyExtractor={(item) => item.id.toString()} // Ensures unique keys
        numColumns={3} // Display 3 items per row
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={()=>{
            return(
                <Text className="text-center font-bold  text-xl">No Product in this category</Text>
            )
        }}
        renderItem={({ item }) => (
          <View className="p-1  w-1/3">
            <View className="relative bg-third p-3 rounded-3xl">
              {/* ✅ Prevent undefined image issues */}
              {item?.thumbnail ? (
                <Image
                  source={{ uri: item.thumbnail }}
                  className="w-16 h-16 mx-auto rounded-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-16 h-16 mx-auto rounded-full bg-gray-300" />
              )}

              {/* ✅ Ensure text renders properly */}
              <Text className="text-secondary font-bold text-center mt-2">
                {item?.name || "No Name"}
              </Text>

              <View className="flex-row items-center justify-between mt-1">
                <Text className="text-secondary text-sm font-semibold">
                  {item?.price ? `${item.price}` : "N/A"}
                </Text>
                <Text className="text-secondary text-xs">
                  {item?.is_pick_and_go ? "Pick&GO" : item.delivery_time !== null? `${item?.delivery_time} Mins`: "N/A"}
                </Text>
              </View>

              {/* ✅ TouchableOpacity without errors */}
              <TouchableOpacity
                className="absolute top-2 right-2 bg-secondary w-6 h-6 rounded-full flex items-center justify-center"
                onPress={()=>{dispatch(addToCart({product:item,quantity:1}))}}
              >
                <Foundation name="plus" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};
export default CategoryScreen;
