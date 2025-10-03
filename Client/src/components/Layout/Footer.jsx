import React from 'react';
// Importing icons for social media links
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
    // Get the current year dynamically for the copyright notice
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-neutral text-neutral-content p-10">
            <div className="footer footer-horizontal not-lg:footer-vertical">
                <aside>
                    {/* Reusing the logo style from the navbar for brand consistency */}
                    <h2 className="text-3xl font-bold tracking-wider">
                        Perf<span className="text-success">Manage</span>
                    </h2>
                    <p className="max-w-xs mt-2 text-neutral-content/70">
                        A transparent, data-driven platform enhancing accountability and productivity for the Brahmaputra Board.
                    </p>
                </aside>

                {/* --- RELEVANT LINKS ONLY --- */}
                <nav>
                    <h6 className="footer-title">Quick Links</h6>
                    <a className="link link-hover">Home</a>
                    <a className="link link-hover">About Us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">FAQ</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Resources</h6>
                    <a href="#" className="link link-hover">Brahmaputra Board Official Site</a>
                    <a href="#" className="link link-hover">Ministry of Jal Shakti</a>
                    <a href="#" className="link link-hover">e-Office Portal</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                </nav>
            </div>

            {/* --- BOTTOM BAR with Copyright and Socials --- */}
            <div className="mt-10 pt-6 border-t border-neutral-focus flex flex-col sm:flex-row justify-between items-center">
                <p className="text-sm text-neutral-content/60">
                    &copy; {currentYear} PerfManage. All rights reserved.
                </p>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <a href="#" className="text-xl hover:text-success transition-colors duration-300">
                        <FaTwitter />
                    </a>
                    <a href="#" className="text-xl hover:text-success transition-colors duration-300">
                        <FaLinkedin />
                    </a>
                    <a href="#" className="text-xl hover:text-success transition-colors duration-300">
                        <FaGithub />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;