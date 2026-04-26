import {NavLink} from "react-router-dom";


const NavBar = () => {



return (
<>
<div>
<NavLink to="/">
Home
</NavLink>
</div>
<div>
<NavLink to="/articles?tag=react">
React
</NavLink>
</div>


</>
)
}

export default NavBar;