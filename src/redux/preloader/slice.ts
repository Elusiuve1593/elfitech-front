import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false as boolean,
};

const preloaderSlice = createSlice({
  name: "preloader",
  initialState,
  reducers: {
    setPreloader(state, action: PayloadAction<{ set: boolean }>) {
      state.isLoading = action.payload.set;
    },
  },
});

export const { setPreloader } = preloaderSlice.actions;
export default preloaderSlice.reducer;
