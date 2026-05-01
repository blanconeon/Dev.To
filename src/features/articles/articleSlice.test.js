import { describe, it, expect, vi } from 'vitest';
import articlesReducer, { loadArticles, allArticles, selectIsLoading, loadArticlesByTag, loadArticlesByTopNumber } from './articlesSlice';

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
// useSelectors is for react components
})

it('loadArticles fetches articles from the API', async () => {
    const fakeArticles = [
      { type_of: 'article', id: 1, title: 'Test One' },
      { type_of: 'article', id: 2, title: 'Test Two' },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeArticles),
      })
    );

    const dispatch = vi.fn();
    const getState = vi.fn();

    const result = await loadArticles()(dispatch, getState, undefined);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://dev.to/api/articles');
    expect(result.payload).toEqual(fakeArticles);
    expect(result.type).toBe('articles/loadArticles/fulfilled');
  });

  it('loadArticlesByTag fetches articles from the API', async () => {
    const fakeTagArticles = [
      { type_of: 'tag article', id: 1, title: 'Test tag One' },
      { type_of: 'tag article', id: 2, title: 'Test tag Two' },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeTagArticles),
      })
    );

    const dispatch = vi.fn();
    const getState = vi.fn();
    const tagName = ('react'); // thunk ecpects a string

    const result = await loadArticlesByTag(tagName)(dispatch, getState, undefined);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://dev.to/api/articles?tag=${tagName}`);
    expect(result.payload).toEqual(fakeTagArticles);
    expect(result.type).toBe('articles/loadArticlesByTag/fulfilled');
  });

it('loadArticlesByTopNumber fetches articles from the API', async () => {
    const fakeTopArticles = [
      { type_of: 'top article', id: 1, title: 'Test top One' },
      { type_of: 'top article', id: 2, title: 'Test top Two' },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeTopArticles),
      })
    );

    const dispatch = vi.fn();
    const getState = vi.fn();
    const topNumber = ('7'); // thunk ecpects a string

    const result = await loadArticlesByTopNumber(topNumber)(dispatch, getState, undefined);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://dev.to/api/articles?top=${topNumber}`);
    expect(result.payload).toEqual(fakeTopArticles);
    expect(result.type).toBe('articles/loadArticlesByTopNumber/fulfilled');
  });
});

/*1fakeArticles
You create pretend API data.

2global.fetch = vi.fn(...)
You replace real fetch with a fake function.

3Promise.resolve({ json: ... })
Your fake fetch pretends it returned a successful response object.

4json: () => Promise.resolve(fakeArticles)
When the thunk does await data.json(), it gets your fake articles.

5const dispatch = vi.fn()
Fake Redux dispatch function.

6const getState = vi.fn()
Fake Redux getState function.

7await loadArticles()(dispatch, getState, undefined)
First loadArticles() creates the thunk action.
Then (dispatch, getState, undefined) runs that thunk manually.

8result
This is the final action object returned by the thunk after success.

9expect(fetch).toHaveBeenCalledTimes(1)
Checks that the thunk actually called fetch once.

10expect(fetch).toHaveBeenCalledWith(...)
Checks it called the correct URL.

11expect(result.payload).toEqual(fakeArticles)
Checks the thunk returned your fake data as payload.

12expect(result.type).toBe(...)
Checks the thunk finished as fulfilled, not rejected.

That’s the core idea:
you fake the network, run the thunk, and verify the thunk behaves like a successful API call.*/