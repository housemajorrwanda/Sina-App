import { url } from "@/app/components/url";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
interface LoginPayload {
  phone_number: string;
  password: string;
}
interface RegisterPayload {
  phone_number: string;
  password: string;
  full_name: string;
  email: string;
}
interface LoginState {
  user: any | null; // Replace `any` with the actual user type if available
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  user: null,
  loading: false,
  error: null
};
interface LoginResponse {
  token: string; // example, adjust based on your response
  user: any; // Define the user type if you have one
}

interface LoginError {
  error: string | null;
}
interface ProfileUpdatePayload {
  full_name?: string;
  email?: string;
  profile?: {
    uri: string;
    fileName?: string;
    type?: string;
  };
}
interface ProfileResponse {
  user_data: {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    profile: string;
    is_staff: boolean;
  };
}
// Async thunk for login
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: LoginError }
>("auth/login", async (credentials: LoginPayload, { rejectWithValue }) => {
  try {
    const response = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({ error: errorData.error || "Login failed" });
    }

    const data = await response.json();
    await AsyncStorage.setItem("accessToken", data?.accessToken);
    // await AsyncStorage.setItem("refreshToken", data?.refreshToken);
    return data;
  } catch (error) {
    // console.log(error)
    return rejectWithValue({ error: "Network error occurred" });
  }
});
export const RegisterUser = createAsyncThunk<
  LoginResponse,
  RegisterPayload,
  { rejectValue: LoginError }
>(
  "auth/register",
  async (credentials: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({ error: errorData.error || "Login failed" });
      }

      const data = await response.json();
      // await AsyncStorage.setItem("accessToken", data?.accessToken);
      // await AsyncStorage.setItem("refreshToken", data?.refreshToken);
      return data?.user_data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({ error: "Network error occurred" });
    }
  }
);

export const getProfile = createAsyncThunk(
  "login/getProfile",
  async (_, { rejectWithValue }) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) return rejectWithValue({ error: "No token found" });
    try {
      const result = await fetch(`${url}/auth/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
        method: "GET",
        redirect: "follow"
      });
      if (!result.ok)
        return rejectWithValue({ error: "Failed to fetch profile" });
      const data = await result.json();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({ error: "unknown error" });
    }
  }
);
//Updating User Profile
export const updateProfilePartial = createAsyncThunk<ProfileResponse, ProfileUpdatePayload>(
  'user/updateProfilePartial',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) throw new Error('Authentication token not found');

      const formData = new FormData();

      // Append only provided fields
      Object.entries(profileData).forEach(([key, value]) => {
        if (value) {
          if (key === 'profile' && typeof value === 'object' && 'uri' in value) {
            formData.append('profile', {
              uri: value.uri,
              name: value.fileName || 'profile.jpg',
              type: value.type || 'image/jpeg',
            } as any); // `as any` because FormData.append doesn't have strong type support
          } else {
            formData.append(key, value as string);
          }
        }
      });

      const response = await axios.put<ProfileResponse>(`${url}/auth/profile`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to update profile');
    }
  }
);
//Reset Password
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string; }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");

      const response = await axios.patch(
        `${url}/auth/profile`,
        { old_password: oldPassword, new_password: newPassword },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || "Failed to update password");
    }
  }
);
// Create the login slice
const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error ?? "Unknown error occurred";
      });
    //Register User
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Unknown error occurred";
      });
    //Getting User Profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.error ?? "Unknown error occurred";
      });
      // Partial profile update (PATCH)
      builder.addCase(updateProfilePartial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfilePartial.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfilePartial.rejected, (state, action) => {
        state.loading = false;
        
      });
      // Change Password
      builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        // state.successMessage = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload;
      });
  }
});

export default loginSlice.reducer;
