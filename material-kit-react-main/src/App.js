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
import { AuthProvider } from './pages/AuthProvider';



// ----------------------------------------------------------------------

export default function App() {
  return (
    <ChakraProvider>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
        {/* <TokenProvider> */}
          <AuthProvider>
       
          <ScrollToTop />
          <StyledChart />
          <Router />
      
          </AuthProvider>
          {/* </TokenProvider> */}
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider></ChakraProvider>
  );
}

// email:   developer@glenindia.com
// password :  password