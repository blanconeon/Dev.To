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
<div>
<NavLink to="/articles?tag=javascript">
Javascript
</NavLink>
</div>
<div>
<NavLink to="/articles?top=7">
Top 7
</NavLink>
</div>
<div>
<NavLink to="/articles?top=30">
Top 30
</NavLink>
</div>
</>
)
}

export default NavBar;


/*
 NavBar itself still doesn't touch Redux. Here's what actually happens:

User clicks a NavLink in NavBar → URL changes (Router only)
useSearchParams in HomePage detects the URL change
HomePage's useEffect fires and dispatches loadArticlesByTag (Redux)
*/

