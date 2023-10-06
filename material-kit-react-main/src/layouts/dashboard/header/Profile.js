// import DashboardLayout from "../DashboardLayout"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';



export const Profile = () => {


// useEffect(()=>{

// axios.get("https://dev.techstreet.in/vmsglen/public/api/profile",{
// headers:{
//     Authorization:`Bearer ${'147|770QaHeB3OMMoRMScdjc88lk8WLtJiAhxunPbWjT'}`
// }
// })

// .then((res)=>{
//     console.log(res.data.data)
// })

// },[])

  return (
    <div>
<Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
           sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >hh  
   </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >     </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >.      </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>

  </div>
  )
}
