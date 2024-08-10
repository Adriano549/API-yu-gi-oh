import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, GlobalStyles, ThemeProvider } from '@mui/material';


// Cria uma instância do QueryClient
const queryClient = new QueryClient();

const globalStyles = {
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    listStyle: 'none',
    textDecoration: 'none',
    color: 'inherit',
  },
  body: {
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(90deg, #e8e7eb, #2b2431) no-repeat',
    maxWidth: '1440px',
    minHeight: '100vh',
  },
  ul: {
    listStyle: 'none',
    padding: 0,
  },
  ol: {
    listStyle: 'none',
    padding: 0,
  },
  a: {
    textDecoration: 'none',
    color: 'inherit',
  },
};


const theme = createTheme({
  palette:{
    primary: {
      main: '#533567',
    },
    secondary: {
      main: '#f44336',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AppRoutes />
        <GlobalStyles styles={globalStyles} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
