import React from "react";
import { motion } from "framer-motion";

const CloudAnimation = ({ cloudCount = 10, windSpeed = 10 }) => {
  const cloudVariants = {
    animate: {
      x: [0, -window.innerWidth],
      opacity: [0.8, 1, 0.8],
    },
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: 999,
    }}>
      {[...Array(cloudCount)].map((_, i) => (
        <motion.svg
          key={i}
          width={120}
          height={80}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            top: `${Math.random() * 60 + 10}%`,
            left: "100%",
          }}
          variants={cloudVariants}
          animate="animate"
          transition={{
            duration: 80 / windSpeed,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        >
          <path
            d="M48 24C45.8 14.8 37.7 8 28 8C18.4 8 10.3 14.8 8 24C3.6 24 0 28 0 32C0 36 3.6 40 8 40H48C52.4 40 56 36 56 32C56 28 52.4 24 48 24Z"
            fill="rgba(255, 255, 255, 0.8)"
          />
        </motion.svg>
      ))}
    </div>
  );
};

export default CloudAnimation;
