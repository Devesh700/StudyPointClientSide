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
        body: userData,
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });

      // Check if the response is ok
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData?.stack?errorData?.stack[0]:"error registering the user")
        return thunkAPI.rejectWithValue(errorData);
      }

      const resData = await response.json();
      alert("registered successfully");
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
          alert(data.message)
          return  thunkAPI.rejectWithValue(data);
        }
        alert(data.message)
        return data;

      } catch(err){
        return thunkAPI.rejectWithValue(err.message);
      }
  }
)

export const updateUser=createAsyncThunk(
  "updateUser",
  async(userData,thunkAPI)=>{
    let sessionData=JSON.parse(sessionStorage.getItem("user"))
    let token=thunkAPI.getState().user.user.accessToken || sessionData.accessToken;
    if(!token)
    return //alert("invalid request");
  console.log(userData)
  console.log(userData.journey)
  console.log(token)
    try {
      const response=await fetch(`${baseUrl}/${version}/users/updateuser`,{
        method:"PUT",
        body:JSON.stringify(userData),
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      })
      let result=await response.json();
      if(!result.ok){
        console.log(result)
        alert(result.message)
        //alert(rejected)
      return thunkAPI.rejectWithValue(result);
      }
      // alert(result.message)
      sessionStorage.setItem("user",JSON.stringify(result.data));
      localStorage.setItem("accessToken",result?.data?.accessToken)
    return result.data?.user
    } catch (error) {
      console.log(error)
      //alert(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)


export const getUserById=createAsyncThunk(
  "getUserById",
  async(userId,thunkAPI)=>{
    let sessionData=JSON.parse(sessionStorage.getItem("user"))
    let token=thunkAPI.getState().user.user.accessToken || sessionData.accessToken;
    if(!token)
    return //alert("invalid request");
  console.log(token)
    try {
      const response=await fetch(`${baseUrl}/${version}/users/${userId}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      })
      let result=await response.json();
      if(!result.ok){
        console.log(result)
        alert(result.message)
        //alert(rejected)
      return thunkAPI.rejectWithValue(result);
      }
      //alert(result.message)
    return result.data
    } catch (error) {
      console.log(error)
      //alert(error)
      return thunkAPI.rejectWithValue(error)
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
    resetState:(state)=>{
      return initialState;
    }
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
        state.user = action.payload;
        
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
      })
  },
});

export default userSlice.reducer;
export const { UpdateState,resetState } = userSlice.actions;
