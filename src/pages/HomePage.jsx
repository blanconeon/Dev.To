import { loadArticles, selectIsLoading, allArticles } from "../features/articles/articlesSlice";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom";
//“Fetch on page load” usually means “dispatch the fetch in useEffect when the page mounts,” not “call fetch directly inside render.”


const  HomePage = ()=> {
const dispatch = useDispatch();
const loadedArticles = useSelector(allArticles);
const isLoadingArticles = useSelector(selectIsLoading);

// start UseEffect 
useEffect(() => {
dispatch(loadArticles())
},[dispatch])

if (isLoadingArticles) {
    return <div>Is Loading</div>
}

if (!Array.isArray(loadedArticles) || loadedArticles.length === 0) {
return <div>No results</div>
}


const [searchParams] = useSearchParams(); //array destructuring is by position not by name 
searchParams.get('tag');


return (
<>
<div>
    {loadedArticles.map(article => (
     <div key={article.id}>
        <h2>{article.title}</h2>
        <p>{article.description}</p>
        </div>   
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





