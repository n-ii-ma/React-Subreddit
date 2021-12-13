import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (apiAddress) => {
    const response = await fetch(apiAddress);
    if (!response.ok) throw new Error("Request Failed!");
    const data = await response.json();
    return data;
  }
);

const redditPostSlice = createSlice({
  name: "post",
  initialState: {
    redditPost: [],
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.redditPost = action.payload.data.children;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

// Selectors
export const selectRedditPost = (state) => state.post.redditPost;
export const selectPostIsLoading = (state) => state.post.isLoading;
export const selectPostHasError = (state) => state.post.hasError;

// Reducer
export default redditPostSlice.reducer;
