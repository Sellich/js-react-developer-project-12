import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

export const fetchChannels = createAsyncThunk(
  '/api/v1/data',
  async (token) => {
    try {
      const response = await axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
)

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, {payload}) => {
      channelsAdapter.addMany(state, payload.channels);
    })
  }
})

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const {actions} = channelsSlice;
export default channelsSlice.reducer;