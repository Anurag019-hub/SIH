import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaCalendarCheck, FaStar, FaHandshake } from 'react-icons/fa';

// --- Sample Data for Team Members' KPIs ---
const teamMembersKpis = [
    {
        id: 1, name: 'John Doe', avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp', role: 'Field Engineer',
        kpis: { timeliness: 95, qualityScore: 4.7, collaborationIndex: 85 }
    },
    {
        id: 2, name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', role: 'Drafter',
        kpis: { timeliness: 92, qualityScore: 4.5, collaborationIndex: 90 }
    },
    {
        id: 3, name: 'Mark Williams', avatar: 'https://randomuser.me/api/portraits/men/44.jpg', role: 'Surveyor',
        kpis: { timeliness: 85, qualityScore: 4.1, collaborationIndex: 78 }
    },
    {
        id: 4, name: 'Emily Brown', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', role: 'Jr. Engineer',
        kpis: { timeliness: 78, qualityScore: 3.9, collaborationIndex: 82 }
    }
];

// Calculate team averages
const teamAverages = {
    timeliness: (teamMembersKpis.reduce((acc, member) => acc + member.kpis.timeliness, 0) / teamMembersKpis.length).toFixed(1),
    qualityScore: (teamMembersKpis.reduce((acc, member) => acc + member.kpis.qualityScore, 0) / teamMembersKpis.length).toFixed(1),
    collaboration: (teamMembersKpis.reduce((acc, member) => acc + member.kpis.collaborationIndex, 0) / teamMembersKpis.length).toFixed(1),
};

const TeamKpi = () => {
    // Helper function to color-code scores
    const getKpiColor = (score, high, mid) => {
        if (score >= high) return 'text-success font-bold';
        if (score >= mid) return 'text-warning';
        return 'text-error';
    };
    
    // Animation variants
    const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

    return (
        <div className="w-full h-full p-2 md:p-6">
            {/* --- HEADER --- */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold">Team KPI Performance</h1>
                <p className="text-base-content/70">Review performance metrics for each member of your team.</p>
            </div>

            {/* --- TEAM AVERAGE CARDS --- */}
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="stat bg-base-100 shadow-xl rounded-lg">
                    <div className="stat-figure text-primary"><FaCalendarCheck className="text-3xl" /></div>
                    <div className="stat-title">Avg. Team Timeliness</div>
                    <div className="stat-value">{teamAverages.timeliness}%</div>
                </motion.div>
                <motion.div variants={itemVariants} className="stat bg-base-100 shadow-xl rounded-lg">
                    <div className="stat-figure text-secondary"><FaStar className="text-3xl" /></div>
                    <div className="stat-title">Avg. Quality Score</div>
                    <div className="stat-value">{teamAverages.qualityScore}/5</div>
                </motion.div>
                <motion.div variants={itemVariants} className="stat bg-base-100 shadow-xl rounded-lg">
                    <div className="stat-figure text-accent"><FaHandshake className="text-3xl" /></div>
                    <div className="stat-title">Avg. Collaboration Index</div>
                    <div className="stat-value">{teamAverages.collaboration}%</div>
                </motion.div>
            </motion.div>

            {/* --- DETAILED PERFORMANCE TABLE --- */}
            <motion.div 
                className="overflow-x-auto bg-base-100 rounded-xl shadow-xl mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Team Member</th>
                            <th>Role</th>
                            <th className="text-center">Timeliness (%)</th>
                            <th className="text-center">Quality Score (/5)</th>
                            <th className="text-center">Collaboration (%)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamMembersKpis.map(member => (
                            <tr key={member.id} className="hover">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={member.avatar} alt={`${member.name}'s avatar`} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{member.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{member.role}</td>
                                <td className={`text-center text-lg ${getKpiColor(member.kpis.timeliness, 90, 80)}`}>
                                    {member.kpis.timeliness}
                                </td>
                                <td className={`text-center text-lg ${getKpiColor(member.kpis.qualityScore, 4.5, 4.0)}`}>
                                    {member.kpis.qualityScore}
                                </td>
                                <td className={`text-center text-lg ${getKpiColor(member.kpis.collaborationIndex, 85, 75)}`}>
                                    {member.kpis.collaborationIndex}
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-ghost">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default TeamKpi;