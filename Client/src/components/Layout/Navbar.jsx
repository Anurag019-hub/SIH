import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // --- NEW LOGIC: Derive login status directly from URL path ---
    // The isLoggedIn status is no longer a state. It's a constant calculated on every render.
    // If the path starts with any of these prefixes, we are "logged in".
    const isLoggedIn = location.pathname.startsWith('/admin') || 
                       location.pathname.startsWith('/employee') || 
                       location.pathname.startsWith('/head');

    const [scrolled, setScrolled] = useState(false);
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // The logout button now just needs to navigate to a public page.
    const handleLogout = () => {
        navigate("/");
    };
    
    const handleMobileLinkClick = () => {
        const drawerCheckbox = document.getElementById("my-drawer-3");
        if (drawerCheckbox) drawerCheckbox.checked = false;
    };

    const navClasses = `navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage && !scrolled ? 'bg-transparent' : 'bg-blue-900 shadow-lg'
    } ${isHomePage ? '' : '!bg-base-100 shadow-lg'}`;
    
    const textColorClass = isHomePage && !scrolled ? 'text-base-content' : 'text-white';

    const getNavLinkClass = ({ isActive }) => {
        const baseTextColor = isHomePage && !scrolled ? 'text-base-content' : 'text-white';
        const finalTextColor = !isHomePage ? 'text-base-content' : baseTextColor;
        return `font-semibold tracking-wide transition-colors duration-300 relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0 after:bg-success after:transition-all after:duration-300 hover:text-success ${isActive ? "text-success after:w-full" : finalTextColor}`;
    };

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className={navClasses}>
                    <div className="navbar-start">
                        <div className="lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className={`btn btn-square btn-ghost ${textColorClass}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </label>
                        </div>
                        <NavLink to="/" className={`btn btn-ghost text-xl font-bold tracking-wider normal-case ml-2 ${textColorClass}`}>
                            Perf<span className="text-success">Manage</span>
                        </NavLink>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal items-center space-x-6 px-1">
                            <li><NavLink to="/" className={getNavLinkClass}>Home</NavLink></li>
                            {/* This Dashboard link will now appear automatically on the correct pages */}
                            {isLoggedIn && <li><NavLink to="/employee/dashboard" className={getNavLinkClass}>Dashboard</NavLink></li>}
                            <li><NavLink to="/faq" className={getNavLinkClass}>FAQ</NavLink></li>
                            <li><NavLink to="/about" className={getNavLinkClass}>About Us</NavLink></li>
                            <li><NavLink to="/contact" className={getNavLinkClass}>Contact Us</NavLink></li>
                        </ul>
                    </div>
                    
                    <div className="navbar-end">
                        {/* The ternary now uses the derived isLoggedIn constant */}
                        {!isLoggedIn ? (
                            <div className="space-x-2">
                                <button onClick={() => navigate('/login')} className="btn bg-white text-primary hover:bg-gray-200 border-none">Login</button>
                                <button onClick={() => navigate('/register')} className="btn btn-outline btn-success hidden sm:inline-flex">Register</button>
                            </div>
                        ) : (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
                                    <div className="w-10 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
                                        <img alt="User avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow-xl">
                                    <li><NavLink to="/profile" className="flex items-center gap-2"><FaUserCircle /> Profile</NavLink></li>
                                    <li><NavLink to="/settings" className="flex items-center gap-2"><FaCog /> Settings</NavLink></li>
                                    <div className="divider my-1"></div>
                                    <li><button onClick={handleLogout} className="flex w-full items-center gap-2 text-error"><FaSignOutAlt /> Logout</button></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4 space-y-2">
                    <li className="text-2xl font-bold p-4">Menu</li>
                    <li><NavLink to="/" className={({isActive}) => `font-semibold p-2 rounded-md ${isActive ? 'bg-success text-white' : 'text-base-content'}`} onClick={handleMobileLinkClick}>Home</NavLink></li>
                    {isLoggedIn && <li><NavLink to="/employee/dashboard" className={({isActive}) => `font-semibold p-2 rounded-md ${isActive ? 'bg-success text-white' : 'text-base-content'}`} onClick={handleMobileLinkClick}>Dashboard</NavLink></li>}
                    <li><NavLink to="/faq" className={({isActive}) => `font-semibold p-2 rounded-md ${isActive ? 'bg-success text-white' : 'text-base-content'}`} onClick={handleMobileLinkClick}>FAQ</NavLink></li>
                    <li><NavLink to="/about" className={({isActive}) => `font-semibold p-2 rounded-md ${isActive ? 'bg-success text-white' : 'text-base-content'}`} onClick={handleMobileLinkClick}>About Us</NavLink></li>
                    <li><NavLink to="/contact" className={({isActive}) => `font-semibold p-2 rounded-md ${isActive ? 'bg-success text-white' : 'text-base-content'}`} onClick={handleMobileLinkClick}>Contact Us</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
