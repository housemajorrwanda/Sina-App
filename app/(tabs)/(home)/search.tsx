import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { addToCart, removeFromCart } from "@/app/store/slice/cartSlice";
import { AntDesign, Foundation } from "@expo/vector-icons";
export default function SearchScreen() {
  const { results } = useSelector((state: any) => state?.search);
  //   const MealCategories = useSelector((state: any) => state?.products?.foodsCategories);
  //   const searchQuery = Array.isArray(query) ? query[0] : query || "";
  // Filter search results from categories
  const dispatch = useDispatch();
  const { query } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const cartState = useSelector((state: any) => state.cart?.products);
  const cartCheck = (id: any) => {
    const existingProduct = cartState.find((p: any) => p.id === id);
    return existingProduct ? true : false;
  };
  return (
    <View className="flex-1 bg-white px-4" style={{ paddingTop: insets.top }}>
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-gray-300 p-2 rounded-full w-10 h-10 flex flex-col items-center justify-center"
      >
        {/* <FontAwesome6 name="sliders" size={24} color="#2B6128" /> */}
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <Text className="text-2xl font-bold mb-4">
        Search Results for "{query}"
      </Text>

      <View className="mt-5 flex-1 flex w-[98%] mx-auto">
        <ScrollView>
          <View
            className="flex flex-row flex-wrap items-center "
            style={{ paddingBottom: insets.bottom }}
          >
            {results?.map((item: any, index: number) => (
              <View key={item.id} className="p-1 w-[33.33%] flex flex-col gap-y-2 justify-center">
                {/* Ensure three columns */}
                <View className="relative bg-third p-3 rounded-3xl">
                  <Image
                    source={{ uri: item?.thumbnail }}
                    className="w-16 h-16 mx-auto rounded-full"
                    resizeMode="cover"
                  />
                  <Text className="text-secondary font-bold text-center mt-2">
                    {item?.name}
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-secondary text-xs font-semibold">
                      {item?.price?.split(".")[0]} Rwf
                    </Text>
                    <Text className="text-secondary text-xs">
                      {item?.is_pick_and_go ? "Pick&GO" : item?.delivery}
                    </Text>
                  </View>
                  {cartCheck(item.id) ? (
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          removeFromCart({ product: item, quantity: 1 })
                        );
                      }}
                      className="absolute top-2 right-2 bg-secondary w-6 h-6 rounded-full flex items-center justify-center"
                    >
                      <AntDesign name="minus" size={20} color="white" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(addToCart({ product: item, quantity: 1 }));
                      }}
                      className="absolute top-2 right-2 bg-secondary w-6 h-6 rounded-full flex items-center justify-center"
                    >
                      <Foundation name="plus" size={20} color="white" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
