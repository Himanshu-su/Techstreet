import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ChakraProvider } from '@chakra-ui/react';
// import "bootstrap/dist/js/bootstrap.bundle.min"
// import "bootstrap/dist/css/bootstrap.min.css"
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
import { TokenLogic } from './pages/TokenLogic';
 // Import the CSS

// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { AuthProvider } from './pages/AuthProvider';
import { Footer } from './pages/Footer';
import { CompanyProvider } from './pages/selecompany/companyselection';
import CompanyDropdown from './pages/Selectcompany';




// ----------------------------------------------------------------------

export default function App() {

  const defaultCompanyData = 
   
  {
    "app_name": "GLEN",
    "company_fullname": "GLEN",
    "company_shortname": "GLEN",
    "homepage": "https://b1.techstreet.in",
    "api_url": "https://b1.techstreet.in/api",
    "is_locked": null,
    "default": "1",
    "logo": "https://b1.techstreet.in/assets/media/logos/glen.png",
    "last_synced_at": "2023-12-06 17:55:16",
    "last_active_at": null,
    "enabled": "1",
    "created_at": "2023-12-06 17:55:16",
    "updated_at": "2023-12-06 18:04:40",
    "service_token": "31|wJ5g6z9FCL6uC8Ib7JBLSHOx0mNUOrPW2KSHGjP1"
  }

 
  useEffect(() => {
    const storedCompanyData = JSON.parse(localStorage.getItem('defaultCompanyData'));

    if (!storedCompanyData) {
      localStorage.setItem('defaultCompanyData', JSON.stringify(defaultCompanyData));
    }
  }, []);

  return (
    <ChakraProvider>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
        
          <AuthProvider>
       <CompanyProvider>
          <ScrollToTop />
          <StyledChart />
         {/* <TokenLogic> */}
         <CompanyDropdown />
          <Router />
          {/* <ToastContainer position="top-left" autoClose={2000} /> */}
          {/* </TokenLogic> */}
          </CompanyProvider>
          </AuthProvider>
        
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider></ChakraProvider>
  );
}

