import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

function SlidebarLayout({ portalTitle, navItems }) {
    
    const handleLinkClick = () => {
        const drawerCheckbox = document.getElementById("my-drawer-2");
        if (drawerCheckbox) {
            drawerCheckbox.checked = false;
        }
    };

    // A modern, pill-style active link class
    const getNavLinkClass = ({ isActive }) =>
        `flex items-center gap-4 w-full p-3 rounded-lg transition-all duration-300 ${
            isActive
                ? 'bg-success text-black font-bold shadow-lg'
                : 'text-base-content/70 hover:bg-black/10 hover:text-black'
        }`;

    return (
        <div className=" lg:mt-10  drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-start p-4 md:p-8 ">
                <div className="not-lg:mt-15 lg:mt-0 w-full">
                <Outlet />
                </div>
                {/* Hamburger button for mobile */}
                <div className="flex-none not-lg:mt-15 lg:hidden absolute top-4 right-4 z-20">
                    <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay backdrop-blur-sm"></label>
                
                {/* --- BEAUTIFIED SIDEBAR --- */}
                <ul className="menu bg-base-300 text-base-content min-h-full w-80 p-4 space-y-2 not-lg:mt-15 lg:mt-0">
                    {/* Brand Logo and Portal Title */}
                    <li className="p-4 mb-2">
                        <h1 className="text-2xl font-bold text-center text-black">
                            Perf<span className="text-success">Manage</span>
                        </h1>
                        <p className="text-center text-sm text-base-content">{portalTitle}</p>
                    </li>

                    {/* --- User Profile Section --- */}
                    <li className="p-4">
                        <div className="flex items-center gap-4">
                            <div className="avatar online">
                                <div className="w-12 rounded-full">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <div>
                                <p className="font-bold text-black">John Doe</p>
                                <p className="text-xs text-base-content/60">Employee</p>
                            </div>
                        </div>
                    </li>
                    <div className="divider mt-0 text-base-content/20"></div>

                    {/* Dynamically render navigation items */}
                    {navItems && navItems.map((item) => {
                        if (item.type === 'collapse') {
                            return (
                                <div key={item.title}>
                                    <div className="collapse  collapse-open bg-transparent">
                                        <div className="collapse-title font-semibold text-sm uppercase tracking-wider text-base-content/50">
                                            {item.title}
                                        </div>
                                        <div className='collapse-content'>
                                            <ul className="menu p-0">
                                                {item.items.map(subItem => (
                                                    <li key={subItem.to} className="my-1">
                                                        <NavLink to={subItem.to} className={getNavLinkClass} onClick={handleLinkClick}>
                                                            <span className="text-xl">{subItem.icon}</span>
                                                            <span>{subItem.label}</span>
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        // Handle single links if you have them
                        if (item.type === 'link') {
                            return (
                                <li key={item.to} className="font-semibold text-sm uppercase tracking-wider text-base-content/50 ">
                                    <NavLink to={item.to} className={getNavLinkClass} onClick={handleLinkClick}>
                                        <span className="text-xl">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </NavLink>
                                </li>
                            );
                        }
                        return null;
                    })}
                </ul>
            </div>
        </div>
    );
}

export default SlidebarLayout;