import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;
const version = import.meta.env.VITE_VERSION;

const initialState = {
  user: {},
  loading: false,
  error: null,
};

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/${version}/users/register`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is ok
      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }

      const resData = await response.json();
      return resData; // Fulfilling the thunk with data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Handling errors and rejecting the thunk
    }
  }
);

export const logInUser=createAsyncThunk("/user/login",
  async (userData,thunkAPI)=>{
      console.log(document.cookie);
      try{
        const response=await fetch(`${baseUrl}/${version}/users/login`,{
          method:"POST",
          body:JSON.stringify(userData),
          headers:{
            "Content-Type":"application/json"
          }
        })
        const data=await response.json();
        if(!response.ok){
          return  thunkAPI.rejectWithValue(data);
        }
        return data;

      } catch(err){
        return thunkAPI.rejectWithValue(err.message);
      }
  }
)

// Slice for user state
const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    // Reducer for updating user state directly
    UpdateState: (state, action) => {
      state.user = action.payload;
    },
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
  },
});

export default userSlice.reducer;
export const { UpdateState } = userSlice.actions;
