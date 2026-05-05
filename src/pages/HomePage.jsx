import { loadArticles, selectIsLoading, allArticles, loadArticlesByTag, loadArticlesByTopNumber } from "../features/articles/articlesSlice";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";


//“Fetch on page load” usually means “dispatch the fetch in useEffect when the page mounts,” not “call fetch directly inside render.”


const  HomePage = ()=> {
const dispatch = useDispatch();
const loadedArticles = useSelector(allArticles);
const isLoadingArticles = useSelector(selectIsLoading);

const [searchParams] = useSearchParams(); //array destructuring is by position not by name 
const tagName = searchParams.get('tag');
const topNumber = searchParams.get("top");
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
    dispatch(loadArticlesByTag(tagName))
 } else if(topNumber) {
    dispatch(loadArticlesByTopNumber(topNumber))
 } else {
dispatch(loadArticles())
 }
},[dispatch, tagName, topNumber])

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
</>

)

}

export default HomePage;


/* So you build in this order:

get articles fetching working
confirm data renders
then build navigation around a working app

Navbar loads first visually, yes — but it’s not the main logic risk. The risky part is API + Redux + rendering.*/





