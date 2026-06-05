import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchedProfile, selectedProfIsLoading, loadProfileByUserName, profileSliceError } from "../features/profile/profileSlice";
import { selectIsLoading, allArticles, loadArticlesByUsername, articlesSliceError } from "../features/articles/articlesSlice";
import ArticleCard from "../components/ArticleCard";

import { useEffect } from "react";




const ProfilePage = () => {
const dispatch = useDispatch();
const loadedProfile = useSelector(fetchedProfile);
const profileIsLoading = useSelector(selectedProfIsLoading);
const profileError = useSelector(profileSliceError);
//from articlesSlice
const loadedArticles = useSelector(allArticles);
const articlesError = useSelector(articlesSliceError);
//console.log(loadedArticles.length);
const [searchParams, setSearchParams ] = useSearchParams(); //array destructuring is by position not by name

const {username} = useParams();
const page = searchParams.get("page") || 1;

useEffect(()=> {
if (username) {
    dispatch(loadProfileByUserName(username))
}
}, [username]);

useEffect(()=> {
    // do not if(page) because is always true from || 1
    dispatch(loadArticlesByUsername({username, page}))  
            
},[username, page]);

if (profileIsLoading){
    return <div>Is loading..</div>
}

if (profileError) {

    return <div>Something went wrong..</div>
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
{loadedArticles.length === 0 && !articlesError && <div>No Results</div>}

<div>
    
    {articlesError ? <div>{articlesError}</div> : loadedArticles.map(article => (
        <ArticleCard key={article.id} article={article} /> 
    ))} {/* profile info and articles are separate concerns, so you'd handle article errors you use an inline conditional rather than an early return */}
</div>
<button disabled={Number(page) <= 1}
onClick={() => setSearchParams(prev => {
  const next = new URLSearchParams(prev);
  next.set('page', Number(page) - 1);
  return next;
})
} >Previous</button>
<button disabled={loadedArticles.length < 30} onClick={() => setSearchParams(prev => {
  const next = new URLSearchParams(prev);
  next.set('page', Number(page) + 1);
  return next;
})
}>Next</button>

</>
)}

export default ProfilePage;


/* 
The route param name and the API param name are completely separate:

useParams() gives you { username: "..." } — that's your URL, your naming
You then pass that value to the thunk: dispatch(loadArticlesByUsername(username))
The thunk uses it as ?username=${author} — dev.to's naming
The value is the same (the actual username like "jess"), just passed through. The variable names don't need to match.


{loadedArticles.length === 0 && <div>No Results</div>} : an inline conditional inside the JSX is cleaner here because you still want the profile info to show. A separate if statement before the return would block the whole page including the profile.



Scenario 1: First load fails
├── articlesError = "Failed to fetch"
├── loadedArticles.length = 0
├── Line 60: 0 === 0 ✓ BUT !articlesError = false → "No Results" NOT shown
└── Line 64: articlesError truthy → shows "Failed to fetch"

Scenario 2: Subsequent load fails
├── articlesError = "Failed to fetch"
├── loadedArticles.length = 30 (previous page still in state)
├── Line 60: 30 === 0 ✗ → "No Results" NOT shown
└── Line 64: articlesError truthy → shows "Failed to fetch"

Scenario 3: No error, empty results
├── articlesError = false
├── loadedArticles.length = 0
├── Line 60: 0 === 0 ✓ AND !articlesError = true → "No Results" shown
└── Line 64: articlesError falsy → loadedArticles.map() → renders nothing (empty array)

*/