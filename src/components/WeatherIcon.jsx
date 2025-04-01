// src/components/WeatherIcon.jsx
import React from 'react';
import { Box } from '@mui/material';
import { getWeatherIcon } from '../utils/WeatherUtils';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiStrongWind } from 'react-icons/wi';

const WeatherIcon = ({ weatherData, size = 64 }) => {
  const iconName = getWeatherIcon(weatherData);
  
  const icons = {
    'wi-day-sunny': <WiDaySunny size={size} />,
    'wi-rain': <WiRain size={size} />,
    'wi-cloudy': <WiCloudy size={size} />,
    'wi-snow': <WiSnow size={size} />,
    'wi-thunderstorm': <WiThunderstorm size={size} />,
    'wi-strong-wind': <WiStrongWind size={size} />,
  };
  
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
      {icons[iconName] || icons['wi-day-sunny']}
    </Box>
  );
};

export default WeatherIcon;