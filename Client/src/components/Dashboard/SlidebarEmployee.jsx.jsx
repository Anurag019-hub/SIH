import React from 'react';
import SlidebarLayout from './SlidebarLayout';
import { FaChartLine, FaTasks, FaFileSignature, FaChartBar,FaTachometerAlt } from 'react-icons/fa';


function SidebarEmployee() {
    const employeeNavItems = [
        { type: 'link', to: '/employee/dashboard', label: 'My Dashboard' ,icon: <FaTachometerAlt /> },
        {
            type: 'collapse',
            title: 'PERFORMANCE',
            items: [
                { to: '/employee/my-kpis', label: 'My KPIs' ,icon: <FaChartLine /> },
                { to: '/employee/task-log', label: 'Task Log', icon: <FaTasks /> },
            ],
        },
        {
            type: 'collapse',
            title: 'APPRAISAL',
            items: [
                { to: '/employee/self-appraisal', label: 'Self Appraisal (APAR)' , icon: <FaFileSignature />},
                { to: '/employee/performance-report', label: 'My Performance Report', icon: <FaChartBar /> },
            ],
        },
    ];

    return <SlidebarLayout portalTitle="Employee Portal" navItems={employeeNavItems} />;
}

export default SidebarEmployee;