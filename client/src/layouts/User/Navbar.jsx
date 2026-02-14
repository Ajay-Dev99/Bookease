import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoBook } from "react-icons/io5";
import ModalWrapper from '../../components/Common/ModalWrapper';
import LoginModalContent from '../../components/Auth/LoginModalContent';

const Navbar = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const userType = localStorage.getItem('userType');
        if (storedUser && userType === 'customer') {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        setUser(null);
        navigate('/');
    };

    return (
        <>
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
                            <Link to="/my-appointments" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                My Appointments
                            </Link>

                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-full hover:shadow-lg hover:opacity-90 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setIsLoginModalOpen(true)}
                                        className="text-blue-600 font-medium hover:text-blue-700 transition-colors cursor-pointer"
                                    >
                                        Login
                                    </button>
                                    <Link
                                        to="/signup"
                                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:shadow-lg hover:opacity-90 transition-all transform hover:-translate-y-0.5"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <ModalWrapper
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            >
                <LoginModalContent onClose={() => setIsLoginModalOpen(false)} />
            </ModalWrapper>
        </>
    );
};

export default Navbar;
