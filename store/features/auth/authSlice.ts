import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  userName: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  userName: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk<LoginResponse, LoginPayload, { rejectValue: string }>(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        return thunkApi.rejectWithValue("Invalid email or password");
      }

      const data = (await response.json()) as LoginResponse;
      return data;
    } catch {
      return thunkApi.rejectWithValue("Something went wrong. Please try again.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.userName = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.userName = action.meta.arg.email.split("@")[0] ?? "user";
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
