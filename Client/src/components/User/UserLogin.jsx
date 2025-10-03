import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaSignInAlt, FaUserShield, FaUserTie, FaUser, FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        toast.info("This is a prototype. Please use the one-click login buttons below.");
    };

    const handlePrototypeLogin = (role) => {
        localStorage.setItem("isLoggedIn", "true");
        let roleName = '';
        let path = '/';
        switch (role) {
            case 'employee': roleName = 'Employee'; path = '/employee/dashboard'; break;
            case 'head': roleName = 'Project Head'; path = '/head/dashboard'; break;
            case 'admin': roleName = 'Admin'; path = '/admin/dashboard'; break;
            default: break;
        }
        toast.success(`Logged in as ${roleName}! Redirecting...`);
        navigate(path);
    };

    // --- Animation Variants for Framer Motion ---
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
    };
    
    const lineVariants = {
        hidden: { scaleX: 0 },
        visible: { scaleX: 1, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <div className="flex min-h-screen font-sans">
            {/* --- LEFT BRANDING PANEL (Stays Blue) --- */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 p-12 text-white animated-gradient">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center"
                >
                    <h1 className="text-5xl font-bold tracking-wider">
                        Perf<span className="text-success -ml-1">Manage</span>
                    </h1>
                    <p className="mt-4 text-lg text-white/80 max-w-sm">
                        Enhancing accountability and driving productivity through data-driven performance insights.
                    </p>
                </motion.div>
            </div>

            {/* --- RIGHT LOGIN FORM PANEL (Reverted to White Theme) --- */}
            <div className="w-full lg:w-1/2 flex justify-center items-center bg-base-100 p-6 sm:p-8">
                <div className="w-full max-w-md">
                    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                        
                        <motion.div variants={itemVariants} className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-base-content">Welcome Back!</h1>
                            <p className="text-base-content/70 mt-2">Login to your PerfManage account.</p>
                        </motion.div>
                        
                        <motion.form variants={itemVariants} onSubmit={handleFormSubmit} className="space-y-4">
                            {/* MICRO-ANIMATION: Added focus-within for a glow effect */}
                            <label className="input input-bordered flex items-center gap-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                                <FaEnvelope className="text-base-content/40" />
                                <input type="email" className="grow" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                                <FaLock className="text-base-content/40" />
                                <input type="password" className="grow" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </label>
                            <div className="text-right text-sm">
                                <a href="#" className="link link-hover text-primary">Forgot password?</a>
                            </div>
                            {/* MICRO-ANIMATION: Enhanced hover/active effects */}
                            <button type="submit" className="btn btn-primary w-full gap-2 transform transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
                                <FaSignInAlt /> Login
                            </button>
                        </motion.form>

                        <motion.div variants={itemVariants} className="flex items-center gap-4 my-6">
                            {/* MICRO-ANIMATION: Custom animated divider */}
                            <motion.div variants={lineVariants} className="h-px bg-base-300 w-full"></motion.div>
                            <span className="text-xs text-base-content/60">OR</span>
                            <motion.div variants={lineVariants} className="h-px bg-base-300 w-full"></motion.div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <button className="btn btn-outline w-full gap-2 transform transition-transform duration-200 hover:-translate-y-1">
                                <FaGoogle /> Sign in with Google
                            </button>
                        </motion.div>

                        <motion.div variants={itemVariants} className="p-4 mt-8 border border-base-300 bg-base-200 rounded-lg text-center">
                            <h3 className="font-bold text-base-content">Just for Prototype</h3>
                            <p className="text-sm text-base-content/70 mb-4">Click a role to log in instantly.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-2">
                                <button onClick={() => handlePrototypeLogin('employee')} className="btn btn-sm btn-ghost gap-2 transform transition-transform duration-200 hover:-translate-y-1"><FaUser /> Employee</button>
                                <button onClick={() => handlePrototypeLogin('head')} className="btn btn-sm btn-ghost gap-2 transform transition-transform duration-200 hover:-translate-y-1"><FaUserTie /> Project Head</button>
                                <button onClick={() => handlePrototypeLogin('admin')} className="btn btn-sm btn-ghost gap-2 transform transition-transform duration-200 hover:-translate-y-1"><FaUserShield /> Admin</button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;