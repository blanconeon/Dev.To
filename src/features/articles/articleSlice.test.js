import { describe, it, expect } from 'vitest';
import articlesReducer, { loadArticles, allArticles, selectIsLoading } from './articlesSlice';

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





it("sets isLoading to false and articlesList becomes fake article", ()=> {
//arrange
const  fakeState = {
  articlesList: [],
  isLoading: true, // have it as true so that the test changes it to false(meaningful)
  error: false  
}

// thunk object is used, api call not made
const fakeArticles = [{type_of: 'article', id: 3, title: ' Rele'}, {type_of: 'article', id: 4, title: ' Renee'}]
const action = loadArticles.fulfilled(fakeArticles) // this is the reducer sets isLoading to false

// act

const actualState = articlesReducer(fakeState, action);

// assert 
expect(actualState.isLoading).toBe(false);
//assert
expect(actualState.articlesList).toEqual(fakeArticles)

});

it(" sets isLoading to false and error to true", () => {
//arrange
const fakeState = {
    articlesList: [],
    isLoading: true,
    error: false
}

// thunk object is used, no api call made
const action = loadArticles.rejected();

//act 

const actualState = articlesReducer(fakeState, action);

//assert

expect(actualState.isLoading).toBe(false);

expect(actualState.error).toBe(true);

})

it (" selectors access correct data, returning article & isLoading false state", ()=> {
//arrange

const fakeState = {
    articles: {
        articlesList: [{type: "article" , id: "3", title: "The Super Man"}],
        isLoading: false,
        error: false
    }
}

//act
const loadedArticles = allArticles(fakeState);
const isLoadingArticles = selectIsLoading(fakeState);

//assert

expect(loadedArticles).toEqual(fakeState.articles.articlesList);
expect(isLoadingArticles).toBe(false);

})

// useSelectors is for React components
});
