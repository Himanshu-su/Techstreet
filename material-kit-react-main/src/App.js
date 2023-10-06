import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ChakraProvider } from '@chakra-ui/react';
// import "bootstrap/dist/js/bootstrap.bundle.min"
// import "bootstrap/dist/css/bootstrap.min.css"
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { ButtonProvider } from './pages/ButttonProvide';


// ----------------------------------------------------------------------

export default function App() {
  return (
    <ChakraProvider>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ButtonProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
          </ButtonProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider></ChakraProvider>
  );
}

// email:   developer@glenindia.com
// password :  password