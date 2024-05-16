import { ThunkAction, configureStore, Action } from "@reduxjs/toolkit";
import eventsSlice from "./events/slice";
import preloaderSlice from "./preloader/slice";

const reducer = {
  events: eventsSlice,
  preloader: preloaderSlice,
};

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
export default store;
