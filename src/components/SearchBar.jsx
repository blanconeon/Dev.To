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
navigate(`/?tag=${inputState}`)
} else if (radioValue === "name") {
navigate(`/?username=${inputState}`)    
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