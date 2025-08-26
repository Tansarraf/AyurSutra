import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div className="min-h-screen">
            <Navbar initialTheme="dark" />
            <HeroSection />
            <ServicesSection />
            <Footer />
        </div>
    );
};

export default HomePage;
