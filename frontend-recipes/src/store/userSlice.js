import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "utils/Api.js";
import jwt_decode from "jwt-decode";

export const registration = createAsyncThunk("users/registration", async (userData) => {
  try {
    await client.post("auth/registration", userData);
  } catch (e) {
    throw Error(e.message);
  }
});

export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const res = await client.post("auth/login", userData);
    localStorage.setItem("token", res.data.token);
    return res.data.token;
  } catch (e) {
    throw Error(e.message);
  }
});

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await client.get("auth/users", { Authorization: `Bearer ${token}` });
    return res.data;
  } catch (e) {
    throw Error(e.message);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: {
      id: "",
      email: "",
    },
    isLogin: false,
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      try {
        localStorage.removeItem("token");
        state.isLogin = false;
      } catch (error) {
        console.log(error);
      }
    },
    checkToken(state) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          state.isLogin = false;
          return;
        }
        const { id, email, exp } = jwt_decode(token);
        const currentDate = new Date();
        if (exp * 1000 < currentDate.getTime()) {
          state.isLogin = false;
          return;
        }
        state.user = { id, email };
        state.isLogin = true;
      } catch (e) {
        console.log(e);
      }
    },
  },

  extraReducers(builder) {
    builder.addCase(registration.fulfilled, (state) => {
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(registration.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(login.fulfilled, (state) => {
      state.status = "succeeded";
      state.error = null;
      state.isLogin = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(getUsers.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getUsers.fulfilled, (state) => {
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { logout, checkToken } = userSlice.actions;

export default userSlice.reducer;
