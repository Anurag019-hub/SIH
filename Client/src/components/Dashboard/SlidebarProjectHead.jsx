import React from 'react';
import SlidebarLayout from './SlidebarLayout';

// Import the icons for the navigation items
import {
    FaUsers,
    FaClipboardList,
    FaFlagCheckered,
    FaClipboardCheck,
    FaFileSignature,
    FaChartBar,
    FaUserEdit,
    FaPaperPlane
} from 'react-icons/fa';

function SidebarProjectHead() {
    // The navigation items array now includes the 'icon' property for each link
    const headNavItems = [
        { 
            type: 'link', 
            to: '/head/dashboard', 
            label: 'Team Dashboard', 
            icon: <FaUsers /> 
        },
        {
            type: 'collapse',
            title: 'TEAM MONITORING',
            items: [
                { to: '/head/team-kpis', label: 'Team KPIs', icon: <FaClipboardList /> },
                { to: '/head/project-milestones', label: 'Project Milestones', icon: <FaFlagCheckered /> },
                 { to: '/head/assign-task', label: 'Assign Task', icon: <FaPaperPlane /> },
                { to: '/head/approve-tasks', label: 'Approve Tasks', icon: <FaClipboardCheck /> },
            ],
        },
        {
            type: 'collapse',
            title: 'APPRAISALS & REPORTS',
            items: [
                { to: '/head/review-appraisals', label: 'Review Appraisals', icon: <FaFileSignature /> },
                { to: '/head/team-reports', label: 'Generate Reports', icon: <FaChartBar /> },
                { to: '/head/my-appraisal', label: 'My Own Appraisal', icon: <FaUserEdit /> },
            ],
        },
    ];

    return <SlidebarLayout portalTitle="Project Head Portal" navItems={headNavItems} />;
}

export default SidebarProjectHead;