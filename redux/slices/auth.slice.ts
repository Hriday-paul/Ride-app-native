import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  authToken: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    name: string;
    email: string | null;
    phone: string;
    image: string | null;
    role: "Driver" | "User"
  } | null;
};

const initialState: AuthState = {
  authToken: null,
  accessToken: null,
  refreshToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string; refreshToken: string; user: AuthState['user'] }>) => {
      state.authToken = null;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.authToken = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout, setTokens } = authSlice.actions;
export default authSlice.reducer;