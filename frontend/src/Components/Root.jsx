import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Root() {
    return (
        <div className="">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
}

export default Root;