import Root from "./layouts/Root";
import HomePage from "./pages/HomePage";

// Add react-router-dom imports
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
// create router with JSX Route elements
const appRouter = createBrowserRouter(createRoutesFromElements(
<Route path='/' element={<Root/> }>
 <Route index element={<HomePage/>}/>

 <Route path=":type" element={<HomePage />} />



</Route>));




function App() {
  return (
    // replace below with a Router Provider
    <RouterProvider router={appRouter}/>
  );
}

export default App;
