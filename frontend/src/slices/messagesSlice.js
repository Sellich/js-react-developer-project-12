import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import channelsSlice, { fetchChannels } from "./channelsSlice";

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, {payload}) => {
      messagesAdapter.addMany(state, payload.messages);
    })
  }
})

export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export const {actions} = channelsSlice;
export default messagesSlice.reducer;
