// src/styles/theme.js
import { extendTheme } from '@chakra-ui/react';
import { createTheme } from '@mui/material/styles';

// Chakra UI Theme
export const chakraTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: '#f5f5f5',
        margin: 0,
        padding: 0,
        fontFamily: '"Roboto", sans-serif'
      },
    },
  },
});

// Material UI Theme
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default { chakraTheme, muiTheme };