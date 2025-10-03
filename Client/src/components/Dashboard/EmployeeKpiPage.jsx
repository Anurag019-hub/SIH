import React from 'react';
import { motion } from 'framer-motion';

// Import icons to associate with each KPI
import {
    FaClock,
    FaCheckCircle,
    FaRocket,
    FaLightbulb,
    FaUsers
} from 'react-icons/fa';

// --- Sample Data for the Employee's KPIs ---
// Note: progressValue is calculated (score / target_max) * 100 for the gauge
const employeeKpis = [
    {
        id: 1,
        name: 'Task Timeliness',
        description: 'Measures your punctuality in completing assigned tasks on or before the due date.',
        scoreDisplay: '95%',
        targetDisplay: 'Target: > 90%',
        progressValue: 95,
        icon: <FaClock />,
        colorClass: 'text-success' // Performance is good
    },
    {
        id: 2,
        name: 'Accuracy Rate',
        description: 'Reflects the correctness and quality of your work, with minimal errors.',
        scoreDisplay: '98.7%',
        targetDisplay: 'Target: > 99%',
        progressValue: 98.7,
        icon: <FaCheckCircle />,
        colorClass: 'text-warning' // Performance is close but below target
    },
    {
        id: 3,
        name: 'Productivity Score',
        description: 'An overall efficiency score based on task throughput during working hours.',
        scoreDisplay: '8.2/10',
        targetDisplay: 'Target: > 8.0',
        progressValue: 82, // (8.2 / 10) * 100
        icon: <FaRocket />,
        colorClass: 'text-success'
    },
    {
        id: 4,
        name: 'Initiatives Taken',
        description: 'The number of proactive suggestions you have made or improvements you have helped implement.',
        scoreDisplay: '3',
        targetDisplay: 'Target: 5',
        progressValue: 60, // (3 / 5) * 100
        icon: <FaLightbulb />,
        colorClass: 'text-warning'
    },
    {
        id: 5,
        name: 'Teamwork Score',
        description: 'A rating based on 360° feedback from your peers and project heads on collaboration.',
        scoreDisplay: '4.5/5',
        targetDisplay: 'Target: > 4.0',
        progressValue: 90, // (4.5 / 5) * 100
        icon: <FaUsers />,
        colorClass: 'text-success'
    }
];

const EmployeeKpiPage = () => {
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
                <h1 className="text-4xl font-bold">My Key Performance Indicators</h1>
                <p className="text-base-content/70">Here's a detailed look at your performance against your assigned goals.</p>
            </div>

            {/* --- KPI CARD GRID --- */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {employeeKpis.map((kpi) => (
                    <motion.div
                        key={kpi.id}
                        className="card bg-base-100 shadow-xl"
                        variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                    >
                        <div className="card-body items-center text-center">
                            {/* Visual Gauge */}
                            <div
                                className={`radial-progress ${kpi.colorClass}`}
                                style={{ "--value": kpi.progressValue, "--size": "8rem", "--thickness": "0.8rem" }}
                                role="progressbar"
                            >
                                <span className="text-2xl font-bold text-base-content">{kpi.scoreDisplay}</span>
                            </div>

                            {/* KPI Details */}
                            <h2 className="card-title mt-4">
                                {kpi.icon}
                                <span className="ml-2">{kpi.name}</span>
                            </h2>
                            <p className="text-sm text-base-content/60 mt-2">{kpi.description}</p>
                            <div className="card-actions justify-end mt-4">
                                <div className="badge badge-lg badge-outline font-semibold">{kpi.targetDisplay}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default EmployeeKpiPage;