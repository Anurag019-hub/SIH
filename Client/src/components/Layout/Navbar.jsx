import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [scrolled, setScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });

    // Check if the current page is the homepage
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    useEffect(() => {
        if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/employee") || location.pathname.startsWith("/head")) {
            if (!isLoggedIn) {
                setIsLoggedIn(true);
                localStorage.setItem("isLoggedIn", "true");
            }
        }
    }, [location.pathname, isLoggedIn]);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false");
        navigate("/");
    };
    
    const handleMobileLinkClick = () => {
        const drawerCheckbox = document.getElementById("my-drawer-3");
        if (drawerCheckbox) drawerCheckbox.checked = false;
    };

    // NavLink style now conditionally changes text color based on the page
    const getNavLinkClass = ({ isActive }) => {
        const baseTextColor = isHomePage ? 'text-white' : 'text-base-content';
        return `font-semibold tracking-wide transition-colors duration-300 relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0 after:bg-success after:transition-all after:duration-300 hover:text-success ${isActive ? "text-success after:w-full" : baseTextColor}`;
    };

    // Determine navbar classes based on page and scroll state
    const navClasses = `navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage
            ? scrolled ? 'bg-blue-900 shadow-lg' : 'bg-transparent'
            : 'bg-base-100 shadow-lg'
    }`;
    
    // Determine text color for elements that don't use getNavLinkClass
    const textColorClass = isHomePage ? 'text-white' : 'text-base-content';

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
                            {isLoggedIn && <li><NavLink to="/employee/dashboard" className={getNavLinkClass}>Dashboard</NavLink></li>}
                            <li><NavLink to="/faq" className={getNavLinkClass}>FAQ</NavLink></li>
                            <li><NavLink to="/about" className={getNavLinkClass}>About Us</NavLink></li>
                            <li><NavLink to="/contact" className={getNavLinkClass}>Contact Us</NavLink></li>
                        </ul>
                    </div>
                    
                    <div className="navbar-end">
                        {!isLoggedIn ? (
                            <div className="space-x-2">
                                {/* --- NEW BUTTON COLORS --- */}
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
                                    <li><a onClick={() => navigate('/profile')} className="flex items-center gap-2"><FaUserCircle /> Profile</a></li>
                                    <li><a onClick={() => navigate('/settings')} className="flex items-center gap-2"><FaCog /> Settings</a></li>
                                    <div className="divider my-1"></div>
                                    <li><button onClick={handleLogout} className="flex items-center gap-2 text-error"><FaSignOutAlt /> Logout</button></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4 space-y-2">
                    <li className="text-2xl font-bold p-4">Menu</li>
                    {/* Note: Mobile links will have dark text due to the drawer's light background */}
                    <li><NavLink to="/" className={({isActive}) => `font-semibold ... ${isActive ? 'text-success' : 'text-base-content'}`} onClick={handleMobileLinkClick}>Home</NavLink></li>
                    {isLoggedIn && <li><NavLink to="/employee/dashboard" className={({isActive}) => `font-semibold ... ${isActive ? 'text-success' : 'text-base-content'}`} onClick={handleMobileLinkClick}>Dashboard</NavLink></li>}
                    {/* ... add similar styling for other mobile links ... */}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;