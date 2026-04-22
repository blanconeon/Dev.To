import { describe, it, expect } from 'vitest';
import articlesReducer, { loadArticles } from './articlesSlice';

describe('articlesSlice', () => {
  it('sets isLoading to true when articles are loading', () => {
//arrange 
const fakeState = {
    articlesList: [],
    isLoading: false,
    error:false
};

// thunk object is used, api call not made
const action = loadArticles.pending(); // this in the reducer sets isLoading to true

//act
const actualState = articlesReducer(fakeState, action); // sets isLoading to true

//assert
expect(actualState.isLoading).toBe(true);
 });
});
