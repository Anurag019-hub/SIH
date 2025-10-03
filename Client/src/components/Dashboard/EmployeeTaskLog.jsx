import {React,useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheck } from 'react-icons/fa';

// --- New, more detailed sample data for the entire workflow ---
const initialTasks = [
    // Tasks assigned to the employee, not yet completed
    { id: 1, title: 'Prepare Weekly Progress Report', assignedBy: 'Jane Smith', dueDate: '2025-10-05', priority: 'High', status: 'Pending' },
    { id: 2, title: 'Update Site Survey Data', assignedBy: 'Jane Smith', dueDate: '2025-10-08', priority: 'Medium', status: 'Pending' },
    
    // Tasks the employee has marked as complete, awaiting approval
    { id: 3, title: 'Prepared minutes for the weekly project meeting.', completedDate: '2025-10-02', status: 'Completed' },

    // Tasks that have been fully approved by a manager
    { id: 4, title: 'Completed initial site survey for Riverfront Project.', completedDate: '2025-10-01', approvedDate: '2025-10-02', status: 'Approved' },
    { id: 5, title: 'Submitted draft of the DPR for Phase 1.', completedDate: '2025-09-28', approvedDate: '2025-09-29', status: 'Approved' },
];


const EmployeeTaskLog = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [activeTab, setActiveTab] = useState('Pending'); // Default to pending tasks
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToComplete, setTaskToComplete] = useState(null);
    const [completionNotes, setCompletionNotes] = useState('');

    // Filter tasks based on the active tab
    const pendingTasks = tasks.filter(t => t.status === 'Pending');
    const completedTasks = tasks.filter(t => t.status === 'Completed');
    const approvedTasks = tasks.filter(t => t.status === 'Approved');
    
    // --- Handlers for the "Mark as Complete" workflow ---
    const openCompleteModal = (task) => {
        setTaskToComplete(task);
        setIsModalOpen(true);
    };

    const handleConfirmCompletion = () => {
        setTasks(tasks.map(task => 
            task.id === taskToComplete.id 
                ? { ...task, status: 'Completed', completedDate: new Date().toISOString().slice(0, 10) } 
                : task
        ));
        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTaskToComplete(null);
        setCompletionNotes('');
    };
    
    const getPriorityBadge = (p) => {
        if (p === 'High') return 'badge-error';
        if (p === 'Medium') return 'badge-warning';
        return 'badge-info';
    };

    // Determine which list of tasks to render
    const tasksToRender = {
        'Pending': pendingTasks,
        'Completed': completedTasks,
        'Approved': approvedTasks
    }[activeTab];

    return (
        <div className="w-full h-full p-2 md:p-6">
            <div className="mb-8">
                <h1 className="text-4xl font-bold">My Tasks</h1>
                <p className="text-base-content/70">View your assigned tasks and track your work.</p>
            </div>
            
            {/* --- TABBED INTERFACE --- */}
            <div role="tablist" className="tabs tabs-boxed bg-base-200 mb-6">
                <a role="tab" className={`tab ${activeTab === 'Pending' ? 'tab-active' : ''}`} onClick={() => setActiveTab('Pending')}>
                    Pending <div className="badge badge-primary ml-2">{pendingTasks.length}</div>
                </a>
                <a role="tab" className={`tab ${activeTab === 'Completed' ? 'tab-active' : ''}`} onClick={() => setActiveTab('Completed')}>
                    Completed by Me <div className="badge badge-warning ml-2">{completedTasks.length}</div>
                </a>
                <a role="tab" className={`tab ${activeTab === 'Approved' ? 'tab-active' : ''}`} onClick={() => setActiveTab('Approved')}>
                    Approved <div className="badge badge-success ml-2">{approvedTasks.length}</div>
                </a>
            </div>

            {/* --- TASK TABLE --- */}
            <div className="overflow-x-auto bg-base-100 rounded-xl shadow-xl">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Task</th>
                            {activeTab === 'Pending' && <><th>Assigned By</th><th>Due Date</th><th>Priority</th><th>Action</th></>}
                            {activeTab === 'Completed' && <><th>Completed Date</th><th>Status</th></>}
                            {activeTab === 'Approved' && <><th>Completed Date</th><th>Approved Date</th></>}
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {tasksToRender.map((task) => (
                                <motion.tr key={task.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <td><div className="font-bold">{task.title}</div></td>
                                    {activeTab === 'Pending' && <>
                                        <td>{task.assignedBy}</td>
                                        <td>{task.dueDate}</td>
                                        <td><span className={`badge ${getPriorityBadge(task.priority)}`}>{task.priority}</span></td>
                                        <td><button onClick={() => openCompleteModal(task)} className="btn btn-sm btn-success btn-outline">Mark as Complete</button></td>
                                    </>}
                                    {activeTab === 'Completed' && <>
                                        <td>{task.completedDate}</td>
                                        <td><span className="badge badge-warning">Pending Approval</span></td>
                                    </>}
                                    {activeTab === 'Approved' && <>
                                        <td>{task.completedDate}</td>
                                        <td>{task.approvedDate}</td>
                                    </>}
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
                 {tasksToRender.length === 0 && <p className="text-center p-8 text-base-content/60">No tasks in this category.</p>}
            </div>

            {/* --- "MARK AS COMPLETE" MODAL --- */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div className="modal modal-open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="modal-box">
                            <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><FaTimes /></button>
                            <h3 className="font-bold text-lg">Complete Task</h3>
                            <p className="py-2">You are about to mark the following task as complete:</p>
                            <p className="font-semibold p-4 bg-base-200 rounded-lg">"{taskToComplete?.title}"</p>
                            <textarea value={completionNotes} onChange={(e) => setCompletionNotes(e.target.value)} placeholder="Add completion notes (optional)..." className="textarea textarea-bordered w-full h-24 mt-4"></textarea>
                            <div className="modal-action">
                                <button onClick={closeModal} className="btn">Cancel</button>
                                <button onClick={handleConfirmCompletion} className="btn btn-success gap-2"><FaCheck /> Confirm Completion</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EmployeeTaskLog;