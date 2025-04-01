// utils/weatherIcons.js
import {
    WbSunny, // Hot
    AcUnit, // Freezing
    Whatshot, // Very Hot
    Grain, // Snow
    WbCloudy, // Mild
    Thunderstorm, // Storm
    Water, // Rain
    BeachAccess // Windy
  } from '@mui/icons-material';
  
  export const getTemperatureIcon = (temp) => {
    const temperature = Number(temp);
    if (isNaN(temperature)) return <WbCloudy color="action" fontSize="large" />;
    
    if (temperature >= 35) return <Whatshot color="error" fontSize="large" />;
    if (temperature >= 25) return <WbSunny color="warning" fontSize="large" />;
    if (temperature >= 15) return <WbCloudy color="action" fontSize="large" />;
    if (temperature >= 5) return <Water color="primary" fontSize="large" />;
    if (temperature > 0) return <BeachAccess color="info" fontSize="large" />;
    return <AcUnit color="disabled" fontSize="large" />;
  };