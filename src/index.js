import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

//components
import About from "./components/About";
import App from "./components/App";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Picker from "./components/Picker";
import Stats from "./components/Stats";
import Who from "./components/Who";

//Create root and connect to HTML 
const appElement = document.getElementById('app');
const root = createRoot(appElement);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
        {
            index: true,
            element: <Home/>
        },
        {
            path:"about",
            element:<About/>
        },
        {
            path:"picker",
            element:<Picker/>
        },
        {
            path:"stats",
            element:<Stats/>
        },
        {
            path:"who",
            element:<Who/>
        }
    ]
    }])
    

root.render(<RouterProvider router = {router}/>)