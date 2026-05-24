import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchedProfile, selectedProfIsLoading, loadProfileByUserName } from "../features/profile/profileSlice";

import { useEffect } from "react";




const ProfilePage = () => {
const dispatch = useDispatch();
const loadedProfile = useSelector(fetchedProfile);
const profileIsLoading = useSelector(selectedProfIsLoading);


const {username} = useParams();

useEffect(()=> {
if (username) {
    dispatch(loadProfileByUserName(username))
}
}, [username])

return (
<>




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