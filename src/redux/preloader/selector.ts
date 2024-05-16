import { RootState } from "../store";

export const setPreloader = (state: RootState) => state.preloader.isLoading;
