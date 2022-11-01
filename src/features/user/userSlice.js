/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  email: null,
  token: localStorage.getItem('token'),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { name, email } = action.payload;
      state.name = name;
      state.email = email;
      state.token = localStorage.getItem('token');
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
