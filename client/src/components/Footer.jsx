import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: 'About Us', href: '/about' },
            { name: 'Careers', href: '/careers' },
            { name: 'Press', href: '/press' },
            { name: 'Blog', href: '/blog' }
        ],
        services: [
            { name: 'Digital Records', href: '/services/records' },
            { name: 'Consultations', href: '/services/consultations' },
            { name: 'Ayurvedic Care', href: '/services/ayurvedic' },
            { name: 'Mobile App', href: '/services/app' }
        ],
        support: [
            { name: 'Help Center', href: '/help' },
            { name: 'Contact Us', href: '/contact' },
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' }
        ]
    };

    const socialLinks = [
        { name: 'Facebook', icon: '📘', href: '#' },
        { name: 'Twitter', icon: '🐦', href: '#' },
        { name: 'Instagram', icon: '📷', href: '#' },
        { name: 'LinkedIn', icon: '💼', href: '#' }
    ];

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">🌿</span>
                            </div>
                            <span className="font-bold text-2xl">AyurSutra</span>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Digitalizing Ayurvedic healthcare with modern technology. Connect with expert practitioners and manage your wellness journey digitally.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((s, i) => (
                                <a key={i} href={s.href} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-300" title={s.name}>
                                    <span className="text-lg">{s.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((l, i) => (
                                <li key={i}><Link to={l.href} className="text-gray-400 hover:text-green-400 transition-colors duration-300">{l.name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Services</h3>
                        <ul className="space-y-3">
                            {footerLinks.services.map((l, i) => (
                                <li key={i}><Link to={l.href} className="text-gray-400 hover:text-green-400 transition-colors duration-300">{l.name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((l, i) => (
                                <li key={i}><Link to={l.href} className="text-gray-400 hover:text-green-400 transition-colors duration-300">{l.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                        <p className="text-gray-400 mb-4">Get the latest updates on Ayurvedic healthcare and wellness tips.</p>
                        <div className="flex space-x-2">
                            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors duration-300" />
                            <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300">Subscribe</button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">© {currentYear} AyurSutra. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-300">Privacy Policy</Link>
                        <Link to="/terms" className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-300">Terms of Service</Link>
                        <Link to="/cookies" className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-300">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
