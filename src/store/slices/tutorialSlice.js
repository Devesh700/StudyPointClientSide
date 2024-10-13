import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  SkillTitle: {},
  allTitle: [],
  allTitleFetchTime: null,
  subTitle: [],
  Topics: [],
  loading: false,
  error: null,
};

const baseUrl = import.meta.env.VITE_BASE_URL;
const version = import.meta.env.VITE_VERSION;

// Retry logic function
const fetchWithRetry = async (url, options, retries = 3) => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response;
    } catch (error) {
      attempt++;
      if (attempt >= retries) {
        throw error;
      }
    }
  }
};

export const getAllSkillTitle = createAsyncThunk(
  "getallSkillTitle",
  async (_, thunkApi) => {
    const state = thunkApi.getState().tutorials;
    const lastFetchedTime = state.allTitleFetchTime;
    const currentTime = new Date().getTime();
    const difference = currentTime - lastFetchedTime;

    if (lastFetchedTime && difference < 2000) return state.allTitle;

    try {
      const response = await fetchWithRetry(`${baseUrl}/${version}/skilltitle/get/all`, {
        method: "GET",
      });
      const result = await response.json();
      if (!result.ok) {
        alert(result.message);
        return thunkApi.rejectWithValue(result);
      } else {
        return result.data;
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getSkillTitleById = createAsyncThunk(
  "getSkillTitleById",
  async (_id, thunkApi) => {
    if (!_id) {
      return;
    }

    try {
      const response = await fetchWithRetry(`${baseUrl}/${version}/skilltitle/${_id}`, {
        method: "GET",
      });
      const res = await response.json();
      if (!res.ok) {
        alert(res.message);
        return thunkApi.rejectWithValue(res);
      } else {
        return thunkApi.fulfillWithValue(res.data);
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getTopicById = createAsyncThunk(
  "getTopicById",
  async (_id, thunkApi) => {
    if (!_id) {
      return;
    }

    try {
      const response = await fetchWithRetry(`${baseUrl}/${version}/topics/${_id}`, {
        method: "GET",
      });
      const res = await response.json();
      if (!res.ok) {
        alert(res.message);
        return thunkApi.rejectWithValue(res);
      } else {
        return thunkApi.fulfillWithValue(res.data);
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addSkillTitle = createAsyncThunk(
  "addSkillTitle",
  async (title, thunkApi) => {
    if (!title) {
      return;
    }
    let token = thunkApi.getState().user?.user?.accessToken || JSON.parse(sessionStorage.getItem("user"))?.accessToken;
    try {
      const response = await fetchWithRetry(`${baseUrl}/${version}/skilltitle/add`, {
        method: "POST",
        body: JSON.stringify({ title }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!result.ok) {
        return thunkApi.rejectWithValue(result);
      }
      return result;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const tutorialSlice = createSlice({
  name: "tutorialSlice",
  initialState,
  reducers: {
    updateTutorial: (state, action) => {
      state.SkillTitle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSkillTitleById.fulfilled, (state, action) => {
        state.SkillTitle = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getSkillTitleById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSkillTitleById.rejected, (state, action) => {
        state.SkillTitle = action.payload;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getTopicById.fulfilled, (state, action) => {
        state.Topics = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getTopicById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTopicById.rejected, (state, action) => {
        state.Topics = action.payload;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getAllSkillTitle.fulfilled, (state, action) => {
        state.allTitle = action.payload;
        state.allTitleFetchTime = new Date().getTime();
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllSkillTitle.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSkillTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default tutorialSlice.reducer;
export const { updateTutorial } = tutorialSlice.actions;
