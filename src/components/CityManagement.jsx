// src/pages/CityManagement.jsx
import React, { useState } from 'react';
import { 
  Container, Box, Typography, Button, 
  TextField, CircularProgress, Alert,
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow
} from '@mui/material';
import { Link } from 'react-router-dom';
import { deleteWeatherByCity, getWeatherData } from '../services/weatherService';

const CityManagement = () => {
  const [cityToDelete, setCityToDelete] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', severity: 'info' });
  const [weatherData, setWeatherData] = useState([]);

  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeatherData();
        setWeatherData(data);
      } catch (error) {
        setMessage({ text: error.message, severity: 'error' });
      }
    };
    fetchData();
  }, []);

  const handleDeleteCity = async () => {
    if (!cityToDelete) {
      setMessage({ text: 'Please enter a city name', severity: 'warning' });
      return;
    }

    try {
      setLoading(true);
      setMessage({ text: '', severity: 'info' });
      
      // Confirm before deletion
      if (!window.confirm(`Are you sure you want to delete all data for ${cityToDelete}?`)) {
        return;
      }

      const deletedRecords = await deleteWeatherByCity(cityToDelete);
      setMessage({ 
        text: `Deleted ${deletedRecords.length} records for ${cityToDelete}`, 
        severity: 'success' 
      });
      
      
      const updatedData = await getWeatherData();
      setWeatherData(updatedData);
      setCityToDelete('');
    } catch (error) {
      setMessage({ text: error.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  
  const uniqueCities = [...new Set(weatherData.map(item => item.city))];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        City Management
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Delete City Data
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <TextField
            label="City Name"
            value={cityToDelete}
            onChange={(e) => setCityToDelete(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteCity}
            disabled={!cityToDelete || loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Delete City
          </Button>
        </Box>

        {message.text && (
          <Alert severity={message.severity} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <Typography variant="body2" color="text.secondary">
          Note: This will permanently delete all weather records for the specified city.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Available Cities ({uniqueCities.length})
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>City</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Records</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uniqueCities.map(city => {
                const cityRecords = weatherData.filter(item => item.city === city);
                const sampleRecord = cityRecords[0];
                const recordCount = cityRecords.length;
                
                return (
                  <TableRow key={city}>
                    <TableCell>{city}</TableCell>
                    <TableCell>{sampleRecord.country}</TableCell>
                    <TableCell>
                      {recordCount} {recordCount === 1 ? 'record' : 'records'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ mt: 3 }}>
        <Button 
          variant="outlined" 
          component={Link} 
          to="/"
          sx={{ mr: 2 }}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default CityManagement;
