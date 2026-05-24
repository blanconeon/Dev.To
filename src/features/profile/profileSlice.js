import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';




export const loadProfileByUserName = createAsyncThunk(
   'profile/loadProfileByUserName', 
   async (userName) => {
   const data = await fetch(`https://dev.to/api/users/by_username?url=${userName}`);
   const json = await data.json();
   console.log(json); // REMOVE
   return json;
   })


    export const profileSlice = createSlice({
       name: 'profile',
       initialState: {
           selectedProfile: null,
           isLoading: false,
           error:false
       },
       extraReducers: (builder) => {
        builder
        //loadProfileByUserName
        .addCase(loadProfileByUserName.pending, (state) => {
          state.isLoading = true;
          state.error = false; 
        })
        .addCase(loadProfileByUserName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProfile = action.payload;
        })
        .addCase(loadProfileByUserName.rejected, (state) => {
        state.isLoading = false;
        state.error = true;  
        })
   
       }
     })

     export default profileSlice.reducer; // .reducer is a property that slice generates automatically. 
        export const fetchedProfile = (state) => state.profile.selectedProfile;
        export const selectedProfIsLoading = (state) => state.profile.isLoading;
     