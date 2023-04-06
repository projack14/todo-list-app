import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  uname: "",
  token: "",
};

const sliceState = createSlice({
  name: "state",
  initialState: initialState,
  reducers: {
    handleAuth: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.uname = action.payload.uname;
      state.token = action.payload.token;
    },
  },
});

const reducer = {
  state: sliceState.reducer,
};

export const { handleAuth } = sliceState.actions;
export default reducer;
