import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../Pages/Home";
import UploadFont from "../Pages/UploadFont";
import GroupList from "../Pages/GroupList";
import CreateGroup from "../Pages/CreateGroup";
import EditGroup from "../Pages/EditGroup";

const route = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [

            { path: "/", element: <Home /> },
            { path: "/upload-font", element: <UploadFont /> },
            { path: "/group-list", element: <GroupList /> },
            { path: "/create-group", element: <CreateGroup /> },
            { path: "/edit-group/:id", element: <EditGroup /> },

        ]
    }
])
export default route;