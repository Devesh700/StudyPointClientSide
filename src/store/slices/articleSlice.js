import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseUrl = import.meta.env.VITE_BASE_URL;
const version = import.meta.env.VITE_VERSION;

const initialState = {
  allArticles: [],
  myArticles: [],
  article: [],
  loading: false,
  error: null,
};

// Add Article
export const addArticle = createAsyncThunk(
  "addArticle",
  async (article, thunkApi) => {
    let totalRetry = 0;
    const maxRetry = 5;
    let token = thunkApi.getState().user?.user?.accessToken || JSON.parse(sessionStorage.getItem("user"))?.accessToken;
    while (totalRetry < maxRetry) {
      try {
        totalRetry++;
        const response = await fetch(`${baseUrl}/${version}/article/addarticle`, {
          method: "POST",
          body: article,
          headers: {
            Authorization: token,
          },
        });
        const result = await response.json();
        if (!result.ok) {
          alert(result.message);
          return thunkApi.rejectWithValue(result);
        }
        return result;
      } catch (err) {
        if (totalRetry >= maxRetry) {
          return thunkApi.rejectWithValue(err.message);
        }
      }
    }
  }
);

// Get Article by ID
export const getArticleById = createAsyncThunk(
  "getArticleById",
  async (_id, thunkApi) => {
    let totalRetry = 0;
    const maxRetry = 5;
    while (totalRetry < maxRetry) {
      try {
        totalRetry++;
        const response = await fetch(`${baseUrl}/${version}/article/${_id}`, {
          method: "GET",
        });
        const result = await response.json();
        if (!result.ok) {
          alert(result.message);
          return thunkApi.rejectWithValue(result);
        }
        return result.data;
      } catch (error) {
        if (totalRetry >= maxRetry) {
          return thunkApi.rejectWithValue(error.message);
        }
      }
    }
  }
);

// Get All Articles
export const getAllArticle = createAsyncThunk(
  "getAllArticle",
  async (_, thunkApi) => {
    let totalRetry = 0;
    const maxRetry = 5;
    while (totalRetry < maxRetry) {
      try {
        totalRetry++;
        const url = new URLSearchParams({ skip: 0, populate: "likes postedBy" });
        const response = await fetch(`${baseUrl}/${version}/article/get/all?${url}`, {
          method: "GET",
        });
        const result = await response.json();
        if (!result.ok) {
          alert(result.message);
          return thunkApi.rejectWithValue(result);
        }
        return result.data;
      } catch (error) {
        if (totalRetry >= maxRetry) {
          return thunkApi.rejectWithValue(error.message);
        }
      }
    }
  }
);

// Add Like
export const addLike = createAsyncThunk(
  "addLike",
  async (data, thunkApi) => {
    let totalRetry = 0;
    const maxRetry = 5;
    if (!data?.articleId || !data?.title) {
      return alert("Didn't receive article details which you want to like");
    }
    let token = thunkApi.getState().user?.user?.accessToken || JSON.parse(sessionStorage.getItem("user"))?.accessToken;
    if (!token) {
      alert("please log in to continue liking articles");
      return;
    }
    while (totalRetry < maxRetry) {
      try {
        totalRetry++;
        let result = await fetch(`${baseUrl}/${version}/like/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        if (!result.ok) {
          return thunkApi.rejectWithValue(result);
        }
        result = await result.json();
        return result;
      } catch (err) {
        if (totalRetry >= maxRetry) {
          return thunkApi.rejectWithValue(err.message);
        }
      }
    }
  }
);

// Remove Like
export const removeLike = createAsyncThunk(
  "removeLike",
  async (data, thunkApi) => {
    let totalRetry = 0;
    const maxRetry = 5;
    if (!data?.articleId || !data?.title) {
      return alert("Didn't receive article details which you want to like");
    }
    let token = thunkApi.getState().user?.user?.accessToken || JSON.parse(sessionStorage.getItem("user"))?.accessToken;
    if (!token) {
      alert("please log in to continue liking articles");
      return;
    }
    while (totalRetry < maxRetry) {
      try {
        totalRetry++;
        let result = await fetch(`${baseUrl}/${version}/like`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        if (!result.ok) {
          return thunkApi.rejectWithValue(result);
        }
        result = await result.json();
        return result;
      } catch (err) {
        if (totalRetry >= maxRetry) {
          return thunkApi.rejectWithValue(err.message);
        }
      }
    }
  }
);

// Create the Article Slice
const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    UpdateArticle: (state, action) => {
      state.allArticles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addArticle.fulfilled, (state, action) => {
        state.myArticles = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(addArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(addArticle.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(getArticleById.fulfilled, (state, action) => {
        state.article = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getArticleById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticleById.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(getAllArticle.fulfilled, (state, action) => {
        state.allArticles = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getAllArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllArticle.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(addLike.fulfilled, (state, action) => {
        state.article = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(addLike.pending, (state) => {
        // state.loading = true;
      })
      .addCase(addLike.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        state.article = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(removeLike.pending, (state) => {
        // state.loading = true;
      })
      .addCase(removeLike.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});

export default articleSlice.reducer;
export const { UpdateArticle } = articleSlice.actions;
