import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-6 text-white">
                <li>
                    <Link to="/" className="hover:text-gray-400">Home</Link>
                </li>
                <li>
                    <Link to="/upload-font" className="hover:text-gray-400">Upload Font</Link>
                </li>
                <li>
                    <Link to="/group-list" className="hover:text-gray-400">Group List</Link>
                </li>
                <li>
                    <Link to="/create-group" className="hover:text-gray-400">Create Group</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
