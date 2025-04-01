import React, { useState } from 'react';
import { 
  Box, Button, TextField, Typography, Paper, 
  Grid, IconButton, Divider, FormControl, 
  InputLabel, Select, MenuItem, Stack
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Validation schema
const validationSchema = Yup.object().shape({
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  date: Yup.date().required('Date is required'),
  temperature: Yup.number().required('Temperature is required'),
  condition: Yup.string().required('Condition is required'),
  wind: Yup.number().required('Wind speed is required'),
  clouds: Yup.number().required('Cloud coverage is required'),
  humidity: Yup.number().required('Humidity is required'),
  forecasts: Yup.array().of(
    Yup.object().shape({
      time: Yup.string().required('Time is required'),
      temp: Yup.number().required('Temperature is required')
    })
  ),
  weeklyForecast: Yup.array().of(
    Yup.object().shape({
      day: Yup.string().required('Day is required'),
      temp: Yup.number().required('Temperature is required'),
      wind: Yup.number().required('Wind speed is required'),
      condition: Yup.string().required('Condition is required'),
      humidity: Yup.number().required('Humidity is required')
    })
  )
});

const WeatherForm = ({ onSubmit, initialValues, isEdit, onCancel, showNotification }) => {
  const [forecastDays, setForecastDays] = useState(
    initialValues?.weeklyForecast?.length || 0
  );

  const formik = useFormik({
    initialValues: initialValues || {
      city: '',
      country: '',
      date: new Date().toISOString().split('T')[0],
      temperature: '',
      condition: '',
      wind: '',
      clouds: '',
      humidity: '',
      forecasts: [
        { time: '09:00', temp: '' },
        { time: '12:00', temp: '' },
        { time: '15:00', temp: '' }
      ],
      weeklyForecast: []
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  const availableDays = daysOfWeek.filter(day => 
    !formik.values.weeklyForecast.some(d => d.day === day)
  );

  const addDay = () => {
    if (availableDays.length > 0) {
      const newForecast = [...formik.values.weeklyForecast];
      newForecast.push({
        day: availableDays[0],
        temp: '',
        wind: '',
        condition: '',
        humidity: ''
      });
      formik.setFieldValue('weeklyForecast', newForecast);
      setForecastDays(forecastDays + 1);
      showNotification(`Added ${availableDays[0]} to weekly forecast`);
    }
  };

  const removeDay = (index) => {
    const dayName = formik.values.weeklyForecast[index].day;
    const newForecast = [...formik.values.weeklyForecast];
    newForecast.splice(index, 1);
    formik.setFieldValue('weeklyForecast', newForecast);
    setForecastDays(forecastDays - 1);
    showNotification(`Removed ${dayName} from weekly forecast`);
  };

  const handleDayChange = (index, newDay) => {
    const newForecast = [...formik.values.weeklyForecast];
    newForecast[index].day = newDay;
    formik.setFieldValue('weeklyForecast', newForecast);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Edit Weather Data' : 'Add New Weather Data'}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {/* Basic Weather Information */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Temperature (°C)"
              name="temperature"
              type="number"
              value={formik.values.temperature}
              onChange={formik.handleChange}
              error={formik.touched.temperature && Boolean(formik.errors.temperature)}
              helperText={formik.touched.temperature && formik.errors.temperature}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Condition"
              name="condition"
              value={formik.values.condition}
              onChange={formik.handleChange}
              error={formik.touched.condition && Boolean(formik.errors.condition)}
              helperText={formik.touched.condition && formik.errors.condition}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Wind Speed (km/h)"
              name="wind"
              type="number"
              value={formik.values.wind}
              onChange={formik.handleChange}
              error={formik.touched.wind && Boolean(formik.errors.wind)}
              helperText={formik.touched.wind && formik.errors.wind}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cloud Coverage (%)"
              name="clouds"
              type="number"
              value={formik.values.clouds}
              onChange={formik.handleChange}
              error={formik.touched.clouds && Boolean(formik.errors.clouds)}
              helperText={formik.touched.clouds && formik.errors.clouds}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Humidity (%)"
              name="humidity"
              type="number"
              value={formik.values.humidity}
              onChange={formik.handleChange}
              error={formik.touched.humidity && Boolean(formik.errors.humidity)}
              helperText={formik.touched.humidity && formik.errors.humidity}
            />
          </Grid>

          {/* Hourly Forecast */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Hourly Forecast</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {formik.values.forecasts.map((forecast, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Time"
                      name={`forecasts[${index}].time`}
                      value={forecast.time}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Temperature (°C)"
                      name={`forecasts[${index}].temp`}
                      type="number"
                      value={forecast.temp}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>

          {/* Weekly Forecast Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Weekly Forecast</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={addDay}
                disabled={availableDays.length === 0}
                variant="outlined"
                size="small"
              >
                Add Day
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            {formik.values.weeklyForecast.map((day, index) => (
              <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <FormControl fullWidth size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Day</InputLabel>
                    <Select
                      value={day.day}
                      onChange={(e) => handleDayChange(index, e.target.value)}
                      label="Day"
                    >
                      {daysOfWeek.map(dayOption => (
                        <MenuItem 
                          key={dayOption} 
                          value={dayOption}
                          disabled={formik.values.weeklyForecast.some(d => d.day === dayOption && d.day !== day.day)}
                        >
                          {dayOption}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <IconButton onClick={() => removeDay(index)} size="small" color="error">
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Temperature (°C)"
                      name={`weeklyForecast[${index}].temp`}
                      type="number"
                      value={day.temp}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Wind Speed (km/h)"
                      name={`weeklyForecast[${index}].wind`}
                      type="number"
                      value={day.wind}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Condition"
                      name={`weeklyForecast[${index}].condition`}
                      value={day.condition}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Humidity (%)"
                      name={`weeklyForecast[${index}].humidity`}
                      type="number"
                      value={day.humidity}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {isEdit ? 'Update' : 'Save'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default WeatherForm;