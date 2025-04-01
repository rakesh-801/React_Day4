import React, { useState, useEffect } from 'react';
import {
  Container, Box, Typography, Button,
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WeatherForm from '../components/WeatherForm';
import {
  getWeatherData,
  addWeatherData,
  updateWeatherData,
  deleteWeatherData
} from '../services/weatherService';

const WeatherManagementPage = () => {
  const [weatherList, setWeatherList] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const data = await getWeatherData();
      setWeatherList(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editMode && selectedWeather) {
        await updateWeatherData(selectedWeather.id, values);
      } else {
        await addWeatherData(values);
      }
      await fetchWeatherData();
      setEditMode(false);
      setSelectedWeather(null);
    } catch (error) {
      console.error('Error saving weather data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWeatherData(id);
      await fetchWeatherData();
      if (selectedWeather?.id === id) {
        setSelectedWeather(null);
      }
    } catch (error) {
      console.error('Error deleting weather data:', error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Weather Management
      </Typography>

      {editMode || !selectedWeather ? (
        <WeatherForm
          onSubmit={handleSubmit}
          initialValues={selectedWeather}
          isEdit={editMode}
          onCancel={() => {
            setEditMode(false);
            setSelectedWeather(null);
          }}
        />
      ) : (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Selected: {selectedWeather.city}, {selectedWeather.country}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              variant="contained"
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(selectedWeather.id)}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(`/weather/${selectedWeather.id}`)}
            >
              View Details
            </Button>
          </Box>
        </Box>
      )}

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          All Weather Records
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>City</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Temp (°C)</TableCell>
                <TableCell>Condition</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {weatherList.map((weather) => (
                <TableRow
                  key={weather.id}
                  hover
                  selected={selectedWeather?.id === weather.id}
                  onClick={() => setSelectedWeather(weather)}
                >
                  <TableCell>{weather.city}</TableCell>
                  <TableCell>{weather.country}</TableCell>
                  <TableCell>{weather.date}</TableCell>
                  <TableCell>{weather.temperature}</TableCell>
                  <TableCell>{weather.condition}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(weather.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default WeatherManagementPage;