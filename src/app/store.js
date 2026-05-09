import { configureStore } from "@reduxjs/toolkit";
// import reducers
import articlesReducer from "../features/articles/articlesSlice";


const store = configureStore({
  reducer: {
    articles: articlesReducer
    // comments: commentsReducer

  },
});

export default store;

/*Fair — the full picture is:

URL change (Router) → component mounts or re-renders → reads URL params → dispatches thunk → store updates → useSelector triggers re-render

Or without URL:

User action → dispatch → store updates → useSelector triggers re-render

Two entry points — Router or direct dispatch. Everything else is the same loop.*/