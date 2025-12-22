import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const createSession = createAsyncThunk(
  "session/create",
  async (data) => {
    const res = await api.post("/sessions", data);
    return res.data.session;
  }
);

export const fetchSessions = createAsyncThunk(
  "session/fetch",
  async () => {
    const res = await api.get("/sessions");
    return res.data;
  }
);

const sessionSlice = createSlice({
  name: "sessions",
  initialState: { list: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export default sessionSlice.reducer;
