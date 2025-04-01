// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Home from './pages/Home';
import WeatherDetail from './pages/WeatherDetails';
import CityManagement from './components/CityManagement';
import WeatherCharts from './pages/WeatherCharts';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:id" element={<WeatherDetail />} />
        <Route path="/manage-cities" element={<CityManagement />} />
        <Route path="/weather-charts" element={<WeatherCharts />} />
      </Routes>
    </Box>
  );
}

export default App;