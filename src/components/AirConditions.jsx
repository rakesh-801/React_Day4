import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableRow } from '@mui/material';

const AirConditions = ({ data }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        AIR CONDITIONS
      </Typography>
      
      <Table>
        <TableBody>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Temperature</TableCell>
            <TableCell>{data.temperature} °C</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Wind</TableCell>
            <TableCell>{data.wind} m/s</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Clouds</TableCell>
            <TableCell>{data.clouds} %</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Humidity</TableCell>
            <TableCell>{data.humidity} %</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AirConditions;