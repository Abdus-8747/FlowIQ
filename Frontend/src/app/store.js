import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import sessionReducer from "../features/session/sessionSlice";
import modelReducer from "../features/model/modelSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sessions: sessionReducer,
    models: modelReducer,
  },
});
