import { ThemeProvider,createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ContextProvider } from './useStateContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
     <App/>
    </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>
);


