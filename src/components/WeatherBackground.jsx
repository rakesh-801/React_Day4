import React from 'react';
import { Box, Typography } from '@mui/material';  // Correct import
import { getWeatherBackground } from '../utils/WeatherUtils';
import WeatherAnimation from './WeatherAnimation';

const WeatherBackground = ({ weatherData, children }) => {
  const backgroundImage = getWeatherBackground(weatherData);
  
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url(/images/weather/${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        transition: 'background-image 0.5s ease-in-out',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 0,
        },
      }}
    >
      {weatherData && (
        <WeatherAnimation 
          cloudPercentage={weatherData.clouds} 
          windSpeed={weatherData.wind} 
        />
      )}
      
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default WeatherBackground;