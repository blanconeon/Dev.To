import { Link } from "react-router-dom";



const ArticleCard = ({article})=> {



    return (
<>
<Link to={`/articles/${article.id}`}>
<div >
        <h2>{article.title}</h2>
        <p>{article.description}</p>
</div>
</Link>
</>
 )}


export default ArticleCard;


/*
ArticleCard — the <Link> in ArticleCard just changes the URL. ArticlePage is what reads the id from useParams and dispatches the thunk in a useEffect, same pattern as HomePage.



ArticleCard doesn't need to be in App.jsx — it's a component, not a page/route. Only pages that have their own URL need to be in the router. ArticleCard just lives inside HomePage and the <Link> inside it handles the navigation. */