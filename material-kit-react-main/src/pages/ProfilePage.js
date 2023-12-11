// import { Helmet } from 'react-helmet-async';

// // @mui
// import { styled } from '@mui/material/styles';
// import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';

// // hooks
// import useResponsive from '../hooks/useResponsive';
// // components
// import Logo from '../components/logo';
// import Iconify from '../components/iconify';
// // sections
// // import { LoginForm } from '../sections/auth/login';



// // ----------------------------------------------------------------------

// const StyledRoot = styled('div')(({ theme }) => ({
//   [theme.breakpoints.up('md')]: {
//     display: 'flex',
//   },
// }));

// const StyledSection = styled('div')(({ theme }) => ({
//   width: '100%',
//   maxWidth: 480,
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   boxShadow: theme.customShadows.card,
//   backgroundColor: theme.palette.background.default,
// }));

// const StyledContent = styled('div')(({ theme }) => ({
//   maxWidth: 480,
//   margin: 'auto',
//   minHeight: '100vh',
//   display: 'flex',
//   justifyContent: 'center',
//   flexDirection: 'column',
//   padding: theme.spacing(12, 0),
// }));

// // ----------------------------------------------------------------------

// export default function ProfilePage() {
//   const mdUp = useResponsive('up', 'md');

//   return (
//     <>
//       <Helmet>
//         <title> Login | Minimal UI </title>
//       </Helmet>

//       <StyledRoot>
//         <Logo
//           sx={{
//             position: 'fixed',
//             top: { xs: 16, sm: 24, md: 40 },
//             left: { xs: 16, sm: 24, md: 40 },
//           }}
//         />

//         {mdUp && (
//           <StyledSection>
//             <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
//               Hi, Welcome Back
//             </Typography>
//             <img src="/assets/illustrations/illustration_login.png" alt="login" />
//           </StyledSection>
//         )}

//         <Container maxWidth="sm">
//           <StyledContent>
//             <Typography variant="h4" gutterBottom>
//               Sign in to Minimal
//             </Typography>

//             <Typography variant="body2" sx={{ mb: 5 }}>
//               Don’t have an account? {''}
//               <Link variant="subtitle2">Get started</Link>
//             </Typography>

//             <Stack direction="row" spacing={2}>
//               <Button fullWidth size="large" color="inherit" variant="outlined">
//                 <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
//               </Button>

//               <Button fullWidth size="large" color="inherit" variant="outlined">
//                 <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
//               </Button>

//               <Button fullWidth size="large" color="inherit" variant="outlined">
//                 <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
//               </Button>
//             </Stack>

//             <Divider sx={{ my: 3 }}>
//               <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                 OR
//               </Typography>
//             </Divider>
         
//           </StyledContent>
       
//         </Container>
//       </StyledRoot>
//     </>
//   );
// }

// import { Container, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import { Helmet } from 'react-helmet-async'
// import  { Button,Card,Container, Stack,Typography } from "@mui/material"
// import Iconify from '../components/iconify';

import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid ,Button,Divider,CardActions,Card,Avatar,CardContent, Input} from '@mui/material';
// import { ProfileDetail } from 'src/layouts/dashboard/header/ProfileDetail';
// import { Profile } from 'src/layouts/dashboard/header/Profile';
import { Helmet } from 'react-helmet-async';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useCompanyContext } from './selecompany/companyselection';







