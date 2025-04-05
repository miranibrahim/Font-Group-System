import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Root() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Root;
