import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify' 

// Sample data...
const teamMembers = [
    { id: 1, name: 'John Doe', avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' },
    { id: 2, name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, name: 'Mark Williams', avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
];
const initialAssignedTasks = [
    { id: 101, title: 'Review Phase 1 DPR Draft', assignedTo: [teamMembers[1]], dueDate: '2025-10-10', priority: 'High', status: 'Pending' },
    { id: 102, title: 'Conduct Hydrological Survey', assignedTo: [teamMembers[0], teamMembers[2]], dueDate: '2025-10-15', priority: 'Medium', status: 'Pending' },
];

const AssignTask = () => {
    const [assignedTasks, setAssignedTasks] = useState(initialAssignedTasks);
    const [taskTitle, setTaskTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [selectedMembers, setSelectedMembers] = useState([]);

    const handleCheckboxChange = (memberId) => {
        setSelectedMembers(prev => 
            prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskTitle || selectedMembers.length === 0) {
          
            toast.error('Please provide a title and select a team member.');
            return;
        }

        const newAssignedTask = {
            id: Date.now(),
            title: taskTitle,
            assignedTo: teamMembers.filter(m => selectedMembers.includes(m.id)),
            dueDate,
            priority,
            status: 'Pending',
        };

        setAssignedTasks([newAssignedTask, ...assignedTasks]);
        
       
        toast.success('Task assigned successfully!');

        // Reset form
        setTaskTitle('');
        setDescription('');
        setDueDate('');
        setPriority('Medium');
        setSelectedMembers([]);
    };
    
    // ... (getPriorityBadge function remains the same)
    const getPriorityBadge = (p) => {
        if (p === 'High') return 'badge-error';
        if (p === 'Medium') return 'badge-warning';
        return 'badge-info';
    };

    return (
        <div className="w-full h-full p-2 md:p-6">
            <h1 className="text-4xl font-bold mb-8">Assign a New Task</h1>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* --- ASSIGN TASK FORM --- */}
                <form onSubmit={handleSubmit} className="lg:col-span-2 card bg-base-100 shadow-xl p-6 space-y-4">
                    <input type="text" placeholder="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="input input-bordered w-full" required />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="textarea textarea-bordered w-full h-24" placeholder="Task Description..."></textarea>
                    <div>
                        <label className="label font-semibold">Assign To:</label>
                        <div className="space-y-2 p-2 rounded-lg bg-base-200">
                            {teamMembers.map(member => (
                                <div key={member.id} className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">{member.name}</span> 
                                        <input type="checkbox" checked={selectedMembers.includes(member.id)} onChange={() => handleCheckboxChange(member.id)} className="checkbox checkbox-primary" />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="input input-bordered w-full" required />
                    <select value={priority} onChange={(e) => setPriority(e.target.value)} className="select select-bordered w-full">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                    <button type="submit" className="btn btn-primary w-full gap-2"><FaPaperPlane /> Assign Task</button>
                  
                </form>

                
                <div className="lg:col-span-3 card bg-base-100 shadow-xl p-6">
                    <h2 className="text-2xl font-bold mb-4">Recently Assigned Tasks</h2>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr><th>Task</th><th>Assigned To</th><th>Due Date</th><th>Priority</th></tr>
                            </thead>
                            <tbody>
                                {assignedTasks.map(task => (
                                    <motion.tr key={task.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <td>{task.title}</td>
                                        <td>
                                            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                                                {task.assignedTo.map(member => (
                                                     <div key={member.id} className="avatar tooltip" data-tip={member.name}>
                                                        <div className="w-10">
                                                            <img src={member.avatar} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td>{task.dueDate}</td>
                                        <td><span className={`badge ${getPriorityBadge(task.priority)}`}>{task.priority}</span></td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignTask;