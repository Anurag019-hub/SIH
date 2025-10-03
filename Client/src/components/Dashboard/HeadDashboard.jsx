import React from 'react';
import { motion } from 'framer-motion';

// Icons selected for team and project management KPIs
import {
    FaCalendarCheck,
    FaStar,
    FaHandshake,
    FaLightbulb,
    FaCogs,
    FaArrowUp,
    FaArrowDown,
    FaChartArea,
    FaTasks,
    FaUserFriends
} from 'react-icons/fa';

/**
 * A reusable card component for displaying a single Key Performance Indicator.
 * (This can be moved to a shared components folder)
 */
const KpiCard = ({ icon, title, value, trend, trendColor, description }) => {
    return (
        <motion.div 
            className="card bg-base-100 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="card-body">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-semibold text-base-content/60">{title}</p>
                        <h2 className="card-title text-4xl font-extrabold">{value}</h2>
                    </div>
                    <div className="text-3xl text-primary p-3 bg-primary/10 rounded-xl">
                        {icon}
                    </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                    <span className={`flex items-center gap-1 font-bold ${trendColor}`}>
                        {trend.startsWith('+') || !trend.includes('-') ? <FaArrowUp /> : <FaArrowDown />}
                        {trend}
                    </span>
                    <span className="text-base-content/60">from last period</span>
                </div>
                <p className="text-xs text-base-content/50 mt-1">{description}</p>
            </div>
        </motion.div>
    );
};


/**
 * The main dashboard content for a Project Head.
 */
const HeadDashboard = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <div className="w-full h-full p-2 md:p-6">
            {/* --- HEADER --- */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold">Team Performance Dashboard</h1>
                <p className="text-base-content/70">Project: 'Brahmaputra Riverfront Development'</p>
            </div>

            {/* --- KPI CARD GRID --- */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <KpiCard
                    title="Team Timeliness"
                    value="89%"
                    icon={<FaCalendarCheck />}
                    trend="-3%"
                    trendColor="text-error"
                    description="Team Discipline"
                />
                <KpiCard
                    title="Overall Quality Score"
                    value="4.2/5"
                    icon={<FaStar />}
                    trend="+0.1"
                    trendColor="text-success"
                    description="Work Quality"
                />
                <KpiCard
                    title="Collaboration Index"
                    value="76%"
                    icon={<FaHandshake />}
                    trend="+5%"
                    trendColor="text-success"
                    description="Cross-team Efficiency"
                />
                <KpiCard
                    title="Team Initiatives"
                    value="5"
                    icon={<FaLightbulb />}
                    trend="+2"
                    trendColor="text-success"
                    description="Creativity Measure"
                />
                <KpiCard
                    title="Resource Utilization"
                    value="94%"
                    icon={<FaCogs />}
                    trend="-1%"
                    trendColor="text-error"
                    description="Team Efficiency"
                />
            </motion.div>

            {/* --- CHARTS AND OTHER WIDGETS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                {/* Project Milestones */}
                <div className="lg:col-span-1 card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title"><FaTasks className="mr-2" /> Project Milestones</h2>
                        <ul className="space-y-3 mt-4">
                            <li className="flex items-center gap-3"><span className="badge badge-success badge-xs"></span> <span>Initial Survey Report</span></li>
                            <li className="flex items-center gap-3"><span className="badge badge-success badge-xs"></span> <span>DPR Draft Submission</span></li>
                            <li className="flex items-center gap-3"><span className="badge badge-warning badge-xs"></span> <span>Environmental Clearance</span></li>
                            <li className="flex items-center gap-3"><span className="badge badge-ghost badge-xs"></span> <span>Phase 1 Tendering</span></li>
                        </ul>
                    </div>
                </div>

                {/* Team Member Performance */}
                <div className="lg:col-span-2 card bg-base-100 shadow-xl">
                     <div className="card-body">
                        <h2 className="card-title"><FaUserFriends className="mr-2" /> Team Member Snapshot</h2>
                        <div className="overflow-x-auto mt-4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Tasks On-Time</th>
                                        <th>Quality Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>John Doe</td>
                                        <td>Field Engineer</td>
                                        <td className="text-success">95%</td>
                                        <td>4.7 / 5</td>
                                    </tr>
                                    <tr>
                                        <td>Jane Smith</td>
                                        <td>Drafter</td>
                                        <td className="text-success">92%</td>
                                        <td>4.5 / 5</td>
                                    </tr>
                                    <tr>
                                        <td>Mark Williams</td>
                                        <td>Surveyor</td>
                                        <td className="text-warning">85%</td>
                                        <td>4.1 / 5</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeadDashboard;