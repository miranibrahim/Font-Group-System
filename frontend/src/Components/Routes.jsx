import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../Pages/Home";

const route = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            
            {
                path: "/",
                element: <Home/>,
            },

        ]
    }
])
export default route;