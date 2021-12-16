import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Gets the First 10 Posts from the API
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (apiAddress) => {
    const response = await fetch(apiAddress);
    if (!response.ok) throw new Error("Request Failed!");
    const data = await response.json();
    return data;
  }
);

// Loads the Next 10 Posts
export const getMorePosts = createAsyncThunk(
  "posts/getMorePosts",
  async (apiAddress) => {
    const response = await fetch(apiAddress);
    if (!response.ok) throw new Error("Request Failed!");
    const data = await response.json();
    return data;
  }
);

const redditPostsSlice = createSlice({
  name: "posts",
  initialState: {
    redditPosts: {},
    areLoading: false,
    haveError: false,
    moreAreLoading: false,
    moreHaveError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.areLoading = true;
        state.haveError = false;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.redditPosts = action.payload.data;
        state.areLoading = false;
        state.haveError = false;
      })
      .addCase(getPosts.rejected, (state) => {
        state.areLoading = false;
        state.haveError = true;
      })
      .addCase(getMorePosts.pending, (state) => {
        state.moreAreLoading = true;
        state.moreHaveError = false;
      })
      .addCase(getMorePosts.fulfilled, (state, action) => {
        state.redditPosts = {
          ...state.redditPosts,
          after: action.payload.data.after,
          children: [
            ...state.redditPosts.children,
            ...action.payload.data.children,
          ],
        };
        state.moreAreLoading = false;
        state.moreHaveError = false;
      })
      .addCase(getMorePosts.rejected, (state) => {
        state.moreAreLoading = false;
        state.moreHaveError = true;
      });
  },
});

// Selectors
export const selectRedditPosts = (state) => state.posts.redditPosts;
export const selectPostsAreLoading = (state) => state.posts.areLoading;
export const selectPostsHaveError = (state) => state.posts.haveError;
export const selectMorePostsAreLoading = (state) => state.posts.moreAreLoading;
export const selectMorePostsHaveError = (state) => state.posts.moreHaveError;

// Reducer
export default redditPostsSlice.reducer;
