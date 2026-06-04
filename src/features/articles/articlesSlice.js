import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';




export const loadArticles = createAsyncThunk(
  'articles/loadArticles', //articles=from slice name: and loadArticles thunk name
  async (page) => {
    const data = await fetch(`https://dev.to/api/articles?page=${page}`);
    const json = await data.json();
   // console.log(json); // REMOVE
    return json;
  }
);

export const loadArticlesByTag = createAsyncThunk(
  'articles/loadArticlesByTag', //articles=from slice name: and loadArticlesByTag thunk name
  async ({tagName, page}) => {// thunks only accept one argumnet so an object is passed
    const data = await fetch(`https://dev.to/api/articles?tag=${tagName}&page=${page}`
);
    const json = await data.json();
    //console.log(json); // REMOVE
    return json;
  }
);

export const loadArticlesByTopNumber = createAsyncThunk(
  'articles/loadArticlesByTopNumber', //articles=from slice name: and loadArticlesByTrend thunk name
  async ({topNumber, page}) => {
    const data = await fetch(`https://dev.to/api/articles?top=${topNumber}&page=${page}`);
    const json = await data.json();
    //console.log(json); // REMOVE
    return json;
  }
);

export const loadArticlesByUsername = createAsyncThunk(
  'articles/loadArticlesByUsername', //articles=from slice name: and loadArticlesByAuthor thunk name
  async ({username, page}) => {
    const data = await fetch(`https://dev.to/api/articles?username=${username}&page=${page}`);
    const json = await data.json();
    //console.log(json); // REMOVE
    return json;
  }
);

export const loadArticlesById = createAsyncThunk(
'articles/loadArticlesById', 
async (id) => {
const data = await fetch(`https://dev.to/api/articles/${id}`);
const json = await data.json();
//console.log(json); // REMOVE
return json;
})



export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    currentArticle: null,
    articlesList: [],
    isLoading: false,
    error: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadArticles.pending, (state) => { //pending has no useful data on the action object so no action param is needed. 
        state.isLoading = true;
        state.error = false;
      })
      .addCase(loadArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articlesList = action.payload;
      })
      .addCase(loadArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message
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
    .addCase(loadArticlesByTag.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
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
    .addCase(loadArticlesByTopNumber.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    })
    //loadArticlesByUserName
    .addCase(loadArticlesByUsername.pending, (state)=> {
      state.isLoading = true;
      state.error = false;
    })
    .addCase(loadArticlesByUsername.fulfilled, (state, action) => {
      state.isLoading = false;
      state.articlesList = action.payload;
    })
    .addCase(loadArticlesByUsername.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    })
    //loadArticlesById
    .addCase(loadArticlesById.pending, (state)=> {
     state.isLoading = true;
     state.error = false; 
    })
    .addCase(loadArticlesById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentArticle = action.payload;
    })
    .addCase(loadArticlesById.rejected, (state, action) => {
     state.isLoading = false;
     state.error = action.error.message
    })
  },
});

export default articlesSlice.reducer;

export const allArticles = (state) => state.articles.articlesList;//for the list of articles
export const selectCurrentArticle = (state) => state.articles.currentArticle; //for single article
export const selectIsLoading = (state) => state.articles.isLoading; 

export const articlesSliceError = (state) => state.articles.error;
// you export the error to provide ui error message to user. Rember ui in component goes in between isLoading and No Results

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