import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button } from '@mui/material';

// @mui
// import { Link, Stack, IconButton, InputAdornment, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
// import "./Logincss.css"





// ----------------------------------------------------------------------


export default function LoginForm () {
  const navigate = useNavigate();



  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
    };

    if (!formData.email) {
      valid = false;
      newErrors.email = 'Email is required';
    }

    if (!formData.password) {
      valid = false;
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return valid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Make the API POST request here
        const response = await axios.post('https://dev.techstreet.in/vmsglen/public/api/login', {
          email: formData.email,
          password: formData.password,
        });

        // Handle the API response as needed
        console.log('API Response:', response.data);
        localStorage.setItem("token", JSON.stringify(response.data.access_token));
        navigate('/')
// toast.success("success login")
        // Redirect to a new page or perform other actions after successful login
      } catch (error) {
        console.error('API Error:', error);
        toast.error(error.response.data.message)

        // Handle API error, e.g., display an error message to the user
      }
    } else {
      // Form validation failed, do nothing or show error messages
    }
  };



  // const validateForm = () => {
  //   let valid = true;
  //   const newErrors = {
  //     email: '',
  //     password: '',
  //   };
  //   if (!formData.email) {
  //     valid = false;
  //     newErrors.email = 'Email is required';
  //   } else if (!isValidEmail(formData.email)) {
  //     valid = false;
  //     newErrors.email = 'Invalid email address';
  //   }
  //   if (!formData.password) {
  //     valid = false;
  //     newErrors.password = 'Password is required';
  //   }
  //   setErrors(newErrors);
  //   return valid;
  // };
  // const isValidEmail = (email) => {
  // Use a regular expression or a library like 'validator' to validate the email format
  //   const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  //   return emailPattern.test(email);
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     // Perform the login logic here
  //     console.log('Login successful')
  //     axios
  //     .post('https://dev.techstreet.in/vmsglen/public/api/login', {
  //       email,
  //       password,
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       alert('Login Success');
  //       localStorage.setItem('token', result.data.access_token);
  //       // const notify = () => toast.dark("Wow so easy!");
  //       // notify()
  //       toast.success('nice');
  //       navigate('/');
  //       // localStorage.getItem("token")
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // alert("Oppos ! Login Failed")
  //       toast.error(err.message);
  //     })
  //   } else {
  //     console.log('Form has errors');
  //   }
  // };
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };
  // const { login } = useContext(Authcontext);
  // const [auth, setauth] = useState(false);
  // const HandleLogin = () => {
  //   const userdata = {
  //     email,
  //     password,
  //   };
  //   fetch("https://dev.techstreet.in/vmsglen/public/api/login", {
  //     method: "POST",
  //     body: JSON.stringify(userdata),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       console.log("hlo", json.access_token);
  //       localStorage.setItem("token", JSON.stringify(json.access_token));
  //       login(json.access_token);
  //     });
  // };
  // const login = (token) => {
  //   setToken(token);
  //   setIsAuth(true);
  //   console.log("token", token);
  // };
  // localStorage.getItem("token");
  // new data
  // const handleClick = async (e) => {
  //   e.preventDefault();
  // navigate('/dashboard', { replace: true });
  // const item={email,password}
  // const result=await fetch('https://dev.techstreet.in/vmsglen/public/api/login',{
  //   method:'POST',
  //   headers:{
  //     "Content-Type":"application/json",
  //     "Accept":"application/json"
  //   },
  //   body:await result.json()
  // })
  // const res =await result.json()
  // console.log(res)
  // localStorage.setItem('user-info',JSON.stringify(result))
  // navigate("/login")
  // console.log(email,password)
  //   axios
  //     .post('https://dev.techstreet.in/vmsglen/public/api/login', {
  //       email,
  //       password,
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       alert('Login Success');
  //       localStorage.setItem('token', result.data.access_token);
  //       // const notify = () => toast.dark("Wow so easy!");
  //       // notify()
  //       toast.success('nice');
  //       navigate('/');
  //       // localStorage.getItem("token")
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // alert("Oppos ! Login Failed")
  //       toast.error(err.message);
  //     });
  // };
  return (
    <div>
      {/* <Stack spacing={3}>
              <TextField name="email" label="Email address" value={email}  onChange={(e) => {
                        setEmail(e.target.value);
                      }}/>
      
              <TextField
                name="password"
                label="Password"
                value={password}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Stack>
      
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
              <Checkbox name="remember" label="Remember me" />
              <Link variant="subtitle2" underline="hover">
                Forgot password?
              </Link>
            </Stack>
           
            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
              Login
            </LoadingButton>
            <ToastContainer/> */}

      {/* form */}
      <div>
        {/* <h2>Login</h2> */}

        <form onSubmit={handleSubmit}>
          <div>
            {/* <label htmlFor="html">HTML</label><br></br> */}
            <div><p>Email:</p></div>
            <input
              type="text"
              id="email" 
              // Add an 'id' attribute here
              name="email"
              value={formData.email}
              onChange={handleChange}
              className='input'
              placeholder='Enter Email'
              style={{
                width: '400px',
                height: '50px',
                border: '1px solid gray',
                borderRadius: "5px",
                marginTop: '5px',
                 paddingLeft:"15px"
              }}
             
              />
            <div className="error" style={{color:'red'}}>{errors.email}</div>
          </div><br />
          <div>
            <div><p>Password:</p></div>
            <input
              type="password"
              id="password" // Add an 'id' attribute here
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter Password'
              style={{
                width: '400px',
                height: '50px',
                border: '1px solid gray',
                borderRadius: "5px",
                marginTop: '5px',
                paddingLeft:'15px'
              }} 
              className='input'
              />
            <div className="error" style={{color:'red'}}>{errors.password}</div>
          </div><br />
          <div>
            <button type="submit"
              style={{
                width: '400px',
                height: '50px',
                border: '2px solid blue',
                borderRadius: "5px",
                marginTop: '5px',
                color: 'white',
                backgroundColor: 'blue'
                ,fontSize:'18px'
               
                
              }}
              className='btn'
            >Login</button>
            <ToastContainer/>
          </div>
        </form>
      </div>
    </div>
  );
}
//  export default LoginForm;