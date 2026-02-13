import { Link } from 'react-router-dom';
import { IoBook } from "react-icons/io5";

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg">
                            <IoBook size={20} />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            BookEase
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Home
                        </Link>
                        <Link to="/providers" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Providers
                        </Link>
                        <Link to="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Contact
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            to="/login"
                            className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:shadow-lg hover:opacity-90 transition-all transform hover:-translate-y-0.5"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
