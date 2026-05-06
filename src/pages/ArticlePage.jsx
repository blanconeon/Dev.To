import { loadArticlesById, selectCurrentArticle, selectIsLoading  } from "../features/articles/articlesSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useEffect } from "react";



const ArticlePage = () => {
const dispatch = useDispatch();
const loadedArticle = useSelector(selectCurrentArticle);
const isLoadingArticles = useSelector(selectIsLoading);

const {id} = useParams(); //useParams returns an objects because there could be multiple parameters, like: /users/:userId/posts/:postId - this would give { userId: "...", postId: "..."}. IMPORTANT: the variable name must match the key to hold that value. In my case my parameter's key is id so I label the variable id. 

useEffect(() => {
if (id) {
    dispatch(loadArticlesById(id))
 }
 
},[id])

if (isLoadingArticles) {
    return <div>Is Loading</div>
}

if (typeof loadedArticle !== "object" || loadedArticle === null || Array.isArray(loadedArticle) || Object.keys(loadedArticle).length === 0) {
return <div>No results</div>
}



return (
<>
<div dangerouslySetInnerHTML={{ __html: loadedArticle.body_html }}/>

</>
)}  ////// you are making this componnet bring all imports dont forget that the link in articleCard changes the URL, so here you read the url with params and call the new thunk. follow the pattern in HomePage. 

export default ArticlePage;