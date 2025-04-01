import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { WiCloudy, WiDayCloudy, WiDaySunny, WiStrongWind } from 'react-icons/wi';

const WeatherVisualization = ({ windSpeed, cloudPercentage }) => {
  // Calculate animation parameters based on weather data
  const windIntensity = Math.min(windSpeed / 20, 2); // Normalize wind speed
  const cloudDensity = Math.min(cloudPercentage / 20, 5); // Normalize cloud percentage

  return (
    <Box sx={{ 
      position: 'relative',
      height: '150px',
      width: '100%',
      overflow: 'hidden',
      mb: 4,
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }}>
      {/* Wind animation */}
      <Box sx={{
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <motion.div
          animate={{
            x: [0, 100, 0],
            rotate: [0, windIntensity * 5, 0]
          }}
          transition={{
            duration: 2 / windIntensity,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <WiStrongWind size={48} color="#fff" />
        </motion.div>
        <Typography variant="body1" sx={{ color: 'white', ml: 1 }}>
          Wind: {windSpeed} km/h
        </Typography>
      </Box>

      {/* Cloud animations */}
      {[...Array(Math.floor(cloudDensity))].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: `${20 + (i * 20)}px`,
            left: `${i * 30}%`,
            fontSize: '48px'
          }}
          animate={{
            x: [0, 100 * windIntensity, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 10 / windIntensity,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5
          }}
        >
          {cloudPercentage > 70 ? (
            <WiCloudy color="rgba(255, 255, 255, 0.8)" />
          ) : cloudPercentage > 30 ? (
            <WiDayCloudy color="rgba(255, 255, 255, 0.8)" />
          ) : (
            <WiDaySunny color="rgba(255, 255, 255, 0.8)" />
          )}
        </motion.div>
      ))}
    </Box>
  );
};

export default WeatherVisualization;