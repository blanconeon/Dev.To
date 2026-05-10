import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';






   export const loadCommentsById = createAsyncThunk(
   'comments/loadCommentsById', 
   async (id) => {
   const data = await fetch(`https://dev.to/api/comments?a_id=${id}`);
   const json = await data.json();
   console.log(json); // REMOVE
   return json;
   })
  

  export const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        articleComments: null,
        isLoading: false,
        error:false
    }
  })


  export default commentSlice.reducer; // .reducer is a property that slice genrates automatically. 