export const ProfilePage = () => {

  
    

  
    // useEffect(()=>{

    //   if(!localStorage.getItem("token")){
    //     navigate('/login')
    //   }

      

    //     axios.get("https://dev.techstreet.in/vmsglen/public/api/profile",{
    //     headers:{
    //         Authorization:`Bearer ${'147|770QaHeB3OMMoRMScdjc88lk8WLtJiAhxunPbWjT'}`
    //     }
    //     })
        
    //     .then((res)=>{
    //         console.log(res.data.data)
    //         setData(res.data.data)
    //     })
        
    //     },[])

  //   useEffect(()=>{
  //     const companyData=JSON.parse(localStorage.getItem("defaultCompanyData"))
  //     console.log(companyData)
  // const apiUrl=companyData.api_url
  
  
  // const token= companyData.service_token;
  // console.log(token);
  // console.log(apiUrl)
  //     axios.get(`${apiUrl}/profile`, {
  //       headers: {
  //           Authorization: `Bearer ${token}`
  //       }
  //   })
        
  //       .then((res)=>{
  //           console.log(res.data.data)
  //           setData(res.data.data)
  //       })
        
  //       },[])

//   useEffect(() => {
//     const selectedCompanyString = localStorage.getItem('selectcompany');

//     if (selectedCompanyString) {
//       // If a company is selected, use its api_url
//       const selectedCompany = JSON.parse(selectedCompanyString);
// console.log(selectedCompany)
//       if (selectedCompany) {
//         setApiUrl(selectedCompany.api_url);
//         const token = selectedCompany.service_token;
// console.log(apiUrl)
// console.log(token)
// console.log(data)
//         try {
//           axios.get(`${selectedCompany.api_url}/profile`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           })
//           .then((res) => {
//             setData(res.data.data);
//           })
//           .catch((error) => {
//             console.error('Error fetching profile data:', error);
//           });
//         } catch (error) {
//           console.error('Error fetching profile data:', error);
//         }
//       }
//     } else {
//       // If no company is selected, use the default company's api_url
//       const storedCompanyData = JSON.parse(localStorage.getItem('defaultCompanyData'));

//       if (storedCompanyData) {
//         setApiUrl(storedCompanyData.api_url);
//         const token = storedCompanyData.service_token;

//         try {
//           axios.get(`${storedCompanyData.api_url}/profile`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           })
//           .then((res) => {
//             setData(res.data.data);
//           })
//           .catch((error) => {
//             console.error('Error fetching profile data:', error);
//           });
//         } catch (error) {
//           console.error('Error fetching profile data:', error);
//         }
//       }
//     }
//   }, []);

const navigate=useNavigate()
    const [data,setData]=useState([])
    const { selectedCompany } = useCompanyContext();
    // const [selectedCompany, setSelectedCompany] = useState([]);
    const [apiUrl, setApiUrl] = useState(''); 

    // const WholeCompanyData = [
    //   {
    //     "app_name": "MKUVMS",
    //     "company_fullname": "MKUVMS",
    //     "company_shortname": "MKU",
    //     "homepage": "https://mkuvms.bizprocure.com",
    //     "api_url": "https://mkuvms.bizprocure.com/api",
    //     "is_locked": null,
    //     "default": "0",
    //     "logo": "https://mkuvms.bizprocure.com/assets/media/logos/mku.png",
    //     "last_synced_at": "2023-12-06 12:00:29",
    //     "last_active_at": null,
    //     "enabled": "1",
    //     "created_at": "2023-12-06 12:00:29",
    //     "updated_at": "2023-12-06 18:04:40",
    //     "service_token": "1|R6drZxR0FA8JBk7wDTjiem0k0BLzMo7DBdH48hmv"
    //   },
    //   {
    //     "app_name": "GLEN",
    //     "company_fullname": "GLEN",
    //     "company_shortname": "GLEN",
    //     "homepage": "https://b1.techstreet.in",
    //     "api_url": "https://b1.techstreet.in/api",
    //     "is_locked": null,
    //     "default": "1",
    //     "logo": "https://b1.techstreet.in/assets/media/logos/glen.png",
    //     "last_synced_at": "2023-12-06 17:55:16",
    //     "last_active_at": null,
    //     "enabled": "1",
    //     "created_at": "2023-12-06 17:55:16",
    //     "updated_at": "2023-12-06 18:04:40",
    //     "service_token": "31|wJ5g6z9FCL6uC8Ib7JBLSHOx0mNUOrPW2KSHGjP1"
    //   }
    // ];



  useEffect(() => {
 console.log(selectedCompany)
    
    const fetchData = async (url, token) => {
      try {
        const response = await axios.get(`${url}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      // console.log(url)
        setData(response.data.data);
        // console.log(data)
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
   
    // console.log(selectedCompany.api_url)
    if (selectedCompany) {
      setApiUrl(selectedCompany.api_url);
      fetchData(selectedCompany.api_url, selectedCompany.service_token);
    } else {
      // If no company is selected, use the default company's api_url
      const storedCompanyData = JSON.parse(localStorage.getItem('defaultCompanyData'));

      if (storedCompanyData) {
        setApiUrl(storedCompanyData.api_url);
        fetchData(storedCompanyData.api_url, storedCompanyData.service_token);
      }
    }
  }, [selectedCompany]);



  return (
    <div>
       {/* <CompanyDropdown
        handleChange={handleCompanyChange}
        selectCompany={selectedCompany}
      /> */}
      {/* <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
           Profile
          </Typography>
               </Stack>

               <Card>
              <h1>data</h1>
               </Card>
        </Container> */}


<Helmet>
      <title>
        Account | Devias Kit
      </title>
    </Helmet>
    <Typography variant="h4" gutterBottom className='profile'>
            Profile
          </Typography>
    
    <Card 
  className='card'
    >
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
          
        }}
      >
        <Avatar
          src='data:image/png;base64,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'
                   sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        {/* name */}
        <Typography
          gutterBottom
          variant="h5"
        >
     {data.name}
             </Typography>

             {/* role */}
        <Typography
          color="text.secondary"
          variant="body2"
        >
      Role : {data.role}
                </Typography>

                {/* company name */}
                {/* <Typography
          color="text.secondary"
          variant="body2"
        >
      Company Name : {data.info.company_name}
      </Typography> */}

      {/* comapny email */}
      {/* <Typography
          color="text.secondary"
          variant="body2"
        >
      Company Owner Email : {data.info.company_owner_email}
      </Typography> */}

      {/* gst no */}
      {/* <Typography
          color="text.secondary"
          variant="body2"
        >
      Company GST No : {data.info.gst_no}
      </Typography> */}

      {/* pan no */}
      {/* <Typography
          color="text.secondary"
          variant="body2"
        >
      Pan No : {data.info.pan_no}
      </Typography> */}

{/* vender uuid */}
{/* <Typography
          color="text.secondary"
          variant="body2"
        >
      Id : {data.info.vendor_uid}
      </Typography> */}

                {/* address */}
                {/* <Typography
          color="text.secondary"
          variant="body2"
        >
      Address : {data.info.address1} {data.info.address2}
                </Typography>  */}


                {/* email */}
        <Typography
          color="text.secondary"
          variant="body2"
        >
            Email : {data.email}
  </Typography>

  <Typography
          color="text.secondary"
          variant="body2"
        >
           Phone No : {data.mobile}
  </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
        type="file" id="imageUpload" name="image" accept="image/*"
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>

    </div>
  )
}
