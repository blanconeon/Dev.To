

import { Outlet } from 'react-router-dom';
import NavBar from "../components/NavBar.jsx";
// import Outlet

const Root = () => {
    return (
        <>
            <NavBar/>
            <main>
            <Outlet/>
            </main>
        </>
    );
};

export default Root;