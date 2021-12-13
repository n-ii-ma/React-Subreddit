import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/redditPostSlice";

const store = configureStore({
  reducer: {
    post: postReducer,
  },
});

export default store;
