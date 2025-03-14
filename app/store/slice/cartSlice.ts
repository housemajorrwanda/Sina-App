import { url } from "@/app/components/url";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
interface Accompaniment {
  id: string;
  name: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  
}

interface CartProduct extends Product {
  quantity: number;
  accompaniments: Accompaniment[];
  orderTime?: string;
}

interface CartState {
  amount: number;
  products: CartProduct[];
  selectedProduct: any;
  paymentData:{};
  loading: boolean;
  paymentModal:boolean;
  orders:any[],
  error: any | null;
}

const initialState: CartState = {
  amount: 0,
  products: [],
  selectedProduct: null,
  loading: false,
  paymentData: {},
  paymentModal: false,
  orders:[],
  error: null
};
interface PaymentInterface{
    phone_number: string,
    amount: number
}
interface PaymentCheckInterface{
    id:string
}
export const Payment = createAsyncThunk<any, PaymentInterface, any>(
    "Product/Payment",
    async (kwargs: any, { rejectWithValue }) => {
      const token = await AsyncStorage.getItem("accessToken");
  
      if (!token) {
        throw new Error("User is not authenticated");
      }
  
      try {
        const headers = new Headers({ "Content-Type": "application/json" });
        headers.append("Authorization", `Token ${token}`);
        console.log(kwargs?.phone_number)
        console.log(kwargs?.amount)
        const response = await fetch(`${url}/payments/`, {
          method: "POST",
          headers,
          body: JSON.stringify({ phone_number: kwargs?.phone_number, amount: kwargs?.amount }),
        });
  
        const data = await response.json();
        console.log(data);
  
        if (!response.ok) {
          return rejectWithValue(data);
        }
  
        return data;
      } catch (error) {
        console.log("Error: ", error);
        return rejectWithValue(error); // Ensure error is properly handled
      }
    }
  );
  export const PaymentCheck = createAsyncThunk<any, PaymentCheckInterface, any>(
    "Product/CheckPayment",
    async (kwargs: any, { rejectWithValue }) => {
      const token = await AsyncStorage.getItem("accessToken");
  
      if (!token) {
        return rejectWithValue("User is not authenticated");
      }
  
      if (!kwargs?.id) {
        return rejectWithValue("Payment ID is required");
      }
  
      try {
        const headers = new Headers({
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,  // Change to "Bearer" if needed
        });
  
        const response = await fetch(`${url}/payments/paymentCheck/${kwargs.id}`, {
          method: "GET",
          headers,
          redirect: "follow",
        });
  
        let data;
        try {
          data = await response.json(); // Ensure valid JSON
        } catch (jsonError) {
          return rejectWithValue("Invalid response from server");
        }
  
        console.log("returned data", data);
  
        if (!response.ok) {
          return rejectWithValue(data);
        }
  
        return data;
      } catch (error: any) {
        console.log("Error: ", error);
        return rejectWithValue(error?.message || "Unknown error occurred");
      }
    }
  );
  
  // Creating Orders Slice
  export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (kwargs:{cartItems:[],phone_number:string}, { getState, rejectWithValue }:any) => {
      try {
        if (!Array.isArray(kwargs?.cartItems)) {
          return rejectWithValue("Invalid cart data");
        }
  
        const token = await AsyncStorage.getItem("accessToken");
  
        const product_ids = kwargs?.cartItems
          .filter((item:any) => !item.category) // No category = Product
          .map((item:any) => item.id);
  
        const food_ids = kwargs?.cartItems
          .filter((item:any) => item.category) // Has category = Food
          .map((item:any) => item.id);
  
        const accompaniment_ids = kwargs?.cartItems
          .flatMap((item:any) => item.accompaniments || []) // Avoid undefined errors
          .map((acc:any) => acc.id);
  
        const orderPayload = { product_ids, food_ids, accompaniment_ids,phone_number:kwargs?.phone_number };
        console.log("orderPayload",orderPayload)
        const response = await axios.post(
          `${url}/products/orders/`,
          orderPayload,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        return response.data;
      } catch (error:any) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  
// ✅ Fetch all orders for the logged-in user
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");; // Get token from Redux state
      const response = await axios.get(`${url}/products/orders/`, {
        headers: {
          Authorization: `Token ${token}`, // Add authentication token
        },
      });
      // console.log("data",response.data)
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<any | null>) => {
      state.selectedProduct = action.payload;
    },
    updatePaymentModal:(state:any,action:PayloadAction<{isVisible:boolean}>)=>{
      state.paymentModal=action?.payload?.isVisible
    },
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity?: number;
        accompaniments?: Accompaniment[];
      }>
    ) => {
      const { product, quantity = 1, accompaniments = [] } = action.payload;
      const existingProduct = state.products.find((p) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += quantity;
        existingProduct.accompaniments = [
          ...existingProduct.accompaniments,
          ...accompaniments.filter(
            (acc) =>
              !existingProduct.accompaniments.some((a) => a.id === acc.id)
          )
        ];
      } else {
        state.products.push({
          ...product,
          quantity,
          accompaniments,
          orderTime: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          })
        });
      }

      // Update total amount
      state.amount = state.products.reduce(
        (total, p) =>
          total +
          p.price * p.quantity +
          p.accompaniments.reduce((accTotal, acc) => accTotal + acc.price, 0) *
            p.quantity,
        0
      );
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const existingProduct = state.products.find((p) => p.id === product.id);

      if (existingProduct) {
        if (existingProduct.quantity > quantity) {
          existingProduct.quantity -= quantity;
        } else {
          state.products = state.products.filter((p) => p.id !== product.id);
        }
      }

      // Update total amount
      state.amount = state.products.reduce(
        (total, p) =>
          total +
          p.price * p.quantity +
          p.accompaniments.reduce((accTotal, acc) => accTotal + acc.price, 0) *
            p.quantity,
        0
      );
    },

    addAccompanimentToCart: (
      state,
      action: PayloadAction<{ productId: string; accompaniment: Accompaniment }>
    ) => {
      const { productId, accompaniment } = action.payload;
      const existingProduct = state.products.find((p) => p.id === productId);

      if (existingProduct) {
        const accompanimentIndex = existingProduct.accompaniments.findIndex(
          (a) => a.id === accompaniment.id
        );

        if (accompanimentIndex !== -1) {
          // ❌ Remove accompaniment if it already exists
          existingProduct.accompaniments.splice(accompanimentIndex, 1);
        } else {
          // ✅ Add accompaniment if it does not exist
          existingProduct.accompaniments.push(accompaniment);
        }
      }

      // Update total amount
      state.amount = state.products.reduce(
        (total, p) =>
          total +
          p.price * p.quantity +
          p.accompaniments.reduce((accTotal, acc) => accTotal + acc.price, 0) *
            p.quantity,
        0
      );
    },
    clearCart:(state)=>{
      state.products=[],
      state.amount=0,
      state.selectedProduct=null,
      state.paymentModal=false,
      state.error=null
    }
   
  },
  
  extraReducers(builder) {
    builder
      .addCase(Payment.pending, (state) => {
        state.loading = true;
      })
      .addCase(Payment.fulfilled, (state, action) => {
        if(action?.payload?.status !='pending'){
          state.loading = false;
        }
        state.paymentData=action?.payload
       
      })
      .addCase(Payment.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(PaymentCheck.pending, (state) => {
        state.loading = true;
      })
      .addCase(PaymentCheck.fulfilled, (state, action) => {
        // console.log(action?.payload?.data)
        // state.loading=true
        if(action?.payload?.data?.status !='pending'){
            state.loading = false;
        }
        state.paymentData=action?.payload
        
      })
      .addCase(PaymentCheck.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = [action.payload, ...state.orders];

      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload?.data;

      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  setSelectedProduct,
  addToCart,
  removeFromCart,
  addAccompanimentToCart,
  updatePaymentModal,
  clearCart
} = cartSlice.actions;
export default cartSlice.reducer;
