// src/utils/WeatherUtils.js

export const getWeatherBackground = (weatherData) => {
    if (!weatherData) return 'default-bg.jpg';
    
    const { temperature, wind, condition } = weatherData;
    
    // Temperature-based backgrounds
    if (temperature <= 0) {
      return 'snow-bg.jpg';
    } else if (temperature > 0 && temperature <= 10) {
      return 'cold-bg.jpg';
    } else if (temperature > 10 && temperature <= 25) {
      if (wind > 20) {
        return 'windy-bg.jpg';
      }
      return 'pleasant-bg.jpg';
    } else if (temperature > 25 && temperature <= 35) {
      if (condition.toLowerCase().includes('sunny')) {
        return 'sunny-bg.jpg';
      }
      return 'warm-bg.jpg';
    } else if (temperature > 35) {
      return 'hot-bg.jpg';
    }
    
    return 'default-bg.jpg';
  };
  
  export const getWeatherIcon = (weatherData) => {
    if (!weatherData) return 'wi-day-sunny';
    
    const { condition } = weatherData;
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('rain')) return 'wi-rain';
    if (conditionLower.includes('cloud')) return 'wi-cloudy';
    if (conditionLower.includes('sun')) return 'wi-day-sunny';
    if (conditionLower.includes('snow')) return 'wi-snow';
    if (conditionLower.includes('thunder')) return 'wi-thunderstorm';
    if (conditionLower.includes('wind')) return 'wi-strong-wind';
    
    return 'wi-day-sunny';
  };