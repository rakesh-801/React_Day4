import React, { useState, useEffect } from 'react';
import { 
  Container, Box, Button, Typography, 
  Paper, CircularProgress, Stack, Snackbar,
  Alert
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import WeatherForm from '../components/WeatherForm';
import CurrentWeather from '../components/CurrentWeather';
import AirConditions from '../components/AirConditions';
import Forecast from '../components/Forecast';
import WeeklyForecast from '../components/WeeklyForecast';
import WeatherBackground from '../components/WeatherBackground';
import HumidityAnimation from '../components/HumidityAnimation';
import { 
  getWeatherData, 
  addWeatherData, 
  updateWeatherData,
  deleteWeatherData
} from '../services/weatherService';

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeatherData();
        setWeatherData(data);
        if (data.length > 0) {
          setSelectedWeather(data[0]);
        }
      } catch (error) {
        showNotification('Failed to load weather data', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const showNotification = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleAddWeather = async (weather) => {
    try {
      setLoading(true);
      if (editMode && selectedWeather) {
        await updateWeatherData(selectedWeather.id, weather);
        showNotification('Weather updated successfully!');
      } else {
        await addWeatherData(weather);
        showNotification('Weather added successfully!');
      }
      const updatedData = await getWeatherData();
      setWeatherData(updatedData);
      if (updatedData.length > 0) {
        const newlyAdded = editMode 
          ? updatedData.find(item => item.id === selectedWeather.id)
          : updatedData[updatedData.length - 1];
        setSelectedWeather(newlyAdded);
      }
      setShowForm(false);
      setEditMode(false);
    } catch (error) {
      showNotification('Failed to save weather data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWeather = async () => {
    if (!selectedWeather) return;
    
    try {
      setDeleteLoading(true);
      if (window.confirm(`Delete weather data for ${selectedWeather.city}?`)) {
        await deleteWeatherData(selectedWeather.id);
        const updatedData = await getWeatherData();
        setWeatherData(updatedData);
        setSelectedWeather(updatedData[0] || null);
        showNotification('Weather deleted successfully!');
      }
    } catch (error) {
      showNotification('Failed to delete weather data', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleEditClick = () => {
    setEditMode(true);
    setShowForm(true);
  };

  if (loading) {
    return (
      <WeatherBackground weatherData={null}>
        <Container maxWidth="md" sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          <CircularProgress sx={{ color: 'black' }} />
        </Container>
      </WeatherBackground>
    );
  }

  return (
    <>
      <WeatherBackground weatherData={selectedWeather}>
        {/* Humidity animation only shown when weather is selected */}
        {selectedWeather && selectedWeather.humidity && (
          <HumidityAnimation humidity={selectedWeather.humidity} />
        )}
        
        <Container maxWidth="md" sx={{ py: 4, position: 'relative' }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4,
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
              Weather Dashboard
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button 
                variant="outlined"
                startIcon={<AddIcon sx={{ color: 'black' }} />} 
                onClick={() => {
                  setShowForm(true);
                  setEditMode(false);
                }}
                sx={{ 
                  color: 'black',
                  borderColor: 'rgba(0, 0, 0, 0.5)',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    borderColor: 'black'
                  }
                }}
              >
                Add Weather
              </Button>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon sx={{ color: 'black' }} />}
                component={Link}
                to="/manage-cities"
                sx={{ 
                  color: 'black',
                  borderColor: 'rgba(0, 0, 0, 0.5)',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    borderColor: 'black'
                  }
                }}
              >
                Manage Cities
              </Button>
            </Stack>
          </Box>

          {showForm && (
            <WeatherForm 
              onSubmit={handleAddWeather} 
              onCancel={() => {
                setShowForm(false);
                setEditMode(false);
              }} 
              initialValues={editMode ? selectedWeather : null}
              isEdit={editMode}
              showNotification={showNotification}
            />
          )}

          {weatherData.length > 0 && selectedWeather && !showForm ? (
            <>
              <CurrentWeather data={selectedWeather} />
              
              <AirConditions data={selectedWeather} />
              <Forecast forecasts={selectedWeather.forecasts} />
              <WeeklyForecast weeklyForecast={selectedWeather.weeklyForecast} />
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button 
                  variant="outlined"
                  component={Link} 
                  to={`/weather/${selectedWeather.id}`}
                  sx={{ 
                    color: 'black',
                    borderColor: 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      borderColor: 'black'
                    }
                  }}
                >
                  View Details
                </Button>
                <Button 
                  variant="outlined"
                  onClick={handleEditClick}
                  sx={{ 
                    color: 'black',
                    borderColor: 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      borderColor: 'black'
                    }
                  }}
                >
                  Edit
                </Button>
                <Button 
                  variant="outlined"
                  onClick={handleDeleteWeather}
                  disabled={deleteLoading}
                  startIcon={deleteLoading ? <CircularProgress size={24} sx={{ color: 'black' }} /> : <DeleteIcon sx={{ color: 'black' }} />}
                  sx={{ 
                    color: 'black',
                    borderColor: 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      borderColor: 'black'
                    },
                    '&.Mui-disabled': {
                      color: 'rgba(0, 0, 0, 0.3)',
                      borderColor: 'rgba(0, 0, 0, 0.2)'
                    }
                  }}
                >
                  Delete
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => setSelectedWeather(null)}
                  sx={{ 
                    color: 'black',
                    borderColor: 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      borderColor: 'black'
                    }
                  }}
                >
                  Clear Selection
                </Button>
                <Button 
    variant="outlined"
    component={Link}
    to="/weather-charts"
    sx={{ 
      color: 'black',
      borderColor: 'rgba(0, 0, 0, 0.5)',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderColor: 'black'
      }
    }}
  >
    View Charts
  </Button>
              </Box>
            </>
          ) : weatherData.length > 0 && !showForm ? (
            <Paper elevation={3} sx={{ 
              p: 4, 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(5px)'
            }}>
              <Typography variant="h6" sx={{ color: 'black' }}>
                Select a weather record:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                {weatherData.map((weather) => (
                  <Button
                    key={weather.id}
                    variant="outlined"
                    onClick={() => setSelectedWeather(weather)}
                    sx={{ 
                      textTransform: 'none',
                      color: 'black',
                      borderColor: 'rgba(0, 0, 0, 0.5)',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        borderColor: 'black'
                      }
                    }}
                  >
                    {weather.city}, {weather.country} - {weather.date}
                  </Button>
                ))}
              </Box>
            </Paper>
          ) : !showForm ? (
            <Paper elevation={3} sx={{ 
              p: 4, 
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(5px)'
            }}>
              <Typography variant="h6" sx={{ color: 'black' }}>
                No weather data available
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon sx={{ color: 'black' }} />}
                onClick={() => {
                  setShowForm(true);
                  setEditMode(false);
                }}
                sx={{ 
                  mt: 2,
                  color: 'black',
                  borderColor: 'rgba(0, 0, 0, 0.5)',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    borderColor: 'black'
                  }
                }}
              >
                Add First Weather Record
              </Button>
            </Paper>
          ) : null}

          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert 
              onClose={handleCloseSnackbar} 
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Container>
      </WeatherBackground>
    </>
  );
};
export default Home;