import React from 'react';
import { motion } from 'framer-motion';

// A wide array of icons for high-level organizational metrics
import {
    FaFileAlt,
    FaTasks,
    FaPiggyBank,
    FaCheckDouble,
    FaStamp,
    FaHeart,
    FaGraduationCap,
    FaArrowUp,
    FaArrowDown,
    FaBuilding,
    FaRoad
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
                    <div className="text-3xl text-info p-3 bg-info/10 rounded-xl">
                        {icon}
                    </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                    <span className={`flex items-center gap-1 font-bold ${trendColor}`}>
                        {trend.startsWith('+') ? <FaArrowUp /> : <FaArrowDown />}
                        {trend}
                    </span>
                    <span className="text-base-content/60">from last quarter</span>
                </div>
                 <p className="text-xs text-base-content/50 mt-1">{description}</p>
            </div>
        </motion.div>
    );
};

/**
 * A component to render a visually impressive Gauge chart for the main OPI score.
 */
const OpiGauge = ({ score }) => {
    const scoreRotation = (score / 100) * 180 - 90; // Convert score 0-100 to degrees -90 to 90
    return (
        <div className="card bg-base-100 shadow-xl w-full lg:col-span-2">
            <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl font-bold">Organizational Productivity Index (OPI)</h2>
                <div className="relative w-64 h-32 mt-4">
                    <svg viewBox="0 0 100 50" className="w-full h-full">
                        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" strokeWidth="10" className="stroke-base-200" />
                        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" strokeWidth="10" className="stroke-success"
                            strokeDasharray={`${score * 1.256}, 125.6`} // 1.256 = (PI * 40) / 100
                        />
                    </svg>
                    <motion.div
                        className="absolute bottom-0 left-1/2 w-1 h-12 bg-neutral origin-bottom"
                        initial={{ rotate: -90 }}
                        animate={{ rotate: scoreRotation }}
                        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                        <span className="text-4xl font-extrabold">{score}</span>
                        <span className="text-xl font-bold text-base-content/50">/100</span>
                    </div>
                </div>
                <p className="text-sm text-base-content/60 mt-2">A weighted score reflecting overall organizational efficiency.</p>
            </div>
        </div>
    );
};


/**
 * The main dashboard content for an Administrator / Main Head.
 */
const AdminDashboard = () => {
     const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
    };
    
    return (
        <div className="w-full h-full p-2 md:p-6">
            {/* --- HEADER --- */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold">Organizational Dashboard</h1>
                <p className="text-base-content/70">Real-time overview of Brahmaputra Board's efficiency.</p>
            </div>

            {/* --- MAIN OPI GAUGE & KEY METRICS --- */}
             <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <OpiGauge score={88} />
                <div className="lg:col-span-3">
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full" variants={containerVariants} initial="hidden" animate="visible">
                        <KpiCard title="File Disposal Eff. (FDE)" value="92%" icon={<FaFileAlt />} trend="+1.5%" trendColor="text-success" description="HQ Responsiveness" />
                        <KpiCard title="Project Progress (PIP)" value="85%" icon={<FaTasks />} trend="+4%" trendColor="text-success" description="Project Delivery" />
                        <KpiCard title="Budget Utilization (BUR)" value="89%" icon={<FaPiggyBank />} trend="-2%" trendColor="text-warning" description="Financial Discipline" />
                        <KpiCard title="Project Success Rate (PSR)" value="91%" icon={<FaCheckDouble />} trend="+1%" trendColor="text-success" description="Core Outcome Measure" />
                        <KpiCard title="Compliance Index (CI)" value="97.5%" icon={<FaStamp />} trend="+0.5%" trendColor="text-success" description="Accountability Check" />
                         <KpiCard title="Employee Engagement (EEI)" value="83%" icon={<FaHeart />} trend="+3%" trendColor="text-success" description="Workforce Motivation" />
                    </motion.div>
                </div>
            </div>

            {/* --- DEEPER DIVE WIDGETS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* HQ vs Field */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                         <h2 className="card-title">HQ vs. Field Performance</h2>
                         <div className="flex justify-around items-end h-48 mt-4 p-4 bg-base-200 rounded-lg">
                            <div className="text-center">
                                <div className="bg-primary h-32 w-12 rounded-t-lg" style={{height: '92%'}}></div>
                                <p className="text-sm font-semibold mt-2">FDE (HQ)</p>
                            </div>
                             <div className="text-center">
                                <div className="bg-secondary h-24 w-12 rounded-t-lg" style={{height: '85%'}}></div>
                                <p className="text-sm font-semibold mt-2">PIP (Field)</p>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Project Watchlist */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Project Watchlist</h2>
                         <div className="overflow-x-auto mt-4">
                            <table className="table">
                                <thead>
                                    <tr><th>Project Name</th><th>Status</th><th>BUR</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>Riverfront Development</td><td><div className="badge badge-success w-20 ">On Track</div></td><td>89%</td></tr>
                                    <tr><td>Embankment Repair</td><td><div className="badge badge-warning ">At Risk</div></td><td>95%</td></tr>
                                     <tr><td>DPR for Phase 2</td><td><div className="badge badge-success">On Track</div></td><td>75%</td></tr>
                                    <tr><td>Hydrological Survey</td><td><div className="badge badge-error">Delayed</div></td><td>60%</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;