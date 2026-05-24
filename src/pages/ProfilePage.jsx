import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchedProfile, selectedProfIsLoading, loadProfileByUserName } from "../features/profile/profileSlice";
import { selectIsLoading, allArticles, loadArticlesByUsername } from "../features/articles/articlesSlice";
import ArticleCard from "../components/ArticleCard";

import { useEffect } from "react";




const ProfilePage = () => {
const dispatch = useDispatch();
const loadedProfile = useSelector(fetchedProfile);
const profileIsLoading = useSelector(selectedProfIsLoading);
//from articlesSlice
const loadedArticles = useSelector(allArticles)

const {username} = useParams();

useEffect(()=> {
if (username) {
    dispatch(loadProfileByUserName(username))
    dispatch(loadArticlesByUsername(username))
}
}, [username])

if (profileIsLoading){
    return <div>Is loading..</div>
}

if (!loadedProfile) {
    return <div>No results</div>
}

return (
<>
<h2>{loadedProfile.username}</h2>
<h3>Github: {loadedProfile.github_username}</h3>
<img src={loadedProfile.profile_image} alt="photo"/>
<h5>{loadedProfile.location}</h5>
<h5>Joined on {loadedProfile.joined_at}</h5>
<h4>About me: {loadedProfile.summary}</h4>
<hr />
<div>
    {loadedArticles.map(article => (
        <ArticleCard key={article.id} article={article} />
    ))}
</div>

</>
)}

export default ProfilePage;


/* 
The route param name and the API param name are completely separate:

useParams() gives you { username: "..." } — that's your URL, your naming
You then pass that value to the thunk: dispatch(loadArticlesByUsername(username))
The thunk uses it as ?username=${author} — dev.to's naming
The value is the same (the actual username like "jess"), just passed through. The variable names don't need to match.
*/