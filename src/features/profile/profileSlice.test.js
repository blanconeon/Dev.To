import { describe, it, expect, vi } from 'vitest';
import profileReducer, { fetchedProfile, selectedProfIsLoading, loadProfileByUserName} from "./profileSlice";



describe("profileSlice", () => {
it("sets is loading  to true when profile is loading", ()=> {
//arrange 
const fakeState = {
    selectedProfile: null,
    isLoading: false,
    error:false
};



// thunk object is used, api call not made
const action = loadProfileByUserName.pending(); // here the thunk sets isLoading to true

const actualState = profileReducer(fakeState, action); // sets isLoading to true. IMPORTANT the reducer is what actually updates state. thunk does fetch and returns fulfiled pending or rejected

//assert
expect(actualState.isLoading).toBe(true);
})


})