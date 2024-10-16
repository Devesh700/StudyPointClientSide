import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;
const version = import.meta.env.VITE_VERSION;

const initialState = {
  user: {},
  searchedUser: {},
  loading: false,
  error: null,
};

// Function to handle API calls with retry logic
const fetchWithRetry = async (url, options, maxRetries, thunkAPI) => {
  let totalRetry = 0;

  while (totalRetry < maxRetries) {
    try {
      const response = await fetch(url, options);

      // Check if the response is ok
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        alert(errorData.message);
        return thunkAPI.rejectWithValue(errorData);
      }

      return await response.json();
    } catch (error) {
      totalRetry++;
      if (totalRetry === maxRetries) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
};

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, thunkAPI) => {
    const response = await fetchWithRetry(
      `${baseUrl}/${version}/users/register`,
      {
        method: "POST",
        body: userData,
      },
      5,
      thunkAPI
    );

    if (response && response.data) {
      alert("Registered successfully");
      sessionStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("accessToken", response.data?.accessToken);
      return response; // Fulfilling the thunk with data
    }
  }
);

// Async thunk for user login
export const logInUser = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    const response = await fetchWithRetry(
      `${baseUrl}/${version}/users/login`,
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      },
      5,
      thunkAPI
    );

    if (response && response.data) {
      alert(response.message);
      sessionStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("accessToken", response?.accessToken);
      return response; // Fulfilling the thunk with data
    }
  }
);

// Async thunk for updating user information
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, thunkAPI) => {
    const sessionData = JSON.parse(sessionStorage.getItem("user"));
    const token = thunkAPI.getState().user.user.accessToken || sessionData?.accessToken;

    if (!token) return; // Handle invalid request if needed

    const response = await fetchWithRetry(
      `${baseUrl}/${version}/users/updateuser`,
      {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
      5,
      thunkAPI
    );

    if (response && response.data) {
      sessionStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("accessToken", response.data?.accessToken);
      return response.data.user;
    }
  }
);

// Async thunk for getting user by ID
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId, thunkAPI) => {
    const sessionData = JSON.parse(sessionStorage.getItem("user"));
    const token = thunkAPI.getState().user.user.accessToken || sessionData?.accessToken;
    const loggedInUserId = thunkAPI.getState().user.user?._id || sessionData?.user?._id;
    const isLoggedInUser = loggedInUserId === userId;

    const url = (token && isLoggedInUser)
      ? `${baseUrl}/${version}/users`
      : `${baseUrl}/${version}/users/${userId}`;

    const response = await fetchWithRetry(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }, 5, thunkAPI);

    return response ? response.data : null;
  }
);

// Slice for user state
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducer for updating user state directly
    updateState: (state, action) => {
      state.user = action.payload;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(logInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        const loggedInUserId = JSON.parse(sessionStorage.getItem("user"))?.user?._id;
        if (loggedInUserId === action.payload?._id) {
          state.user = action.payload;
        } else {
          state.searchedUser = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
export const { updateState, resetState } = userSlice.actions;
