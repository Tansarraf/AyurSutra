import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Particles } from "./Particles";


const HeroSection = () => {

    const subheading = "Discover a seamless harmony of timeless healing and modern innovation. Connect with trusted practitioners and take charge of your wellness journey — all in one digital space.";
    const words = subheading.split(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFEED3] via-[#FFD9B5] to-[#FFCAA2]">
      {/* Decorative blobs (aria-hidden) */}
      <div aria-hidden className="pointer-events-none">
        <motion.div
          className="absolute top-20 left-8 w-72 h-72 bg-[#FFCAA2]/30 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-8 w-96 h-96 bg-[#FFD9B5]/30 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#FFEED3]/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        />
      </div>

      {/* Subtle dotted texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.12'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}     // number of particles
        staticity={60}     // particle attraction to cursor
        ease={85}          // smoothness of movement
        size={1}           // particle size
        color="#FF8C00"    // particle color
        vx={0.05}          // x-axis drift
        vy={0.05}          // y-axis drift
      />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight"
          >
            Your Bridge To
            <span className="block bg-gradient-to-r from-[#FFB77A] via-[#FF9F55] to-[#FFBD52] bg-clip-text text-transparent">
              PanchaKarma Wellness
            </span>
          </motion.h1>

          {/* <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            Discover a seamless harmony of timeless healing and modern
            innovation. Connect with trusted practitioners and take charge of
            your wellness journey — all in one elegant digital space.
          </motion.p> */}

        <div className="mt-4 text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {words.map((word, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.6 }}
              className="inline-block mr-1"
            >
              {word}
            </motion.span>
          ))}
        </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Link to="/login" aria-label="Get started">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-[#FFB77A] to-[#FF9F55] text-gray-900 px-8 py-3 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-[#ffd1a8]/40 transition-all duration-200"
              >
                Get Started Today
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="border-2 border-gray-300 text-gray-900 px-8 py-3 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all duration-200"
              aria-label="Watch demo"
            >
              Login
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
