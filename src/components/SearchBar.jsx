import { useState } from "react";



const SearchBar = () => {

const [name, setName] = useState('');
const [tags, setTags] = useState('');
const [inputState, setInputState] = useState('');

function updateTextValue(e) {
  setInputState(e.target.value);
}

function setRadioValue (e) {
if (e.target.value === "tags") {
// call respective thunk with input value
}
}


return (
    <>
    <div>
     <form>   
    <input type="text" name="byTagOrName" value={inputState} onChange={updateTextValue} />
    <label>
        <input type="radio" name="nameOrTag" value={tags}/>
        By Tags
    </label>
    <label>
        <input type="radio" name="nameOrTag" value={name} />
        By Name
    </label>
    </form>
    </div>
    
    </>
)

}

export default SearchBar;