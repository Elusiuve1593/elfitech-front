import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { EventsSlice, Participant, RegistrationFormType } from "../interfaces";
import { fetchEventsReducer, fetchParticipantsReducer } from "./slice";
import toast from "react-hot-toast";
import { setPreloader } from "../preloader/slice";

const style = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
  fontSize: "20px",
};

export const fetchEventsThunk = createAsyncThunk(
  "events/fetchEvents",
  async (
    param: { page: number; limit: number },
    { rejectWithValue, dispatch }
  ) => {
    dispatch(setPreloader({ set: true }));
    try {
      const res = await axios.get<EventsSlice>(
        `http://localhost:3000/?page=${param.page}&limit=${param.limit}`
      );
      dispatch(fetchEventsReducer({ data: res.data }));
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<any>;
        if (axiosError.response?.data) {
          toast.error(axiosError.response?.data.message, { style });
        }
        if (axiosError.message === "Network Error") {
          toast.error(axiosError.message, { style });
        }
        return rejectWithValue(err.response?.data);
      }
      return rejectWithValue(err.message);
    } finally {
      dispatch(setPreloader({ set: false }));
    }
  }
);

export const createParticipantThunk = createAsyncThunk(
  "events/participants",
  async (
    param: { participantInfo: RegistrationFormType },
    { rejectWithValue, dispatch }
  ) => {
    dispatch(setPreloader({ set: true }));
    try {
      const res = await axios.post<Participant>(
        `http://localhost:3000/registration`,
        param.participantInfo
      );
      dispatch(fetchParticipantsReducer({ data: res.data }));
      toast.success("Participant created succeeded", { style });
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<any>;
        if (axiosError.response?.data) {
          toast.error(axiosError.response?.data.message, { style });
        }
        if (axiosError.message === "Network Error") {
          toast.error(axiosError.message, { style });
        }
        return rejectWithValue(err.response?.data);
      }
      return rejectWithValue(err.message);
    } finally {
      dispatch(setPreloader({ set: false }));
    }
  }
);
