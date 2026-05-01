import { useState } from "react";
import { loadArticlesByAuthor, loadArticlesByTag } from "../features/articles/articlesSlice";



const SearchBar = () => {

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

 // NEXT CONNECT HANDLESUBIT TO THUNKS
}


return (
    <>
    <div>
     <form onSubmit={handleSubmit}>   
    <input type="text" name="byTagOrName" value={inputState} onChange={updateTextValue} />
    <label>
        <input type="radio" name="nameOrTag" value="tags"/>
        Tags
    </label>
    <label>
        <input type="radio" name="nameOrTag" value="name" />
        Author
    </label>
    <button type="submit" aria-label="Search">Search</button>
    </form>
    </div>
    
    </>
)

}

export default SearchBar;