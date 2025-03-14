import { url } from "@/app/components/url";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface initialState {
  loading: boolean;
  categories: string[];
  products: any[];
  foodsCategories:any[];
  shopCategories: string[];
  error: string | null;
}

// ** Fetch Product Categories **
export const GetCategories = createAsyncThunk(
  "Products/GetCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/products/category`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue({ error: "Failed to fetch categories" });
      }
      return data.data;
    } catch (error) {
      return rejectWithValue({ error: "Failed to fetch categories" });
    }
  }
);
export const GetCategoryProducts = createAsyncThunk(
  "Products/GetCategoryProducts",
  async (kwargs:any, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/products/category/${kwargs?.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue({ error: "Failed to fetch categories" });
      }
      // console.log("category products",data)
      return data.data;
    } catch (error) {
      return rejectWithValue({ error: "Failed to fetch categories" });
    }
  }
);

// ** Fetch Products **
export const GetProducts = createAsyncThunk(
  "Products/GetProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/products`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue({ error: "Failed to fetch products" });
      }
      return data.data;
    } catch (error) {
      return rejectWithValue({ error: "Failed to fetch products" });
    }
  }
);

// ** Fetch Shop Categories **
export const GetShopCategories = createAsyncThunk(
  "Products/GetShopCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/products/shopcategory/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue({ error: "Failed to fetch shop categories" });
      }
      return data.data;
    } catch (error) {
      return rejectWithValue({ error: "Failed to fetch shop categories" });
    }
  }
);
export const GetfoodCategories=createAsyncThunk("Products/GetFoodCategories", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${url}/products/foodcategory/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      return rejectWithValue({ error: "Failed to fetch food categories" });
    }
    return data.data;
  } catch (error) {
    return rejectWithValue({ error: "Failed to fetch food categories" });
  }
})

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    categories: [],
    products: [],
    shopCategories: [],
    foodsCategories:[],
    error: null,
  } as initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // ** Handle GetCategories **
      .addCase(GetCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(GetCategories.rejected, (state, action:any) => {
        state.loading = false;
        state.error = action.payload?.error || "Error fetching categories";
      })
    builder
      // ** Handle GetCategoryProducts **
      .addCase(GetCategoryProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetCategoryProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(GetCategoryProducts.rejected, (state, action:any) => {
        state.loading = false;
        state.error = action.payload?.error || "Error fetching categories";
      })
    

      // ** Handle GetProducts **
      .addCase(GetProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(GetProducts.rejected, (state, action:any) => {
        state.loading = false;
        state.error = action.payload?.error || "Error fetching products";
      })

      // ** Handle GetShopCategories **
      .addCase(GetShopCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetShopCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.shopCategories = action.payload;
      })
      .addCase(GetShopCategories.rejected, (state, action:any) => {
        state.loading = false;
        state.error = action.payload?.error || "Error fetching shop categories";
      });
      // ** Handle GetfoodCategories **
      builder
      .addCase(GetfoodCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetfoodCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.foodsCategories = action.payload;
      })
      .addCase(GetfoodCategories.rejected, (state, action:any) => {
        state.loading = false;
        state.error = action.payload?.error || "Error fetching shop categories";
      });
  },
});

export default productSlice.reducer;
