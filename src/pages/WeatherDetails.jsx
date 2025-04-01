import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Button, 
  Typography, 
  Paper,
  CircularProgress
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  ArrowBack as ArrowBackIcon 
} from '@mui/icons-material';
import CurrentWeather from '../components/CurrentWeather';
import AirConditions from '../components/AirConditions';
import Forecast from '../components/Forecast';
import WeeklyForecast from '../components/WeeklyForecast';
import WeatherForm from '../components/WeatherForm';
import { 
  getWeatherData, 
  updateWeatherData, 
  deleteWeatherData 
} from '../services/weatherService';

const WeatherDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherData();
        const foundWeather = data.find(item => item.id === parseInt(id));
        if (foundWeather) {
          setWeather(foundWeather);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching weather details:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [id, navigate]);

  const handleUpdate = async (updatedData) => {
    try {
      await updateWeatherData(weather.id, updatedData);
      const data = await getWeatherData();
      const updatedWeather = data.find(item => item.id === parseInt(id));
      setWeather(updatedWeather);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating weather:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteWeatherData(weather.id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting weather:', error);
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ 
        py: 4, 
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
      }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (!weather) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6">Weather data not found</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Go Back Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Back to Dashboard
      </Button>

      {editMode ? (
        <WeatherForm
          initialValues={weather}
          onSubmit={handleUpdate}
          onCancel={() => setEditMode(false)}
          isEdit={true}
        />
      ) : (
        <>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: 2, 
            mb: 3 
          }}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setEditMode(true)}
              sx={{
                backgroundColor: '#4285F4',
                '&:hover': { backgroundColor: '#3367D6' }
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              sx={{
                backgroundColor: '#EA4335',
                '&:hover': { backgroundColor: '#D33426' }
              }}
            >
              Delete
            </Button>
          </Box>

          <CurrentWeather data={weather} />
          <AirConditions data={weather} />
          <Forecast forecasts={weather.forecasts} />
          <WeeklyForecast weeklyForecast={weather.weeklyForecast} />

          <Paper elevation={0} sx={{ 
            mt: 4, 
            p: 3, 
            border: '1px solid #e0e0e0',
            borderRadius: '8px'
          }}>
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last updated: {new Date().toLocaleString()}
            </Typography>
          </Paper>
        </>
      )}
    </Container>
  );
};

export default WeatherDetails;