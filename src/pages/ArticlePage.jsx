import { selectCurrentArticle, selectIsLoading  } from "../features/articles/articlesSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom";



const ArticlePage = ({article}) => {


return (
<>
<div>
   
</div>


</>
)}  ////// you are making this componnet bring all imports dont forget that the link in articleCard changes the URL, so here you read the url with params and call the new thunk. follow the pattern in HomePage. 

export default ArticlePage;