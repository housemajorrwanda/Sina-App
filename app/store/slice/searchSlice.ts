// store/slice/searchSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialState{
    results:any
}
const initialState:any = {
  results: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<any[]>) => {
      state.results = action.payload;
    },
  },
});

export const { setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
