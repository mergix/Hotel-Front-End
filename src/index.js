import { ThemeProvider,createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ContextProvider } from './useStateContext';
import { text } from '@fortawesome/fontawesome-svg-core';

const darkTheme = createTheme({
  palette: {
    primary:{
      main: '#25383C',
    },
    secondary:{
      main:'#F5F5F5'
    },
    background:{
      default:'#36454F'
    },
    text:{
      primary:'#25383C',
      secondary:'#fff'
    },
    
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


