import React from "react";
import { motion } from "framer-motion";
import { WaterDrop } from "@mui/icons-material";

const HumidityAnimation = ({ humidity = 50 }) => {
  
  const dropCount = Math.floor((humidity / 100) * 30); // Increased from 20 to 30
  
  
  const dropSpeed = 3 + (humidity / 100) * 4; // Increased from 1-3 to 3-7

  const dropVariants = {
    animate: (i) => ({
      y: [0, window.innerHeight],
      x: [0, Math.random() * 40 - 20], // Increased horizontal movement range
      opacity: [0.8, 0],
      transition: {
        duration: dropSpeed + Math.random(), // Slower duration
        repeat: Infinity,
        ease: "linear",
        delay: i * 0.5, // Increased delay between drops
      }
    })
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "30%", // Increased from 20% to 30%
      height: "100vh",
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: 998,
    }}>
      {[...Array(dropCount)].map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={dropVariants}
          animate="animate"
          style={{
            position: "absolute",
            top: -30,
            left: `${Math.random() * 30}%`, // Matches the wider container
          }}
        >
          <WaterDrop 
            sx={{ 
              color: "rgba(100, 150, 255, 0.7)",
              fontSize: "1.5rem", // Larger drop size
              filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))"
            }} 
          />
        </motion.div>
      ))}
      
      {/* Additional smaller droplets */}
      {[...Array(Math.floor(dropCount / 2))].map((_, i) => (
        <motion.div
          key={`small-${i}`}
          custom={i}
          variants={dropVariants}
          animate="animate"
          style={{
            position: "absolute",
            top: -20,
            left: `${Math.random() * 30}%`,
          }}
        >
          <WaterDrop 
            sx={{ 
              color: "rgba(150, 200, 255, 0.5)",
              fontSize: "1rem",
              filter: "drop-shadow(0 0 1px rgba(255, 255, 255, 0.3))"
            }} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default HumidityAnimation;
