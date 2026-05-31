import { loadArticles, selectIsLoading, allArticles, loadArticlesByTag, loadArticlesByTopNumber, loadArticlesByUsername } from "../features/articles/articlesSlice";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";


//“Fetch on page load” usually means “dispatch the fetch in useEffect when the page mounts,” not “call fetch directly inside render.”


const  HomePage = ()=> {
const dispatch = useDispatch();
const loadedArticles = useSelector(allArticles);
const isLoadingArticles = useSelector(selectIsLoading);

const [searchParams, setSearchParams ] = useSearchParams(); //array destructuring is by position not by name 
const tagName = searchParams.get('tag');
const topNumber = searchParams.get("top");
const username = searchParams.get("username");
const page = searchParams.get("page") || 1;
// start UseEffect for articles onload & useEffect for loadArticlesByTag
/*So on first load:
•	tag is null
•	normal articles load
After click:
•	tag becomes react
•	tag articles load instead
That avoids both fetches competing.*/

useEffect(() => {
if (tagName) {
    dispatch(loadArticlesByTag({tagName, page}))
 } else if(topNumber) {
    dispatch(loadArticlesByTopNumber({topNumber, page}))
 } else if (username) {
    dispatch(loadArticlesByUsername({username, page}))
 } else  {
dispatch(loadArticles(page))
 }
},[dispatch, tagName, topNumber, username, page ])// dispatch is suppoused to  go there for safety

if (isLoadingArticles) {
    return <div>Is Loading</div>
}

if (!Array.isArray(loadedArticles) || loadedArticles.length === 0) {
return <div>No results</div>
}




return (
<>
<div>
    {loadedArticles.map(article => (
        <ArticleCard key={article.id} article={article} />
    ))}
</div>
<button disabled={Number(page) <= 1}
onClick={() => setSearchParams(prev => {
  const next = new URLSearchParams(prev);
  next.set('page', Number(page) - 1);
  return next;
})
} >Previous</button>
<button onClick={() => setSearchParams(prev => {
  const next = new URLSearchParams(prev);
  next.set('page', Number(page) + 1);
  return next;
})
}>Next</button>
</>

)

}

export default HomePage;


/* 
this function : setSearchParams(prev => {
  const next = new URLSearchParams(prev);
  next.set('page', Number(page) + 1);
  return next;
})


Breaking it down piece by piece:

setSearchParams — updates the URL query string, from useSearchParams

prev => — gets the current URL params as they are before changing anything, same concept as when you do setState(prev => prev + 1)

new URLSearchParams(prev) — creates a copy of the current params so you don't mutate the original. Like spreading an array [...arr]

next.set('page', Number(page) + 1) — on that copy, sets the page param to current page + 1. Number() just makes sure it's treated as a number not a string before adding 1

return next — returns the updated params which updates the URL

So the full picture:

current URL: ?page=2&tag=react
after function: ?page=3&tag=react
The reason for copying with new URLSearchParams(prev) rather than just setting directly is to preserve any other existing params in the URL like tag=react — if you didn't copy first you'd wipe everything else and only have ?page=3.

That's the key insight of this function!

in my own words: 
instead of replacing this: http://localhost:5173/articles/?tag=ruby with http://localhost:5173/articles/?page=2 once we click next. it grabs the tag=ruby and adds page=2 ..

///////////
new URLSearchParams(prev) — copies the current query string (which is empty at /)
next.set('page', Number(page) + 1) — adds page=2 to that copy
return next — setSearchParams takes that and updates the URL to /?page=2
The / stays unchanged — setSearchParams only ever touches the query string, never the pat


The ? is added automatically by setSearchParams when it updates the URL. You never write it manually — it just appears in the URL as the separator between the path and the query string.
*/





