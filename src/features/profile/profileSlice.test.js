import { describe, it, expect, vi } from 'vitest';
import profileReducer, { fetchedProfile, selectedProfIsLoading, loadProfileByUserName, profileSliceError} from "./profileSlice";



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
//act. As per useSelector in slice selectedProfIsLoading drills state till isLoading. In this case fakeState.profile.isLoading
const isLoadingProfile = selectedProfIsLoading(fakeState);
//act. As per useSelector in slice profileSliceError drills state till error. In this case fakeState.profile.error
const profileError = profileSliceError(fakeState)

//assert
expect(loadedProfile).toEqual(fakeState.profile.selectedProfile);
//assert
expect(isLoadingProfile).toBe(fakeState.profile.isLoading);
//assert
expect(profileError).toEqual(fakeState.profile.error);


})
it ("loadProfileByUserName thunk calls the correct API URL and returns profile as payload on success", async ()=> {

const fakeProfile = {twitter_username: "obetomuniz", type_of: "user", username: "obetomuniz"}   

 //replacing the real browser fetch with a fake function that immediately returns your fake data,
 global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeProfile),
      })
    );

     // creating fake Redux dispatch and getState functions so you can run the thunk manually without a real Redux store.
    const dispatch = vi.fn();
    const getState = vi.fn();

    const userName = "jess"; // thunk expects the id string.

    const result = await loadProfileByUserName(userName)(dispatch, getState, undefined);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://dev.to/api/users/by_username?url=${userName}`);
    expect(result.payload).toEqual(fakeProfile);
    expect(result.type).toBe('profile/loadProfileByUserName/fulfilled'); /* 'profile/loadProfileByUserName/fulfilled' comes from matching the string in the thunk, in this case on fulfilled  */

})

})