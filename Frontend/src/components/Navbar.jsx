import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { SiBmcsoftware } from "react-icons/si";
import { useState } from "react";

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                            <SiBmcsoftware className="text-white" />
                        </div>
                        <span className="text-white font-bold text-xl">FlowIQ</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/"
                            className="text-slate-300 hover:text-white px-3 py-2 text-sm"
                        >
                            Home
                        </Link>

                        <Link
                            to="/models"
                            className="text-slate-300 hover:text-white px-3 py-2 text-sm"
                        >
                            Models
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-slate-300 hover:text-white px-3 py-2 text-sm"
                                >
                                    Dashboard
                                </Link>
                                {/* Profile */}
                                <div className="flex items-center space-x-3 border-l border-slate-700 pl-4">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center overflow-hidden">
                                        {user?.profileImageUrl ? (
                                            <img
                                                src={user.profileImageUrl}
                                                alt={user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-white font-bold">
                                                {user?.name?.charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                    </div>

                                    <span className="text-white text-sm">
                                        {user?.name}
                                    </span>

                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-slate-300 hover:text-white px-3 py-2 text-sm"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 py-2 rounded text-sm"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden text-white focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-700 pt-4 pb-4">
                        <div className="flex flex-col space-y-3">
                            <Link
                                to="/"
                                className="text-slate-300 hover:text-white px-3 py-2 text-sm"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>

                            <Link
                                to="/models"
                                className="text-slate-300 hover:text-white px-3 py-2 text-sm"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Models
                            </Link>
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/dashboard"
                                        className="text-slate-300 hover:text-white px-3 py-2 text-sm"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    {/* Profile */}
                                    <div className="flex items-center space-x-3 border-t border-slate-700 pt-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center overflow-hidden">
                                            {user?.profileImageUrl ? (
                                                <img
                                                    src={user.profileImageUrl}
                                                    alt={user.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-white font-bold">
                                                    {user?.name?.charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                        </div>

                                        <span className="text-white text-sm">
                                            {user?.name}
                                        </span>

                                        <button
                                            onClick={handleLogout}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col space-y-3 border-t border-slate-700 pt-3">
                                    <Link
                                        to="/login"
                                        className="text-slate-300 hover:text-white px-3 py-2 text-sm"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 py-2 rounded text-sm text-center"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </nav>
    );
}
