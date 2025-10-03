import React from 'react';
import { motion } from 'framer-motion';

// Using a wide variety of icons to represent each KPI
import {
    FaClock,
    FaCheckCircle,
    FaRocket,
    FaBolt,
    FaLightbulb,
    FaUsers,
    FaArrowUp,
    FaArrowDown,
    FaChartLine,
    FaCommentDots
} from 'react-icons/fa';

/**
 * A reusable card component for displaying a single Key Performance Indicator.
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
                    <div className="text-3xl text-success p-3 bg-success/10 rounded-xl">
                        {icon}
                    </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                    <span className={`flex items-center gap-1 font-bold ${trendColor}`}>
                        {trend.startsWith('+') ? <FaArrowUp /> : <FaArrowDown />}
                        {trend}
                    </span>
                    <span className="text-base-content/60">from last month</span>
                </div>
                <p className="text-xs text-base-content/50 mt-1">{description}</p>
            </div>
        </motion.div>
    );
};

/**
 * The main dashboard content for an individual employee.
 */
const EmployeeDashboard = () => {
    // Animation container for staggering the card animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="w-full h-full p-2 md:p-6">
            {/* --- HEADER --- */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold">My Dashboard</h1>
                <p className="text-base-content/70">Welcome back, John Doe! Here's your performance summary.</p>
            </div>

            {/* --- KPI CARD GRID --- */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <KpiCard
                    title="Task Timeliness"
                    value="95%"
                    icon={<FaClock />}
                    trend="+2%"
                    trendColor="text-success"
                    description="Punctuality in completing assigned tasks."
                />
                <KpiCard
                    title="Accuracy Rate"
                    value="98.7%"
                    icon={<FaCheckCircle />}
                    trend="-0.5%"
                    trendColor="text-error"
                    description="Correctness and quality of work outputs."
                />
                <KpiCard
                    title="Productivity Score"
                    value="8.2/10"
                    icon={<FaRocket />}
                    trend="+0.8"
                    trendColor="text-success"
                    description="Overall efficiency and task throughput."
                />
                <KpiCard
                    title="Avg. Response Time"
                    value="4.5 Hrs"
                    icon={<FaBolt />}
                    trend="-1.2 Hrs" // Negative is good here, so green
                    trendColor="text-success"
                    description="Agility in responding to files and queries."
                />
                <KpiCard
                    title="Initiatives Taken"
                    value="3"
                    icon={<FaLightbulb />}
                    trend="+1"
                    trendColor="text-success"
                    description="Suggestions made or improvements adopted."
                />
                <KpiCard
                    title="Teamwork Score"
                    value="4.5/5 ★"
                    icon={<FaUsers />}
                    trend="+0.2"
                    trendColor="text-success"
                    description="Collaboration score from peer feedback."
                />
            </motion.div>

            {/* --- CHARTS AND OTHER WIDGETS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-8">
                {/* Productivity Trend Chart */}
                <div className="lg:col-span-3 card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title"><FaChartLine className="mr-2" /> Productivity Trend (Last 30 Days)</h2>
                        <div className="w-full h-64 bg-base-200 mt-4 rounded-lg flex items-end justify-center p-4">
                           {/* This is a placeholder for a real chart library like Chart.js or Recharts */}
                           <p className="text-base-content/50">Chart visualization would appear here.</p>
                        </div>
                    </div>
                </div>

                {/* Recent Peer Feedback */}
                <div className="lg:col-span-2 card bg-base-100 shadow-xl">
                     <div className="card-body">
                        <h2 className="card-title"><FaCommentDots className="mr-2" /> Recent Peer Feedback</h2>
                        <div className="space-y-4 mt-4">
                            <div className="p-3 bg-base-200 rounded-lg">
                                <p className="text-sm font-semibold">"John is always proactive in offering help and has been a great collaborator on the DPR."</p>
                                <p className="text-xs text-right text-base-content/50 mt-1">- Jane Smith</p>
                            </div>
                             <div className="p-3 bg-base-200 rounded-lg">
                                <p className="text-sm font-semibold">"Excellent attention to detail in the last survey report. Very reliable."</p>
                                <p className="text-xs text-right text-base-content/50 mt-1">- Mark Williams</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;