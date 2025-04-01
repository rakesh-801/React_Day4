import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const WeeklyForecast = ({ weeklyForecast }) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        WEEKLY FORECAST
      </Typography>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Day</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Temp (°C)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Wind (m/s)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Condition</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Humidity (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weeklyForecast.map((day, index) => (
              <TableRow key={index}>
                <TableCell>{day.day}</TableCell>
                <TableCell>{day.temp}</TableCell>
                <TableCell>{day.wind}</TableCell>
                <TableCell>{day.condition}</TableCell>
                <TableCell>{day.humidity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default WeeklyForecast;