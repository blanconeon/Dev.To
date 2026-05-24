import Root from "./layouts/Root";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import ProfilePage from "./pages/ProfilePage";

// Add react-router-dom imports
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
// create router with JSX Route elements
const appRouter = createBrowserRouter(createRoutesFromElements(
<Route path='/' element={<Root/> }>
 <Route index element={<HomePage/>}/>

 <Route path=":type" element={<HomePage />} />
 <Route path="articles/:id" element={<ArticlePage />} />
 <Route path="profile/:username" element={<ProfilePage />} />

</Route>));




function App() {
  return (
    // replace below with a Router Provider
    <RouterProvider router={appRouter}/>
  );
}

export default App;


/*
Any component that uses a router hook like useParams, useSearchParams, or NavLink needs a router context in the test — regardless of whether it's in createBrowserRouter.

CommentsList passed without a router because it uses none of those hooks.

IMPORTANTE:

In the real browser, the full URL is http://localhost:5173/ — that includes the protocol, host, and port.

But the href attribute on an <a> tag only stores the path part — /. The browser combines the base URL with the path to form the full URL you see in the address bar.

So <a href="/"> and http://localhost:5173/ are the same link — just different representations.*/
