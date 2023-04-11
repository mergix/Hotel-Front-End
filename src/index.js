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
      main: '#0052cc'
    },
    secondary:{
      main:'#edf2ff'
    },
    background:{
      default:'#562424'
    },
    text:{
      primary:'#0052cc'
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


