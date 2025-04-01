import React from 'react';
import { Card, Typography, Box, useTheme, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiStrongWind, WiHumidity } from 'react-icons/wi';
import { FaWind, FaCloud } from 'react-icons/fa';

const CurrentWeather = ({ data }) => {
  const theme = useTheme();
  
  const getWeatherIcon = () => {
    if (!data) return null;
    
    const condition = data.condition.toLowerCase();
    const size = 64;
    
    const icons = {
      rain: (
        <motion.div
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <WiRain size={size} color={theme.palette.primary.main} />
        </motion.div>
      ),
      cloud: (
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <WiCloudy size={size} color="#5f6368" />
        </motion.div>
      ),
      snow: (
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <WiSnow size={size} color="#34A853" />
        </motion.div>
      ),
      thunder: (
        <motion.div
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <WiThunderstorm size={size} color="#673AB7" />
        </motion.div>
      ),
      wind: (
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          <WiStrongWind size={size} color="#607D8B" />
        </motion.div>
      ),
      default: (
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <WiDaySunny size={size} color="#FBBC04" />
        </motion.div>
      )
    };

    if (condition.includes('rain')) return icons.rain;
    if (condition.includes('cloud')) return icons.cloud;
    if (condition.includes('snow')) return icons.snow;
    if (condition.includes('thunder')) return icons.thunder;
    if (condition.includes('wind')) return icons.wind;
    
    return icons.default;
  };

  if (!data) return null;

  return (
    <Card sx={{
      p: 3,
      mb: 3,
      background: 'rgba(255, 255, 255, 0.85)',
      borderRadius: '16px',
      boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
      backdropFilter: 'blur(10px)',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5" sx={{ color: '#202124', fontWeight: 500 }}>
            {data.city}, {data.country}
          </Typography>
          <Typography variant="body1" sx={{ color: '#5f6368' }}>
            {new Date(data.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </Typography>
          <Typography variant="h2" sx={{ 
            mt: 1, 
            color: '#202124',
            fontWeight: 300,
            fontSize: '3.5rem'
          }}>
            {Math.round(data.temperature)}°C
          </Typography>
          <Typography variant="h6" sx={{ 
            color: '#5f6368',
            textTransform: 'capitalize'
          }}>
            {data.condition}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {getWeatherIcon()}
        </Box>
      </Box>

      <Stack direction="row" spacing={3} sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FaWind style={{ marginRight: 8, color: '#607D8B' }} />
          <Typography variant="body1">
            {Math.round(data.wind)} km/h
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <WiHumidity size={24} style={{ marginRight: 8, color: '#2196F3' }} />
          <Typography variant="body1">
            {Math.round(data.humidity)}%
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FaCloud style={{ marginRight: 8, color: '#9E9E9E' }} />
          <Typography variant="body1">
            {Math.round(data.clouds)}%
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default CurrentWeather;