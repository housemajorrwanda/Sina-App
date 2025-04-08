import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createAction
} from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "@/app/components/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
export interface ChatRoom {
  id: string;
  last_message: string;
  updated_at: string;
  created_at: string;
}

export interface Message {
  id: string;
  chat_room: string;
  sender: string;
  message: string;
  created_at: string;
}

export interface ChatState {
  chatRooms: ChatRoom[];
  messages: [];
  chatting_profile: {};
  loading: boolean;
  error: string | null;
}

// API Base URL
// const API_URL = "https://your-backend-url.com/api";

// ✅ Fetch all chat rooms for the user
export const fetchChatRooms = createAsyncThunk<
  ChatRoom[],
  void,
  { rejectValue: string }
>("chat/fetchChatRooms", async (_, { rejectWithValue }) => {
  const token = await AsyncStorage.getItem("accessToken");
  try {
    const response = await axios.get(`${url}/messages/room/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json"
      }
    });
    // console.log(response)
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data || "Error fetching chat rooms");
  }
});

// ✅ Fetch messages for a chat room
export const fetchMessages = createAsyncThunk<
  Message[],
  any,
  { rejectValue: string }
>("chat/fetchMessages", async (chatRoomId:any, { rejectWithValue }) => {
  try {
    const token=await AsyncStorage.getItem("accessToken")
    // console.log("token",token)
    const response = await axios.get(
      `${url}/messages/room/${chatRoomId}/messages/`,{
        headers: {
          Authorization: `Token ${token}`,
        }
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error)
    return rejectWithValue(error.response.data || "Error fetching messages");
  }
});

// ✅ Send a message
export const sendMessage = createAsyncThunk<
  Message,
  { chatRoomId: any; message: any },
  { rejectValue: string }
>("chat/sendMessage", async ({ chatRoomId, message }, { rejectWithValue }) => {
  try {
    const token=await AsyncStorage.getItem("accessToken")
    const response = await axios.post(`${url}/messages/${chatRoomId}`, {
      
      chat_room: chatRoomId,
      message
    },{
      headers:{
        Authorization: `Token ${token}`,
      }
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data || "Error sending message");
  }
});

// ✅ Chat Slice
const initialState: ChatState = {
  chatRooms: [],
  messages: [],
  chatting_profile: {},
  loading: false,
  error: null
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeProfile: (state, action: PayloadAction<Record<string, any>>) => {
      state.chatting_profile = {};
      state.chatting_profile = action.payload;
      console.log("",action?.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching chat rooms
      .addCase(fetchChatRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchChatRooms.fulfilled,
        (state, action: PayloadAction<ChatRoom[]>) => {
          state.loading = false;
          state.chatRooms = action.payload;
        }
      )
      .addCase(fetchChatRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load chat rooms";
      })

    // Handle fetching messages
    .addCase(fetchMessages.fulfilled, (state:any, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    })
    .addCase(fetchMessages.rejected, (state:any, action) => {
      state.messages = action.payload;
    })

    // Handle sending messages
    .addCase(sendMessage.fulfilled, (state, action: PayloadAction<Message>) => {
      const chatRoomId = action.payload.chat_room;
      console.log(action.payload)
    });
  }
});
export const { changeProfile } = chatSlice.actions;

export default chatSlice.reducer;
