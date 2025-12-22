import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const analyzeSession = createAsyncThunk(
  "model/analyze",
  async (sessionId) => {
    const res = await api.post(`/llm/analyze/${sessionId}`);
    return res.data.models;
  }
);

export const fetchModels = createAsyncThunk(
  "model/fetch",
  async (sessionId) => {
    const res = await api.get(`/models/session/${sessionId}`);
    return res.data;
  }
);

const modelSlice = createSlice({
  name: "models",
  initialState: { list: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchModels.rejected, (state) => {
        state.loading = false;
      })
      .addCase(analyzeSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(analyzeSession.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(analyzeSession.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default modelSlice.reducer;
