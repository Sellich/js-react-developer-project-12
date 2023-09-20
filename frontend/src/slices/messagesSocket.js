import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSocket = '';

const messagesSlice = createSlice({
  name: 'messages',
  initialState,

});

export default messagesSlice.reducer;