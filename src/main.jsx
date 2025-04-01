import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import App from './App';
import { chakraTheme, muiTheme } from './styles/theme';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({ window });

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={chakraTheme}>
        <MuiThemeProvider theme={muiTheme}>
          <App />
        </MuiThemeProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);