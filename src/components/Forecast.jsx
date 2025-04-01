import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

const Forecast = ({ forecasts }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        TODAY'S FORECAST
      </Typography>
      <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>
        {forecasts.length} available forecasts
      </Typography>
      
      <List>
        {forecasts.map((forecast, index) => (
          <Box key={index}>
            <ListItem>
              <ListItemText 
                primary={forecast.time} 
                secondary={`${forecast.temp} °C`} 
                primaryTypographyProps={{ fontWeight: 'medium' }}
                secondaryTypographyProps={{ color: 'primary.main', fontSize: '1.1rem' }}
              />
            </ListItem>
            {index < forecasts.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Paper>
  );
};

export default Forecast;