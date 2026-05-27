import { describe, it, expect, vi } from 'vitest';
import commentsReducer, { loadCommentsById, loadedComments, commentIsLoading } from './commentsSlice';



describe ("CommentsSlice", () => {
it("sets isLoading to  true when comments are loading", () => {
//arrange 
const fakeState = {
    articleComments: [],
    isLoading: false,
    error:false
};

// thunk object is used, api call not made
const action = loadCommentsById.pending(); // here the thunk sets isLoading to true

const actualState = commentsReducer(fakeState, action); // sets isLoading to true. IMPORTANT the reducer is what actually updates state. thunk does fetch and returns fulfiled pending or rejected

//assert
expect(actualState.isLoading).toBe(true);

});

it("sets isLoading to false and articleComments becomes fakeComments", () => {

const  fakeState = {
  articleComments: [],
  isLoading: true, // have it as true so that the test changes it to false(meaningful)
  error: false  
}


const fakeComments = [{type_of: 'comment', id_code: 3, body_html: '<p> this is my comment<p>'}, {type_of: 'comment', id: 4, body_html: ' Renee is my comment'}]
// thunk action creator is used, not the thunk itself
const action = loadCommentsById.fulfilled(fakeComments) // this is the reducer sets isLoading to false

// act, reducer processes the action and returns new state

const actualState = commentsReducer(fakeState, action);

// assert

expect(actualState.isLoading).toBe(false);
//assert

expect(actualState.articleComments).toEqual(fakeComments);


});

it("sets isLoading to false and error to true", () => {

const  fakeState = {
  articleComments: [],
  isLoading: true, // have it as true so that the test changes it to false(meaningful)
  error: false  
}

//act
// thunk action creator is used, not the thunk itsel!
const action = loadCommentsById.rejected();

const actualState = commentsReducer(fakeState, action);

// assert 

expect(actualState.isLoading).toBe(false);

expect(actualState.error).toBe(true);


});

it ("selectors access correct data, returning article & isLoading false state", () => {

    const  fakeComments = {
        comments: {
  articleComments: [{type_of: 'comment', id_code: 3, body_html: '<p> this is my comment<p>'}, {type_of: 'comment', id: 4, body_html: ' Renee is my comment'}],
  isLoading: false,
  error: false
        }  
}

//act
const loadedStateComments = loadedComments(fakeComments);//drills into fake state.comments.articleComments and returns it.
const isLoadingComments = commentIsLoading(fakeComments);//// commentIsLoading drills into (fakeState) fakeComments.comments.isLoading and returns it

// assert

expect(loadedStateComments).toEqual(fakeComments.comments.articleComments); // asserts the value returned by the loadedComments selector matches the articleComments array in fakeState.

expect(isLoadingComments).toBe(fakeComments.comments.isLoading);
// asserts the value returned by the commentIsLoading selector matches the isLoading value in fakeState
});

it ("loadCommentsById thunk calls the correct API URL and returns articles as payload on success", async () => {

 const fakeComments = [{type_of: 'comment', id_code: 3, body_html: '<p> this is my comment<p>'}, {type_of: 'comment', id: 4, body_html: ' Renee is my comment'}];


 //replacing the real browser fetch with a fake function that immediately returns your fake data,
 global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeComments),
      })
    );
  
    // creating fake Redux dispatch and getState functions so you can run the thunk manually without a real Redux store.
    const dispatch = vi.fn();
    const getState = vi.fn();
    
    const id = "id"; // thunk expects the id string.

    //manually running the thunk by calling it twice — first loadCommentsById() creates the thunk, then (dispatch, getState, undefined) executes it — and storing the final action it returns in result.

    /* the below is a JavaScript pattern called currying — a function that returns another function.

     createAsyncThunk builds a function that works in two steps:

      loadCommentsById(id)        // step 1: returns a new function (the thunk)
           (dispatch, getState, undefined)  // step 2: executes that function
       Step 1 takes your argument (id) and packages it up. Step 2 is where Redux would normally call it — passing dispatch and getState from the store. In the test you do both steps manually because there's no real Redux store running.

      Think of it like a two stage rocket — first stage sets it up, second stage fires it. */

   const result = await loadCommentsById(id)(dispatch, getState, undefined);
  
   /*  fetch was called exactly once
       fetch was called with the correct URL
       The thunk returned your fake articles as the payload
       The thunk completed successfully (not rejected)*/

       
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://dev.to/api/comments?a_id=${id}`);
    expect(result.payload).toEqual(fakeComments);
    expect(result.type).toBe('comments/loadCommentsById/fulfilled'); /*'comments/loadCommentsById/fulfilled' comes from matching the string in the thunk, in this case on fulfilled  */


});
}) 


/* useSelector in component vs test

In the component: useSelector(allArticles) — Redux calls allArticles(realStore) automatically behind the scenes.
In the test: useSelector is mocked, so you manually wire it up with useSelector.mockImplementation((selector) => selector(fakeState)).
This means every useSelector call in the component gets intercepted and run against your fakeState instead of the real store. The selector function itself behaves the same — you're just controlling what state it receives.*/