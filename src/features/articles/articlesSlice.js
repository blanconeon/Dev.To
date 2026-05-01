import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const loadArticles = createAsyncThunk(
  'articles/loadArticles', //articles=from slice name: and loadArticles thunk name
  async () => {
    const data = await fetch('https://dev.to/api/articles');
    const json = await data.json();
    console.log(json); // REMOVE
    return json;
  }
);

export const loadArticlesByTag = createAsyncThunk(
  'articles/loadArticlesByTag', //articles=from slice name: and loadArticlesByTag thunk name
  async (tagName) => {
    const data = await fetch(`https://dev.to/api/articles?tag=${tagName}`);
    const json = await data.json();
    console.log(json); // REMOVE
    return json;
  }
);

export const loadArticlesByTopNumber = createAsyncThunk(
  'articles/loadArticlesByTopNumber', //articles=from slice name: and loadArticlesByTrend thunk name
  async (topNumber) => {
    const data = await fetch(`https://dev.to/api/articles?top=${topNumber}`);
    const json = await data.json();
    console.log(json); // REMOVE
    return json;
  }
);





export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articlesList: [],
    isLoading: false,
    error: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadArticles.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(loadArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articlesList = action.payload;
      })
      .addCase(loadArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })
      //loadArticlesByTag
      .addCase(loadArticlesByTag.pending, (state) => {
     state.isLoading = true;
     state.error = false;
    })
    .addCase(loadArticlesByTag.fulfilled, (state, action) => {
      state.isLoading = false;
      state.articlesList = action.payload;
    })
    .addCase(loadArticlesByTag.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    })
    //loadArticlesByTopNumber
    .addCase(loadArticlesByTopNumber.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    })
    .addCase(loadArticlesByTopNumber.fulfilled, (state, action) => {
      state.isLoading = false;
      state.articlesList = action.payload;
    })
    .addCase(loadArticlesByTopNumber.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    })
  },
});

export default articlesSlice.reducer;

export const allArticles = (state) => state.articles.articlesList;
export const selectIsLoading = (state) => state.articles.isLoading; 
// you can also export the error but it depends if you want to display it in UI

/*What’s happening:
You write:
initial state
reducers / extraReducers
createSlice combines all of that and builds the reducer for you
So:
you don’t see the reducer 
Redux Toolkit generates it internally */






// 1. did upper slice part
// 2. did thunk
// 3. did extrareducers in slice

//REMEMBER:
/*Store state (global state)
→ contains all slices (articles, comments, etc.)
Slice state (inside reducer)
→ contains only that slice’s data (articlesList, isLoading, error)

👉 In components (useSelector) → use full state (state.articles...)
👉 In slice reducers → use slice state directly (state...)



Selector functions usually use the naming convention:

selectThing
or:

selectThingById
selectAllThings
selectThingStatus



*/