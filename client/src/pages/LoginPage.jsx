import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import LoginPagePic from "../../public/LoginPagePic.jpg"
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {

  const { backendUrl, setIsLoggedIn, setUserData, isLoggedIn, userData } = useAppContext();
  const navigate = useNavigate();

  const [step, setStep] = useState('selection'); // 'selection' or 'form'
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessLoader, setShowSuccessLoader] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentEmoji, setCurrentEmoji] = useState(0);

  // Redirect logged-in users to homepage safely (without breaking hooks order)
  useEffect(() => {
    if (isLoggedIn && userData) {
      navigate('/');
    }
  }, [isLoggedIn, userData, navigate]);

  const roles = [
    {
      id: 'patient',
      title: 'Patient',
      description: 'Access your health records and book appointments',
      icon: '👤',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'practitioner',
      title: 'Practitioner',
      description: 'Manage patients and treatment plans',
      icon: '👨‍⚕️',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'hospital',
      title: 'Hospital',
      description: 'Administrative dashboard and staff management',
      icon: '🏥',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'System administration and user management',
      icon: '⚙️',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ]



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (!password || password.length < 6) {
        toast.error("Password must be at least 6 characters long", {
          position: "top-center",
          autoClose: 3000,
        });
        setLoading(false);
        return;
      }

      if (!isLogin && password !== confirmPassword) {
        toast.error("Passwords do not match", {
          position: "top-center",
          autoClose: 3000,
        });
        setLoading(false);
        return;
      }

      if (!isLogin && !name.trim()) {
        toast.error("Name is required", {
          position: "top-center",
          autoClose: 3000,
        });
        setLoading(false);
        return;
      }

      if ((selectedRole.id === 'patient' || selectedRole.id === 'practitioner') && !email) {
        toast.error("Email is required", {
          position: "top-center",
          autoClose: 3000,
        });
        setLoading(false);
        return;
      }

      if ((selectedRole.id === 'hospital' || selectedRole.id === 'admin') && !id) {
        toast.error(`${selectedRole.title} ID is required`, {
          position: "top-center",
          autoClose: 3000,
        });
        setLoading(false);
        return;
      }

      let endpoint = "";
      let payload = {};

      if (isLogin) {
        // Login logic
        if (selectedRole.id === 'patient') {
          endpoint = "/api/auth/patient-login";
          payload = { email, password };
        } else if (selectedRole.id === 'practitioner') {
          endpoint = "/api/auth/practitioner-login";
          payload = { email, password };
        } else if (selectedRole.id === 'hospital') {
          endpoint = "/api/auth/hospital-login";
          payload = { hospitalId: id, password };
        } else if (selectedRole.id === 'admin') {
          endpoint = "/api/auth/admin-login";
          payload = { adminId: id, password };
        }
      } else {
        // Register logic (only for patient and practitioner)
        if (selectedRole.id === 'patient') {
          endpoint = "/api/auth/patient-register";
          payload = { name, email, password };
        } else if (selectedRole.id === 'practitioner') {
          endpoint = "/api/auth/practitioner-register";
          payload = { name, email, password };
        }
      }

      const { data } = await axios.post(backendUrl + endpoint, payload, { withCredentials: true });

      if (data.success) {
        // Show success toast
        toast.success(data.message || "Success!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Show success message
        setSuccessMessage(data.message || "Success!");
        setShowSuccessLoader(true);

        // Update login state and user data (cookie is already set by server)
        setIsLoggedIn(true);
        setUserData(data.user);

        // Show success notification for 5 seconds then navigate
        setTimeout(() => {
          setShowSuccessLoader(false);
          // Navigate back to homepage
          window.location.href = '/';
        }, 5000);
      } else {
        toast.error(data.message || "Something went wrong", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setId("");
  }

  // Healthcare-themed emojis for the loader
  const healthcareEmojis = [
    "❤️", "🩺", "👨‍⚕️", "👩‍⚕️", "🏥", "💊", "🩹", "🧬", "🌿", "🧘‍♀️",
    "💚", "🔬", "📋", "🩻", "💉", "🫀", "🧠", "🦴", "🫁", "🩸"
  ];

  // Emoji changing effect
  useEffect(() => {
    if (showSuccessLoader) {
      const emojiInterval = setInterval(() => {
        setCurrentEmoji((prev) => (prev + 1) % healthcareEmojis.length);
      }, 300); // Change emoji every 300ms

      return () => clearInterval(emojiInterval);
    }
  }, [showSuccessLoader]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setStep('form')
    clearForm();
  }

  const handleBack = () => {
    setStep('selection')
    setSelectedRole(null)
    clearForm();
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#FFF8ED] font-sans relative overflow-hidden p-4">
      {/* Success Loader Overlay */}
      <AnimatePresence>
        {showSuccessLoader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm sm:max-w-md w-full mx-4 text-center"
            >
              {/* Animated Emoji Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg"
              >
                <motion.div
                  key={currentEmoji}
                  initial={{ scale: 0.5, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className="text-3xl sm:text-4xl"
                >
                  {healthcareEmojis[currentEmoji]}
                </motion.div>
              </motion.div>

              {/* Success Message */}
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl sm:text-2xl font-bold text-gray-800 mb-2"
              >
                Welcome to AyurSutra! 🌿
              </motion.h3>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base"
              >
                {successMessage}
              </motion.p>

              {/* Animated Loading Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mb-4"
              >
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>

              {/* Loading Text with Emoji */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex items-center justify-center space-x-2"
              >
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-lg"
                >
                  🚀
                </motion.span>
                <span className="text-xs sm:text-sm text-gray-500">Preparing your dashboard...</span>
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                  className="text-lg"
                >
                  ⚡
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] bg-blue-400/30 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] bg-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] bg-green-400/20 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />

      {/* Main Container */}
      <motion.div
        className="relative flex flex-col lg:flex-row w-full max-w-6xl min-h-[600px] lg:h-[90vh] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/80 backdrop-blur-lg z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Left Section - Form/Selection */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-8 lg:py-10 relative z-20">
          <AnimatePresence mode="wait">
            {step === 'selection' ? (
              <motion.div
                key="selection"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                <div className="text-center mb-6 sm:mb-8">
                  <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                    Welcome to AyurSutra 🌿
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Choose your role to continue</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto">
                  {roles.map((role) => (
                    <motion.div
                      key={role.id}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRoleSelect(role)}
                      className={`${role.bgColor} ${role.borderColor} border-2 rounded-xl sm:rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-lg group`}
                    >
                      <div className="text-center">
                        <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{role.icon}</div>
                        <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-1 sm:mb-2">{role.title}</h3>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{role.description}</p>
                        <div className={`mt-3 sm:mt-4 w-6 sm:w-8 h-1 bg-gradient-to-r ${role.color} rounded-full mx-auto group-hover:w-10 sm:group-hover:w-12 transition-all duration-300`}></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                {/* Back Button */}
                <motion.button
                  onClick={handleBack}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="mb-4 sm:mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to selection
                </motion.button>

                {/* Role Badge */}
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className={`text-xl sm:text-2xl mr-2 sm:mr-3`}>{selectedRole.icon}</div>
                  <div>
                    <h2 className="font-bold text-lg sm:text-xl text-gray-800">Login as {selectedRole.title}</h2>
                    <p className="text-gray-600 text-xs sm:text-sm">{selectedRole.description}</p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {isLogin ? (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 w-full max-w-md">
                        {/* Show different fields based on role */}
                        {(selectedRole.id === 'patient' || selectedRole.id === 'practitioner') ? (
                          <>
                            <div className="relative">
                              <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="Enter your email..."
                                className="w-full rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 shadow-sm text-gray-700 placeholder-gray-400 text-sm sm:text-base
                                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg transition"
                                required
                              />
                            </div>

                            <div className="relative">
                              <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder="Enter your password..."
                                className="w-full rounded-xl px-4 py-3 border border-gray-300 shadow-sm text-gray-700 placeholder-gray-400
                                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg transition"
                                required
                              />
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                              <label className="flex items-center text-xs sm:text-sm text-gray-600">
                                <input type="checkbox" className="mr-2 rounded" />
                                Remember me
                              </label>
                              <button
                                type="button"
                                className="text-xs sm:text-sm text-blue-600 hover:underline"
                              >
                                Forgot Password?
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="relative">
                              <input
                                onChange={(e) => setId(e.target.value)}
                                value={id}
                                type="text"
                                placeholder={`Enter your ${selectedRole.id === 'hospital' ? 'Hospital' : 'Admin'} ID...`}
                                className="w-full rounded-xl px-4 py-3 border border-gray-300 shadow-sm text-gray-700 placeholder-gray-400
                                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg transition"
                                required
                              />
                            </div>

                            <div className="relative">
                              <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder="Enter your password..."
                                className="w-full rounded-xl px-4 py-3 border border-gray-300 shadow-sm text-gray-700 placeholder-gray-400
                                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg transition"
                                required
                              />
                            </div>

                            <div className="flex justify-end">
                              <button
                                type="button"
                                className="text-sm text-blue-600 hover:underline"
                              >
                                Forgot Password?
                              </button>
                            </div>
                          </>
                        )}

                        <motion.button
                          type="submit"
                          disabled={loading}
                          whileHover={{ scale: loading ? 1 : 1.02 }}
                          whileTap={{ scale: loading ? 1 : 0.98 }}
                          className={`relative py-3 font-semibold text-lg rounded-xl text-white shadow-lg
                                    bg-gradient-to-r ${selectedRole.color} overflow-hidden ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          <span className="relative z-10">
                            {loading ? (
                              <div className="flex items-center justify-center">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                ></motion.div>
                                <span>Processing...</span>
                              </div>
                            ) : (
                              `Login as ${selectedRole.title}`
                            )}
                          </span>
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20"
                            animate={loading ? { x: ["-100%", "100%"] } : {}}
                            transition={loading ? { duration: 1.5, repeat: Infinity, ease: "linear" } : {}}
                          ></motion.span>
                        </motion.button>
                      </form>

                      {/* Only show register option for patient and practitioner */}
                      {(selectedRole.id === 'patient' || selectedRole.id === 'practitioner') && (
                        <div className="mt-4 sm:mt-6 text-center">
                          <p className="text-xs sm:text-sm text-gray-600">
                            Don't have an account?{" "}
                            <button
                              className="text-blue-600 font-medium hover:underline"
                              onClick={() => setIsLogin(false)}
                            >
                              Register now
                            </button>
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="register"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md">
                        <div className="relative">
                          <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Enter your full name..."
                            className="w-full rounded-xl px-4 py-3 border border-gray-300 shadow-sm text-gray-700 placeholder-gray-400
                                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg transition"
                            required
                          />
                        </div>

                        <div className="relative">
                          <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Enter your email..."
                            className="w-full rounded-xl px-4 py-3 border border-gray-300 shadow-sm text-gray-700 placeholder-gray-400
                                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg transition"
                            required
                          />
                        </div>

                        <div className="relative">
                          <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Create a password..."
                            className="w-full rounded-xl px-4 py-3 border border-gray-300 shadow-sm text-gray-700 placeholder-gray-400
                                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg transition"
                            required
                          />
                        </div>

                        <div className="relative">
                          <input
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            placeholder="Confirm your password..."
                            className="w-full rounded-xl px-4 py-3 border border-gray-300 shadow-sm text-gray-700 placeholder-gray-400
                                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg transition"
                            required
                          />
                        </div>

                        <motion.button
                          type="submit"
                          disabled={loading}
                          whileHover={{ scale: loading ? 1 : 1.02 }}
                          whileTap={{ scale: loading ? 1 : 0.98 }}
                          className={`relative py-3 font-semibold text-lg rounded-xl text-white shadow-lg
                                    bg-gradient-to-r ${selectedRole.color} overflow-hidden ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          <span className="relative z-10">
                            {loading ? (
                              <div className="flex items-center justify-center">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                ></motion.div>
                                <span>Processing...</span>
                              </div>
                            ) : (
                              `Register as ${selectedRole.title}`
                            )}
                          </span>
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20"
                            animate={loading ? { x: ["-100%", "100%"] } : {}}
                            transition={loading ? { duration: 1.5, repeat: Infinity, ease: "linear" } : {}}
                          ></motion.span>
                        </motion.button>
                      </form>

                      <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                          Already have an account?{" "}
                          <button
                            className="text-blue-600 font-medium hover:underline"
                            onClick={() => setIsLogin(true)}
                          >
                            Login here
                          </button>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Section - Media (Video/GIF) */}
        <motion.div
          className="hidden lg:flex w-full lg:w-1/2 h-64 lg:h-full relative overflow-hidden"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {/* Dynamic video background (place a file at client/public/med-hero.mp4). Poster shows while loading. */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/med-hero.mp4"
            poster={LoginPagePic}
            autoPlay
            muted
            loop
            playsInline
          />

          {/* Gradient overlays for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none"></div>

          {/* Floating medical icons */}
          <motion.div className="absolute inset-0" initial={false}>
            {[
              { icon: '🩺', x: '15%', delay: 0 },
              { icon: '💊', x: '70%', delay: 0.2 },
              { icon: '🧬', x: '40%', delay: 0.4 },
              { icon: '🌿', x: '85%', delay: 0.6 },
              { icon: '🧪', x: '25%', delay: 0.8 },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="absolute text-2xl lg:text-3xl select-none"
                style={{ left: item.x, bottom: '-10%' }}
                animate={{ y: ['0%', '110%'] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
              >
                <span className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">{item.icon}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Caption */}
          <div className="absolute inset-0 flex items-end justify-start p-6 lg:p-10">
            <div className="text-white/90">
              <h2 className="text-2xl lg:text-3xl font-bold">AyurSutra</h2>
              <p className="text-sm lg:text-base opacity-90">Digitalizing Ayurvedic Healthcare</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LoginPage
