import { configureStore } from "@reduxjs/toolkit";
// import reducers
import articlesReducer from "../features/articles/articlesSlice";


export default configureStore({
  reducer: {
    articles: articlesReducer


  },
});