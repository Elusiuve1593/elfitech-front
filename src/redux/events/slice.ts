import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EventsSlice, Participant } from "../interfaces";

const initialState: EventsSlice = {
  docs: [],
  page: 1,
  limit: 8,
  totalPages: 0,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    fetchEventsReducer(state, action: PayloadAction<{ data: EventsSlice }>) {
      state.docs = action.payload.data.docs;
      state.totalPages = action.payload.data.totalPages;
    },
    fetchParticipantsReducer(
      state,
      action: PayloadAction<{ data: Participant }>
    ) {
      const { _id } = action.payload.data;
      const eventIndex = state.docs.findIndex((doc) => doc._id === _id);
      if (eventIndex !== -1) {
        state.docs[eventIndex].participants.push(action.payload.data);
      }
    },
    setPageReducer(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    nextPageReducer(state) {
      if (state.page < state.totalPages) {
        state.page += 1;
      }
    },
    previousPageReducer(state) {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
  },
});

export const {
  fetchEventsReducer,
  setPageReducer,
  nextPageReducer,
  previousPageReducer,
  fetchParticipantsReducer,
} = eventsSlice.actions;
export default eventsSlice.reducer;
