import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const { isLoggedIn, userData, setIsLoggedIn, setUserData, backendUrl } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);

    // Check if user is logged in
    if (!isLoggedIn || !userData) {
        return <Navigate to="/login" replace />;
    }

    // Fetch user data from backend
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/common/getuserdata`, {
                    withCredentials: true
                });
                if (data.success) {
                    setUserProfile(data.user);
                    setUserData(data.user);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [backendUrl, setUserData]);

    const handleLogout = async () => {
        try {
            await axios.get(`${backendUrl}/api/common/logout`, { withCredentials: true });
        } catch (e) { 
            toast.error(e.message)
        }
        setIsLoggedIn(false);
        setUserData(null);
    };

    const dashboardStats = [
        { title: "Total Appointments", value: "12", icon: "📅", color: "from-blue-500 to-blue-600" },
        { title: "Health Records", value: "8", icon: "📋", color: "from-green-500 to-green-600" },
        { title: "Active Treatments", value: "3", icon: "💊", color: "from-purple-500 to-purple-600" },
        { title: "Consultations", value: "15", icon: "👨‍⚕️", color: "from-orange-500 to-orange-600" }
    ];

    const recentActivities = [
        { type: "Appointment", description: "Scheduled consultation with Dr. Sharma", time: "2 hours ago", icon: "📅" },
        { type: "Treatment", description: "Started new Ayurvedic treatment plan", time: "1 day ago", icon: "🌿" },
        { type: "Record", description: "Updated health records", time: "2 days ago", icon: "📋" },
        { type: "Consultation", description: "Completed video consultation", time: "3 days ago", icon: "👨‍⚕️" }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    const currentUser = userProfile || userData;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="pt-20">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center justify-between"
                        >
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                                    Welcome back, {currentUser.name || currentUser.email}!
                                </h1>
                                <p className="text-green-100 text-lg">
                                    Manage your health journey with AyurSutra
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLogout}
                                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-all duration-300"
                            >
                                Logout
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* User Info Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-white rounded-3xl shadow-xl p-8 mb-8"
                    >
                        <div className="flex items-center space-x-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                                {(currentUser.name || currentUser.email || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    {currentUser.name || 'User'}
                                </h2>
                                <p className="text-gray-600 mb-1">{currentUser.email}</p>
                                <p className="text-gray-500 text-sm">
                                    Member since {new Date(currentUser.createdAt || Date.now()).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-500 mb-1">User ID</div>
                                <div className="font-mono text-gray-700">{currentUser._id}</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Profile Update Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="bg-white rounded-3xl shadow-xl p-8 mb-8"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Update Profile</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    defaultValue={currentUser.name || ''}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    defaultValue={currentUser.email || ''}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Enter your email"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    defaultValue={currentUser.phone || ''}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    defaultValue={currentUser.dateOfBirth || ''}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                <textarea
                                    defaultValue={currentUser.address || ''}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Enter your address"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Update Profile
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                    >
                        {dashboardStats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-2xl`}>
                                        {stat.icon}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Recent Activities */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white rounded-3xl shadow-xl p-8"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Activities</h3>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                                >
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm">
                                        {activity.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{activity.description}</p>
                                        <p className="text-sm text-gray-500">{activity.time}</p>
                                    </div>
                                    <div className="text-sm text-gray-400">{activity.type}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Dashboard;
