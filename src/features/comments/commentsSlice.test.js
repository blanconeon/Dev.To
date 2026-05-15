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

// thunk object is used, api call not made
const fakeComments = [{type_of: 'comment', id_code: 3, body_html: '<p> this is my comment<p>'}, {type_of: 'comment', id: 4, body_html: ' Renee is my comment'}]
const action = loadCommentsById.fulfilled(fakeComments) // this is the reducer sets isLoading to false

// act

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
// thunk is set to hold rejeted
const action = loadCommentsById.rejected();

const actualState = commentsReducer(fakeState, action);

// assert 

expect(actualState.isLoading).toBe(false);

expect(actualState.error).toBe(true);


});

it ("selectors access correct data, returning article & isLoading false state", () => {

    const  fakeArticles = {
  articleComments: [{type_of: 'comment', id_code: 3, body_html: '<p> this is my comment<p>'}, {type_of: 'comment', id: 4, body_html: ' Renee is my comment'}],
  isLoading: false,
  error: false  
}







})


}) 


/* useSelector in component vs test

In the component: useSelector(allArticles) — Redux calls allArticles(realStore) automatically behind the scenes.
In the test: useSelector is mocked, so you manually wire it up with useSelector.mockImplementation((selector) => selector(fakeState)).
This means every useSelector call in the component gets intercepted and run against your fakeState instead of the real store. The selector function itself behaves the same — you're just controlling what state it receives.*/