import React from 'react';
import { Link } from 'react-router-dom';
import { IoLogoFacebook, IoLogoTwitter, IoLogoInstagram, IoLogoLinkedin, IoMail, IoCall, IoLocation } from "react-icons/io5";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            {/* Gradient Logo Icon Placeholder - using text for now or similar SVG if available */}
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                                B
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                BookEase
                            </span>
                        </Link>
                        <p className="text-gray-500 leading-relaxed">
                            Simplifying appointment scheduling for professionals and clients alike. Connect, book, and manage with ease.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                                <IoLogoFacebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                                <IoLogoTwitter size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                                <IoLogoInstagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                                <IoLogoLinkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-gray-900 font-bold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/" className="text-gray-500 hover:text-blue-600 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link to="/providers" className="text-gray-500 hover:text-blue-600 transition-colors">Find Providers</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-500 hover:text-blue-600 transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-500 hover:text-blue-600 transition-colors">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-gray-900 font-bold text-lg mb-6">Services</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">General Consultation</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Mental Health</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Fitness & Wellness</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Dental Care</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-gray-900 font-bold text-lg mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-500">
                                <IoLocation size={24} className="text-blue-600 shrink-0" />
                                <span>123 Innovation Dr, Tech City, TC 90210</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500">
                                <IoCall size={20} className="text-blue-600 shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500">
                                <IoMail size={20} className="text-blue-600 shrink-0" />
                                <span>support@bookease.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} BookEase. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
