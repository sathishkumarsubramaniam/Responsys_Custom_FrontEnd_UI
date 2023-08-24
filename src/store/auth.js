import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RequestHandler from "../services/requestHandler.js";
import { AUTHENTICATION } from "./utils.js";

const reqHandler = new RequestHandler();

export const userAuthenticate = createAsyncThunk(
  AUTHENTICATION.authenticateAction,
  async (dataInput, { rejectWithValue }) => {
    try {
      const res = await reqHandler.authenticate(
        AUTHENTICATION.endPoint,
        dataInput
      );
      if (res.status === 200) {
        const { authToken, endPoint } = res.data;
        const setRequestDefaults = reqHandler.setRequestDefaults({
          authToken,
          endPoint,
        });
        Promise.resolve(setRequestDefaults);
      }
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.title) {
        return rejectWithValue(error.response.data.title);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authToken: "",
    endPoint: "",
    issuedAt: 0,
  },
  reducers: {
    userAuthenticated: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(userAuthenticate.fulfilled, (state, action) => {
      const { authToken, endPoint, issuedAt } = action.payload;
      state.authToken = authToken;
      state.endPoint = endPoint;
      state.issuedAt = issuedAt;
    });
  },
});

export const { userAuthenticated } = authSlice.actions;
export default authSlice.reducer;
