

import { Outlet } from 'react-router-dom';
import NavBar from "../components/NavBar.jsx";
// import Outlet

const Root = () => {
    return (
        <>
            <NavBar/>
            <Outlet/>
        </>
    );
};

export default Root;