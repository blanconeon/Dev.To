import { configureStore } from "@reduxjs/toolkit";
// import reducers
import articlesReducer from "../features/articles/articlesSlice";


const store = configureStore({
  reducer: {
    articles: articlesReducer


  },
});

export default store;