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
    },
    extraReducers: (builder) => {
     builder
     //loadCommentsById
     .addCase(loadCommentsById.pending, (state) => {
       state.isLoading = true;
       state.error = false; 
     })
     .addCase(loadCommentsById.fulfilled, (state, action) => {
     state.isLoading = false;
     state.fulfilled = action.payload;
     })
     .addCase(loadCommentsById.rejected, (state) => {
     state.isLoading = false;
     state.error = true;  
     })

    }
  })


  export default commentSlice.reducer; // .reducer is a property that slice generates automatically. 
  /*
  isLoading and error are conventional state field names used across the industry. pending/fulfilled/rejected are action states, not state fields. Mixing the naming could confuse future readers — keep what you have.
  */