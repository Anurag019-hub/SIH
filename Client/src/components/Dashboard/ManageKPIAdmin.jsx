import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

// "formula" property has been removed from the data objects
const initialKpis = [
    { id: 1, name: 'Task Timeliness', description: 'Measures punctuality in completing tasks.', role: 'Employee', status: 'Active' },
    { id: 2, name: 'Quality Score', description: 'Peer/supervisor review rating for work quality.', role: 'Project Head', status: 'Active' },
    { id: 3, name: 'Budget Utilization Ratio (BUR)', description: 'Ensures financial discipline for projects.', role: 'Organization', status: 'Active' },
    { id: 4, name: 'Innovation & Initiative', description: 'Measures employee engagement and creativity.', role: 'Employee', status: 'Inactive' },
];

const ManageKpis = () => {
    const [kpis, setKpis] = useState(initialKpis);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentKpi, setCurrentKpi] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [kpiToDelete, setKpiToDelete] = useState(null);

    const handleAddNew = () => {
        // "formula" property removed from the new KPI object
        setCurrentKpi({ name: '', description: '', role: 'Employee', status: 'Active' });
        setIsModalOpen(true);
    };

    const handleEdit = (kpi) => {
        setCurrentKpi(kpi);
        setIsModalOpen(true);
    };

    const handleDelete = (kpi) => {
        setKpiToDelete(kpi);
        setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
        setKpis(kpis.filter(k => k.id !== kpiToDelete.id));
        toast.success(`KPI "${kpiToDelete.name}" deleted successfully.`);
        setIsConfirmOpen(false);
        setKpiToDelete(null);
    };

    const handleSave = () => {
        if (currentKpi.id) {
            setKpis(kpis.map(k => (k.id === currentKpi.id ? currentKpi : k)));
            toast.success(`KPI "${currentKpi.name}" updated successfully.`);
        } else {
            const newKpi = { ...currentKpi, id: Date.now() };
            setKpis([...kpis, newKpi]);
            toast.success(`KPI "${newKpi.name}" created successfully.`);
        }
        setIsModalOpen(false);
        setCurrentKpi(null);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setCurrentKpi({ ...currentKpi, [name]: value });
    };

    return (
        <div className="w-full h-full p-2 md:p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold">Manage KPIs</h1>
                    <p className="text-base-content/70">Define and assign performance metrics across the organization.</p>
                </div>
                <button onClick={handleAddNew} className="btn btn-primary gap-2">
                    <FaPlus /> Add New KPI
                </button>
            </div>

            <div className="overflow-x-auto bg-base-100 rounded-xl shadow-xl">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>KPI Name</th>
                            <th>Target Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {kpis.map((kpi) => (
                                <motion.tr 
                                    key={kpi.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <td>
                                        <div className="font-bold">{kpi.name}</div>
                                        <div className="text-sm opacity-60">{kpi.description}</div>
                                    </td>
                                    <td>{kpi.role}</td>
                                    <td>
                                        <span className={`badge ${kpi.status === 'Active' ? 'badge-success' : 'badge-ghost'}`}>
                                            {kpi.status}
                                        </span>
                                    </td>
                                    <td className="flex gap-2">
                                        <button onClick={() => handleEdit(kpi)} className="btn btn-sm btn-outline btn-info gap-1"><FaEdit /> Edit</button>
                                        <button onClick={() => handleDelete(kpi)} className="btn btn-sm btn-outline btn-error gap-1"><FaTrash /> Delete</button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div className="modal modal-open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                         <div className="modal-box relative">
                             <button onClick={() => setIsModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><FaTimes /></button>
                            <h3 className="font-bold text-lg">{currentKpi?.id ? 'Edit KPI' : 'Add New KPI'}</h3>
                            <div className="py-4 space-y-4">
                                <input type="text" name="name" value={currentKpi.name} onChange={handleFormChange} placeholder="KPI Name" className="input input-bordered w-full" />
                                <textarea name="description" value={currentKpi.description} onChange={handleFormChange} placeholder="Description" className="textarea textarea-bordered w-full"></textarea>
                                <select name="role" value={currentKpi.role} onChange={handleFormChange} className="select select-bordered w-full">
                                    <option>Employee</option>
                                    <option>Project Head</option>
                                    <option>Organization</option>
                                </select>
                                {/* "Formula" input field has been removed from the modal */}
                                <select name="status" value={currentKpi.status} onChange={handleFormChange} className="select select-bordered w-full">
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                            <div className="modal-action">
                                <button onClick={() => setIsModalOpen(false)} className="btn">Cancel</button>
                                <button onClick={handleSave} className="btn btn-primary">Save Changes</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <AnimatePresence>
                {isConfirmOpen && (
                    <motion.div className="modal modal-open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Confirm Deletion</h3>
                            <p className="py-4">Are you sure you want to delete the KPI: <span className="font-bold">"{kpiToDelete?.name}"</span>? This action cannot be undone.</p>
                            <div className="modal-action">
                                <button onClick={() => setIsConfirmOpen(false)} className="btn">Cancel</button>
                                <button onClick={confirmDelete} className="btn btn-error">Delete</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageKpis;