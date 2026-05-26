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

it("sets isloading to false and selectedProfile becomes fakeProfile", ()=> {
//arrange 
const fakeState = {
    selectedProfile: null,
    isLoading: true,
    error:false
};

const fakeProfile = {twitter_username: "obetomuniz", type_of: "user", username: "obetomuniz"}
// thunk action creator is used, not the thunk itself
const action = loadProfileByUserName.fulfilled(fakeProfile); // this sets the reducer's isLoading to false

// act, reducer processes the action and returns new state
const actualState = profileReducer(fakeState, action);

//assert
expect(actualState.isLoading).toBe(false)
//assert
expect(actualState.selectedProfile).toEqual(fakeProfile);

})

it("sets is loading to false and error to true", ()=> {

    const fakeState = {
    selectedProfile: null,
    isLoading: true,
    error:false
};
//act
// thunk action creator is used, not the thunk itsel
const action = loadProfileByUserName.rejected();

const actualState = profileReducer(fakeState, action);


// Assert
expect(actualState.isLoading).toBe(false);

expect(actualState.error).toBe(true);
})

it("selectors access correct data, returning article & isLoading false state", ()=> {

const fakeState = {
    profile: {
    selectedProfile: {twitter_username: "obetomuniz", type_of: "user", username: "obetomuniz"} ,
    isLoading: false,
    error:false
}}

//act. As per useSelector in slice fetchedProfile drills state till selectedProfile. in this  case fakeState.profile.seectedProfile. 
const loadedProfile = fetchedProfile(fakeState);
//act. Asper useSelector in slice selectedProfIsLoading drills state till isLoading. In this case fakeState.profile.isLoading
const isLoadingProfile = selectedProfIsLoading(fakeState);

//assert
expect(loadedProfile).toEqual(fakeState.profile.selectedProfile);
//assert
expect(isLoadingProfile).toBe(fakeState.profile.isLoading);


})


})