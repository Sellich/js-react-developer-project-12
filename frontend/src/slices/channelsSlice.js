import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({currentChannelId: null});

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
  reducers: {
    toggleChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: (state, action) => {
      channelsAdapter.addOne(state, action.payload);
      state.currentChannelId = action.payload.id;
    },
    removeChannel: (state, action) => {
      if(action.payload === 1 || action.payload === 2) {
        return;
      }

      channelsAdapter.removeOne(state, action.payload);

      if(state.currentChannelId === action.payload) {
        state.currentChannelId = 1;
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, {payload}) => {
      state.currentChannelId = payload.currentChannelId;
      channelsAdapter.addMany(state, payload.channels);
    })
  }
})

export const channelsSelectors = channelsAdapter.getSelectors((state) => state);
export const {addChannel, removeChannel, toggleChannel} = channelsSlice.actions;
export default channelsSlice.reducer;