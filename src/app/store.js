import { configureStore } from "@reduxjs/toolkit";
// import reducers

export default configureStore({
  reducer: {
    articles: articlesReducer,
    comments: commentsReducer,

  },
});