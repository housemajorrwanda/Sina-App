import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Dimensions
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Filter from "@/assets/images/Filter.svg";
import Bell from "@/assets/images/Bell.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, sendMessage } from "@/app/store/slice/ChatSlice";
import { useLocalSearchParams } from "expo-router";
import Search from "@/assets/images/search4.svg";
import Send from "@/assets/images/send.svg";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { url } from "@/app/components/url";
const Chat = () => {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;
  const [message, setMessage] = useState<any>("");
  const [query, setQuery] = useState<string>("");
  const [faqs,setFaqs]=useState<String[]|[]>([])
  const client = useSelector((state: any) => state.chat?.chatting_profile);
  // console.log(client);
  const messages = useSelector((state: any) => state.chat?.messages);
  const user = useSelector((state: any) => state?.login?.user);
  // console.log("cleint", messages);
  const { chatRoomId }: any = useLocalSearchParams();
  const sectionListRef = useRef<SectionList<any>>(null);

  useFocusEffect(
    useCallback(() => {
      // Function to fetch messages
      const fetchChatMessages = () => {
        dispatch(fetchMessages(chatRoomId) as any);
      };
      ScrollToBottom();
      // Fetch immediately and then set interval
      fetchChatMessages();
      const interval = setInterval(fetchChatMessages, 2000);

      // Cleanup function to clear the interval on unmount
      return () => clearInterval(interval);
    }, [dispatch, chatRoomId]) // Depend on chatRoomId to refetch if it changes
  );

  const groupedMessages = Array.isArray(messages)
  ? messages.reduce((acc: any, message: any) => {
      const messageDate = new Date(message?.created_at);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      let sectionTitle: string;

      if (messageDate.toDateString() === today.toDateString()) {
        sectionTitle = "Today";
      } else if (messageDate.toDateString() === yesterday.toDateString()) {
        sectionTitle = "Yesterday";
      } else {
        sectionTitle = messageDate.toDateString(); // Default to full date format
      }

      const existingSection = acc.find(
        (section: any) => section.title === sectionTitle
      );

      if (existingSection) {
        existingSection.data.push(message);
      } else {
        acc.push({ title: sectionTitle, data: [message] });
      }

      return acc;
    }, [])
  : [];

  
  const getItemLayout = (data: any, index: number) => {
    const ITEM_HEIGHT = 50; // Adjust based on your item height
    return {
      length: ITEM_HEIGHT, // Fixed height of your items
      offset: ITEM_HEIGHT * index, // The position of the item
      index
    };
  };
  const ScrollToBottom = () => {
    if (
      sectionListRef?.current &&
      Array.isArray(groupedMessages) &&
      groupedMessages.length > 0
    ) {
      const lastSectionIndex = groupedMessages.length - 1;
      const lastSection = groupedMessages[lastSectionIndex];
  
      if (lastSection?.data?.length > 0) {
        const lastItemIndex = lastSection.data.length - 1;
  
        sectionListRef.current.scrollToLocation({
          sectionIndex: lastSectionIndex,
          itemIndex: lastItemIndex,
          animated: true,
          viewPosition: 1, // scrolls to bottom (1 = end, 0 = start, 0.5 = center)
        });
      }
    }
  };
  
// Handle search query
  const handleSearch=async(query:string)=>{
      // console.log(q())
      setQuery(query)
      if(query !=''){
        const result=await axios.get(`${url}/messages/search-faqs?query=${query}`,{
        headers:{
        "Content-Type":"application/json"
        }
        })
        
        setFaqs(await result?.data)
      }
  }
  const renderMessages = (item: any) => {
    // console.log("sender", item?.sender, "receiver", user?.user_data?.id);
    return (
      <View className="w-[100%] flex flex-col my-1 ">
        {item?.sender != user?.user_data?.id ? (
          <View className="self-end flex flex-row items-end max-w-[90%] w-auto gap-x-2 flex-wrap">
            {/* Seen + Time */}
            <View className="flex flex-col items-end shrink-0">
              <Text className="font-bold text-sm">seen</Text>
              <Text className="text-xs text-gray-500">
                {item?.created_at
                  ? new Date(item.created_at).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit"
                    })
                  : ""}
              </Text>
            </View>

            {/* Message Bubble */}
            <View className="bg-[#9A9A9A]/10 rounded-lg py-1 px-2 max-w-[75%] w-auto">
              <Text className="break-words">{item?.message}</Text>
            </View>
          </View>
        ) : (
          <View className="self-start flex flex-row-reverse items-end max-w-[90%] w-auto gap-x-2 flex-wrap">
            {/* Seen + Time */}
            <View className="flex flex-col items-end shrink-0">
              <Text className="font-bold text-sm">seen</Text>
              <Text className="text-xs text-gray-500">
                {item?.created_at
                  ? new Date(item.created_at).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit"
                    })
                  : ""}
              </Text>
            </View>

            {/* Message Bubble */}
            <View className="bg-[#E3FFFC] rounded-lg py-1 px-2 max-w-[75%] w-auto">
              <Text className="break-words">{item?.message}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };
  

  const handleSendMessage = () => {
    if (!chatRoomId || message.trim() == "")
      return alert("Failed to send message please Contact the support Team");
    dispatch(sendMessage({ chatRoomId, message }) as any);
    setMessage("");
    ScrollToBottom();
  };
  const renderFaqs=(item:any)=>{
    console.log("rendering Faqs",item);
    return (
      <TouchableOpacity className="my-1" onPress={()=>{
        setMessage(item?.item?.question);
        setFaqs([]);
        }}>
        <Text>{item?.item?.question}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <KeyboardAvoidingView
      // contentContainerStyle={{
      //     flex:1
      // }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-secondary flex flex-col"
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      style={{
        paddingTop: inset.top + 2
      }}
    >
      <TouchableWithoutFeedback
        className="flex-1"
        onPress={() => Keyboard.dismiss()}
      >
        <View className="flex-1">
          <View className="w-[95%] mx-auto flex flex-col">
            <View className="flex flex-row items-center justify-between">
              <TouchableOpacity className="w-12 h-12 flex flex-col items-center justify-center rounded-full bg-[#D9D9D9]">
                <Filter />
              </TouchableOpacity>
              <TouchableOpacity className="w-12 h-12 flex flex-col items-center justify-center rounded-full bg-[#D9D9D9]">
                <Bell />
              </TouchableOpacity>
            </View>
            <View className="mx-3 flex flex-row my-4 items-center gap-x-5">
              <View className="w-24 h-24 rounded-full border border-third">
                {client?.profile ? (
                  <Image
                    source={{ uri: client?.profile }}
                    className="w-24 h-24 rounded-full"
                  />
                ) : (
                  <Text>{client?.full_name?.slice(0, 2)}</Text>
                )}
              </View>
              <View className="flex flex-col text-center items-center">
                <Text className="text-white text-2xl font-bold mb-3">
                  {client?.full_name}
                </Text>
                <Text className="text-white">{client?.email}</Text>
                <Text className="text-white">{client?.phone_number}</Text>
              </View>
            </View>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <View className="flex-1">
              <View
                style={{
                  paddingBottom:
                    Platform.OS == "ios" ? height * 0.1 : height * 0.004
                }}
                className="flex-1 rounded-t-[2.2rem] py-4 px-4 bg-white"
              >
                <Text className="text-3xl font-bold">Messages</Text>
                <View className="flex-1">
                  <SectionList
                    ref={sectionListRef}
                    className="w-[100%]"
                    showsVerticalScrollIndicator={false}
                    sections={groupedMessages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => renderMessages(item)}
                    getItemLayout={getItemLayout}
                    renderSectionHeader={({ section: { title } }) => (
                      <View style={{ padding: 8 }}>
                        <Text
                          style={{
                            fontWeight: "500",
                            color: "gray",
                            fontSize: 10
                          }}
                        >
                          {title}
                        </Text>
                      </View>
                    )}
                  />
                </View>
                {/* Input Section */}
                <View className="flex flex-col gap-y-2 mt-3">
                  {/* <Text>INPUTS</Text> */}
                  <FlatList data={faqs} renderItem={renderFaqs} />
                  <View
                    style={{
                      shadowColor: "#2B6128",
                      shadowOffset: { width: 0, height: 4 }, // Only shadow on the bottom
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      elevation: 20,
                      borderColor: "#2B6128",
                      borderBottomWidth: 3,
                      borderRightWidth: 1,
                      borderLeftWidth: 1,
                      borderTopWidth: 0,
                      paddingVertical:
                        Platform.OS == "ios" ? height * 0.01 : null
                    }}
                    className="flex flex-row items-center gap-x-2 py-1 rounded-full bg-white px-2 "
                  >
                    <TouchableOpacity>
                      <Search />
                    </TouchableOpacity>
                    <TextInput
                      className="flex-1 max-h-20 "
                      value={query}
                      onChangeText={(e: string) => handleSearch(e)}
                      multiline
                      textAlignVertical="top"
                    />
                  </View>
                  <View className="flex flex-row items-end gap-x-2 rounded-2xl bg-white py-2 px-2 shadow-xl shadow-secondary border border-secondary">
                    <TextInput
                      value={message}
                      onChangeText={(e) => setMessage(e)}
                      className="text-start flex-1  max-h-24"
                      textAlignVertical="top"
                      multiline
                    />
                    <TouchableOpacity
                      onPress={() => handleSendMessage()}
                      className="rounded-full flex flex-col items-center justify-center bg-[#93BD68] w-10 h-10"
                    >
                      <Send />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default Chat;
