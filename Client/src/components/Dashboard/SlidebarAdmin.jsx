import React from 'react';
import SlidebarLayout from './SlidebarLayout';

// Import the icons we'll be using for the navigation items
import {
    FaTachometerAlt,
    FaUsers,
    FaProjectDiagram,
    FaCheckDouble,
    FaBullseye,
    FaCalculator,
    FaUsersCog,
    FaChartBar,
    FaChartLine
} from 'react-icons/fa';

function SidebarAdmin() {
    // The navigation items array now includes an 'icon' property for each link
    const adminNavItems = [
        { 
            type: 'link', 
            to: '/admin/dashboard', 
            label: 'Organizational Dashboard', 
            icon: <FaTachometerAlt /> 
        },
        {
            type: 'collapse',
            title: 'PERFORMANCE MANAGEMENT',
            items: [
                { to: '/admin/all-employees', label: 'All Employees', icon: <FaUsers /> },
                { to: '/admin/all-projects', label: 'All Projects', icon: <FaProjectDiagram /> },
                { to: '/admin/finalize-appraisals', label: 'Finalize Appraisals', icon: <FaCheckDouble /> },
            ],
        },
        {
            type: 'collapse',
            title: 'SYSTEM CONFIGURATION',
            items: [
                { to: '/admin/manage-kpis', label: 'Manage KPIs', icon: <FaBullseye /> },
                { to: '/admin/scoring-model', label: 'Scoring Model', icon: <FaCalculator /> },
                { to: '/admin/manage-users', label: 'Manage Users & Roles', icon: <FaUsersCog /> },
            ],
        },
        {
            type: 'collapse',
            title: 'ANALYTICS & REPORTS',
            items: [
                { to: '/admin/organizational-reports', label: 'Organizational Reports', icon: <FaChartBar /> },
                { to: '/admin/performance-trends', label: 'Performance Trends', icon: <FaChartLine /> },
            ],
        },
    ];

    return <SlidebarLayout portalTitle="Admin Portal" navItems={adminNavItems} />;
}

export default SidebarAdmin;