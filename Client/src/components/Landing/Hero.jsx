import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPlayCircle, FaChevronDown } from 'react-icons/fa';

const Hero = () => {
  // --- Animation Variants ---

  // Parent container for staggering children animations
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Variants for animating the title word by word
  const title = "Performance Management Prototype";
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Generic variant for items fading in
  const itemFadeInVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div 
      className="hero min-h-screen bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 animated-gradient relative overflow-hidden"
    >
      {/* Gently floating background shapes */}
      <motion.div
        className="bg-shape"
        style={{ width: 300, height: 300, top: '10vh', left: '10vw' }}
        animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />
      <motion.div
        className="bg-shape"
        style={{ width: 200, height: 200, top: '60vh', right: '15vw' }}
        animate={{ y: [0, -20, 0], scale: [1, 0.95, 1] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />

      <div className="hero-content text-center z-10">
        {/* The motion.div wrapper is kept for animation control, but the visual container styles are removed */}
        <motion.div
          className="max-w-4xl"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="mb-5 text-5xl md:text-7xl font-bold text-white"
            style={{ textShadow: '0 4px 15px rgba(0,0,0,0.3)' }} // Enhanced text shadow for readability
            variants={titleContainerVariants}
          >
            {title.split(" ").map((word, i) => (
              <motion.span key={i} className="inline-block mr-4" variants={wordVariants}>
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p 
            className="py-6 text-lg text-gray-200"
            variants={itemFadeInVariants}
          >
            A transparent, data-driven platform to quantify employee performance, 
            streamline project monitoring, and foster a culture of accountability 
            for both headquarters and field units.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4"
            variants={itemFadeInVariants}
          >
            <button className=" btn btn-lg bg-orange-500 hover:bg-orange-600 border-none text-white normal-case gap-2 transition-transform duration-300 hover:scale-105 ">
              <FaArrowRight /> Get Started
            </button>
            <button className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-blue-700 normal-case gap-2 transition-transform duration-300 hover:scale-105">
              <FaPlayCircle /> Watch Demo
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute lg:bottom-30 bottom-0 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-sm">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaChevronDown />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hero;