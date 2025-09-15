import React from 'react';
import { motion } from 'framer-motion';

const ServicesSection = () => {
    const services = [
        { icon: '🏥', title: 'Automated Therapy Scheduling', description: '', features: ['Smart Session Planning', 'Easy Reschedule Options', 'Practitioner-Patient Sync'] },
        { icon: '🕒', title: 'Real-Time Therapy Tracking', description: '', features: ['Live Session Updates', 'Patient Progress View', 'Milestone Monitoring'] },
        { icon: '📊', title: 'Visualization Tools', description: '', features: ['Graph-based Insights', 'Progress Bars Display', 'Improvement Trends'] },
        { icon: '🔄', title: 'Integrated Feedback Loop', description: '', features: ['Session-wise Reporting', 'Symptom & Side-Effect Logs', 'Adaptive Schedule Refinement'] },
        { icon: '📲', title: 'Digital Patient Management ', description: '', features: ['Centralized Health Records', 'Therapy History Access', 'Easy Practitioner View'] },
        { icon: '🔔', title: 'Pre- and Post- Therapy Notifications', description: '', features: ['Personalized Doctor Reminders', 'Multi-channel Alerts (SMS/email/app)', 'Timely Precaution Updates'] }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Our <span className="bg-gradient-to-r text-black bg-clip-text text-transparent">Services</span></h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Experience comprehensive healthcare services that combine the wisdom of Ayurveda with modern technology.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((s, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.05, delay: 0.050 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-16 h-16 bg-[#FFEED3] rounded-2xl flex items-center justify-center mb-6">
                                <span className="text-3xl">{s.icon}</span>
                            </motion.div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{s.title}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">{s.description}</p>
                            <div className="space-y-2">
                                {s.features.map((f, fi) => (
                                    <motion.div key={fi} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: (i * 0.1) + (fi * 0.1) }} viewport={{ once: true }} className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-[#e3a138] rounded-full"></div>
                                        <span className="text-sm text-gray-700">{f}</span>
                                    </motion.div>
                                ))}
                            </div>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-6 text-orange-600 font-semibold hover:text-black transition-colors duration-300 flex items-center space-x-2">
                                <span>Learn More</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mt-16">
                    <div className="bg-gradient-to-br from-[#f0b384] to-[#dba348] rounded-3xl p-8 sm:p-12 text-white">
                        <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Your Wellness Journey?</h3>
                        <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">Join thousands of patients who have transformed their health with PanchSetu.</p>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white text-black hover:text-orange-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300">Get Started Today</motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesSection;
