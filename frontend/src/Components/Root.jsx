import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Root() {
    return (
        <div className="h-screen">
            <Navbar></Navbar>
            <div className="">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Root;