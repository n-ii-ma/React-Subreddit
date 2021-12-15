import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Gets the First 10 Posts from the API
export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (apiAddress) => {
    const response = await fetch(apiAddress);
    if (!response.ok) throw new Error("Request Failed!");
    const data = await response.json();
    return data;
  }
);

// Loads the Next 10 Posts
export const getMorePosts = createAsyncThunk(
  "post/getMorePosts",
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
    redditPost: {},
    isLoading: false,
    hasError: false,
    moreIsLoading: false,
    moreHasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.redditPost = action.payload.data;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(getMorePosts.pending, (state) => {
        state.moreIsLoading = true;
        state.moreHasError = false;
      })
      .addCase(getMorePosts.fulfilled, (state, action) => {
        state.redditPost = {
          ...state.redditPost,
          after: action.payload.data.after,
          children: [
            ...state.redditPost.children,
            ...action.payload.data.children,
          ],
        };
        state.moreIsLoading = false;
        state.moreHasError = false;
      })
      .addCase(getMorePosts.rejected, (state) => {
        state.moreIsLoading = false;
        state.moreHasError = true;
      });
  },
});

// Selectors
export const selectRedditPost = (state) => state.post.redditPost;
export const selectPostIsLoading = (state) => state.post.isLoading;
export const selectPostHasError = (state) => state.post.hasError;

// Reducer
export default redditPostSlice.reducer;
