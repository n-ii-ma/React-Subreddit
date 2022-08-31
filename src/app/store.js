import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/redditPostSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
  devTools: process.env.NODE_ENV === 'development' && true,
});

export default store;
