import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [],
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    addRoom: (state, action) => {
      state.rooms.push(action.payload);
    },
  },
});

export const { addRoom } = roomSlice.actions;

export default roomSlice.reducer;
