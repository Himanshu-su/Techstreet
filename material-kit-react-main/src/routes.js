import { Navigate, useRoutes,useParams } from 'react-router-dom';
import { useContext } from 'react';
import {ProfilePage} from './pages/ProfilePage';


// layouts
// import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

//

import BlogPage from './pages/BlogPage';
import UserPage from './pages/Purchase';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import { Ledger } from './pages/Ledger';
import { Delivery } from './pages/Delivery';
import { Subpurchase } from './pages/Subpurchase';
import { useAuthContext } from './pages/AuthProvider';
import { Drnlist } from './pages/Drnlist';
import { Newdrn } from './pages/Newdrn';
import { Footer } from './pages/Footer';
import { CompanySelection } from './pages/Companyselection';



// ----------------------------------------------------------------------

export default function Router() {
  const {purchaseId}=useAuthContext()
  // console.log(purchaseId)
 // const id=purchaseId
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout /> ,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'ledger', element: <Ledger /> },
        { path: 'delivery', element: <Delivery /> },
        { path: 'subpurchase', element: <Subpurchase /> },
        { path: 'subpurchase/drnlist', element: <Drnlist /> },
        
        // { path: `subpurchase/:${purchaseId}`, element: <Subpurchase /> }

        
        
      ],
    },
   // <Route path="/dashboard/subpurchase/:purchaseId" component={Subpurchase} />

    {
      path: 'login',
      element: <LoginPage />,
    },
    { path: 'companyselection', element: <CompanySelection /> },
    
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
   
  ]);

  return routes;
}
