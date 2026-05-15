import { describe, it, expect, vi } from 'vitest';
import commentsReducer, { loadCommentsById } from './commentsSlice';



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



}) 