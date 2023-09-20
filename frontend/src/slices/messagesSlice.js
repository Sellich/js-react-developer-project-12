import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchChannels } from "./channelsSlice";

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      if (action.payload.channelId === 1) {
        messagesAdapter.addOne(state, action);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, {payload}) => {
      messagesAdapter.addMany(state, payload.messages);
    })
  }
})

export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
