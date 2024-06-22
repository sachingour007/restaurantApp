import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { json } from "react-router-dom";
const apiUrl = import.meta.env.VITE_APP_API_URL;
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Check if response is not OK
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        console.log(errorData);
        return rejectWithValue(errorData.message || "Failed to register");
      } else {
        toast.success("Register succesfully");
      }

      const retrn_response = await response.json();
      console.log(retrn_response);
      return retrn_response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginCred, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCred),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        return rejectWithValue(errorData.message || "Failed to Login");
      } else {
        toast.success("login succesfully");
      }

      const Data = await response.json();
      const { accesToken, refreshToken, userCopy } = Data.data;
      Cookies.set("accessToken", accesToken, { expires: 7, secure: true });
      Cookies.set("refreshToken", refreshToken, { expires: 7, secure: true });
      localStorage.setItem("userDetailes", JSON.stringify(userCopy));
      console.log(Data);
      return Data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
      });

      if (response.status === 401) {
        //Try refresh Token
        const refreshResponse = await fetch(`${apiUrl}/auth/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        });

        if (refreshResponse.ok) {
          const newTokenData = await refreshResponse.json();
          console.log("new Token", newTokenData.accesToken);
          Cookies.set("accessToken", newTokenData.accesToken, {
            expires: 7,
            secure: true,
          });
          Cookies.set("refreshToken", newTokenData.refreshToken, {
            expires: 7,
            secure: true,
          });

          //Logout Api
          const response = await fetch(`${apiUrl}/auth/logout`, {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
            },
            credentials: "include",
          });

          if (!response.ok) {
            const data = await response.json();
            toast.error("Failed to logout");
            return rejectWithValue(data.message || "Failed to logout");
          }
          const data = await response.json();
          console.log("logout user Data", data);
          toast.success(data.message);
          localStorage.removeItem("userDetailes");
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          return data;
        } else {
          console.log("new Token ", newTokenData);
          toast.success(newTokenData.message);
          localStorage.removeItem("userDetailes");
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          return newTokenData;
        }
      }

      if (!response.ok) {
        const data = await response.json();
        toast.error("Failed to logout");
        return rejectWithValue(data.message || "Failed to logout");
      }

      const data = await response.json();
      console.log("logout user Data", data);
      toast.success(data.message);
      localStorage.removeItem("userDetailes");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticate: false,
    success: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticate = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticate = true; // User is Authenticated
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticate = false; //User is Logout
        state.success = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
