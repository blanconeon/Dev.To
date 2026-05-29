import { useState } from "react";
import { loadArticlesByTag, loadArticlesByUsername } from "../features/articles/articlesSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";


const SearchBar = () => {


const navigate = useNavigate()



const [radioValue, setRadioValue] = useState('');
const [inputState, setInputState] = useState('');

function updateTextValue(e) {
  setInputState(e.target.value);
}

function RadioValue (e) {
setRadioValue(e.target.value);
}

function handleSubmit (event) {
event.preventDefault();
if (!radioValue || !inputState) {
alert(" invalid selection.");
return; // empty return stops the function from continuing. 
}
if (radioValue === "tags") {
navigate(`/articles/?tag=${inputState}`)
} else if (radioValue === "name") {
navigate(`/articles/?username=${inputState}`)    
}
}


return (
    <>
    <div>
     <form onSubmit={handleSubmit}>   
    <input type="text" name="byTagOrName" value={inputState} onChange={updateTextValue} />
    <label>
        <input type="radio" name="nameOrTag" value="tags" onChange={RadioValue}/>
        Tag
    </label>
    <label>
        <input type="radio" name="nameOrTag" value="name" onChange={RadioValue} />
        Username 
    </label>
    <button type="submit" aria-label="Search">Search</button>
    </form>
    </div>
    
    </>
)

}

export default SearchBar;

/*The browser URL and the API URL are completely separate things. The browser URL (/?tag=react) is just for routing — it tells React Router which component to render. The API URL (https://dev.to/api/articles?tag=react) is hardcoded inside the thunk.

The flow is:

navigate('/?tag=react') changes the browser URL
React Router matches / → renders HomePage
useSearchParams reads tag=react
useEffect dispatches loadArticlesByTag('react')
The thunk builds https://dev.to/api/articles?tag=react and fetches it
The browser URL never touches the API directly. The thunk always builds its own URL regardless of what the browser URL looks like.*/