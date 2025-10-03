import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

const initialTeamTasks = [
    { id: 3, user: 'John Doe', avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp', description: 'Prepared minutes for the weekly project meeting.', date: '2025-10-02', status: 'Pending' },
    { id: 4, user: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', description: 'Finalized CAD drawings for the embankment.', date: '2025-10-02', status: 'Pending' },
    { id: 1, user: 'John Doe', avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp', description: 'Completed initial site survey for Riverfront Project.', date: '2025-10-01', status: 'Approved' },
    { id: 2, user: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', description: 'Submitted draft of the DPR for Phase 1.', date: '2025-09-28', status: 'Approved' },
];

const ApproveTasks = () => {
    const [tasks, setTasks] = useState(initialTeamTasks);
    const [filter, setFilter] = useState('Pending');

    const handleUpdateStatus = (taskId, newStatus) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, status: newStatus } : task
        ));
    };
    
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Approved': return 'badge-success';
            case 'Pending': return 'badge-warning';
            case 'Rejected': return 'badge-error';
            default: return 'badge-ghost';
        }
    };

    const filteredTasks = tasks.filter(task => task.status === filter);

    return (
        <div className="w-full h-full p-2 md:p-6">
            <div className="mb-8">
                <h1 className="text-4xl font-bold">Approve Team Tasks</h1>
                <p className="text-base-content/70">Review and approve task submissions from your team members.</p>
            </div>
            
            <div role="tablist" className="tabs tabs-boxed bg-base-200 mb-6">
                <a role="tab" className={`tab ${filter === 'Pending' ? 'tab-active' : ''}`} onClick={() => setFilter('Pending')}>Pending</a>
                <a role="tab" className={`tab ${filter === 'Approved' ? 'tab-active' : ''}`} onClick={() => setFilter('Approved')}>Approved</a>
                <a role="tab" className={`tab ${filter === 'Rejected' ? 'tab-active' : ''}`} onClick={() => setFilter('Rejected')}>Rejected</a>
            </div>

            <div className="overflow-x-auto bg-base-100 rounded-xl shadow-xl">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Submitted By</th>
                            <th>Task Description</th>
                            <th>Date</th>
                            <th>Status</th>
                            {filter === 'Pending' && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map((task) => (
                            <motion.tr key={task.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={task.avatar} alt={`${task.user} avatar`} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{task.user}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{task.description}</td>
                                <td>{task.date}</td>
                                <td><span className={`badge ${getStatusBadge(task.status)}`}>{task.status}</span></td>
                                {filter === 'Pending' && (
                                    <td className="flex gap-2">
                                        <button onClick={() => handleUpdateStatus(task.id, 'Approved')} className="btn btn-sm btn-success btn-outline gap-1"><FaCheck /> Approve</button>
                                        <button onClick={() => handleUpdateStatus(task.id, 'Rejected')} className="btn btn-sm btn-error btn-outline gap-1"><FaTimes /> Reject</button>
                                    </td>
                                )}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
                 {filteredTasks.length === 0 && <p className="text-center p-8 text-base-content/60">No tasks found for this category.</p>}
            </div>
        </div>
    );
};

export default ApproveTasks;