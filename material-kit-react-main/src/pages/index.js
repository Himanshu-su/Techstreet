import PropTypes from 'prop-types';
import { createContext, useEffect,useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { NavLink as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// @mui
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FaceIcon from '@mui/icons-material/Face';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack,ListItem,ListItemText,List,Collapse, ListItemIcon } from '@mui/material';
// import { StyledNavItem, StyledNavItemIcon } from 'src/components/nav-section/styles';
import SvgColor from '../components/svg-color';



// import { StyledNavItem, StyledNavItemIcon } from 'src/components/nav-section/styles';
// mock
import account from '../_mock/account';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Scrollbar from '../components/scrollbar';
import NavSection from '../components/nav-section';
//
import navConfig from '../layouts/dashboard/nav/config';
import { useButtonContext } from './ButttonProvide';
// import { ListIcon } from '@chakra-ui/react';
// import { StyledNavItemIcon } from 'src/components/nav-section/styles';


// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

 const Btn=createContext()


 function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
const isDesktop = useResponsive('up', 'lg');
const [open, setOpen] = useState(false);
// const navigate=useNavigate()
const { status, setStatus } = useButtonContext();



const handleToggle = () => {
  setOpen(!open);
};

const navConfig =

 [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
icon:<DashboardIcon />
  },
  {
    title: 'Ledger',
    path: '/dashboard/ledger',
icon:<FileCopyIcon />
  },
  {
    title: 'Purchase Order',
    // path: '/dashboard/user',
    icon:< ShoppingBasketIcon/>,
    dropdown:<KeyboardDoubleArrowDownIcon/>,
   subtitle:[{
    title: 'Accepte',
    path: '/dashboard/user',
    icon:< ShoppingBasketIcon/>,
   },
   {
    title: 'In Progress',
    path: '/dashboard/user',
    icon:< ShoppingCartIcon/>,
   },
   {
    title: 'Delivered',
    path: '/dashboard/user',
    icon:< ShoppingBasketIcon/>,
   },
   {
    title: 'Rejected',
    path: '/dashboard/user',
    icon:< ShoppingBasketIcon/>,
   },
   {
    title: 'Closed',
    path: '/dashboard/user',
    icon:< ShoppingBasketIcon/>,
   },
  ]
  },
  {
    title: 'Products',
    path: '/dashboard/products',
    icon:< ShoppingCartIcon/>,
  },
  {
    title: 'Delivery',
    path: '/404',
    icon:< ShopTwoIcon/>,
  },
  {
    title: 'RFQs',
    path: '/404',
    icon:< AdminPanelSettingsIcon/>,
  },
  {
    title: 'DRN Concern',
    path: '/404',
    icon:< AssignmentLateIcon/>,
  },
  {
    title: 'Notification',
    path: '/404',
    icon:<NotificationsActiveIcon/>
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    icon:<FaceIcon/>
  }
]
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {account.displayName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      {/* <NavSection data={navConfig} /> */}
      {/* <StyledNavItem
      component={RouterLink}
      to={navConfig.path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    > */}
      {/* <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon> */}
      <List>
      {navConfig.map((item) =>
        item.subtitle ? (
          <div key={item.title} 
          // style={{marginLeft:'55px'}}
          >
            <ListItem button onClick={handleToggle}
              component={RouterLink}
              to={item.path}
              activeClassName="active" 
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText disableTypography primary={item.title} 
              // component={RouterLink}
              // to={item.path}
              />
              {/* {open ? <ExpandMoreIcon /> : <ChevronRightIcon />} */}
            </ListItem>
            {/* <ListItemIcon 
            style={{
              marginLeft:'65%',
              // marginBottom:'-20%'
              marginTop:'-70%'
            }}
            > {item.dropdown}</ListItemIcon> */}
           
            <Collapse in={open} timeout="auto" unmountOnExit>
              {/* {item.subtitle.map((subItem) => ( */}
              <>
             
              <ListItem
                  // key={subItem.title}
                  button
                  component={RouterLink}
                  // to={subItem.path}
                  activeClassName="active" 
                  style={{marginLeft:'55px'}}
                >
                  {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                  {/* <ListItemText
                    disableTypography
                    primary={subItem.title}
                    sx={{ paddingLeft: 4 }}
                  /> */}
 <Box sx={{ display: 'flex',flexDirection:'column' }}>



 <Button 
 component={RouterLink} to="/dashboard/user"
 onClick={()=>{
  setStatus('Accepted')
 }}
 >
  Accepted
</Button>


<Button
 component={RouterLink} to="/dashboard/user" 
 onClick={()=>{
  setStatus('In Progress')
 }}
>In Progress</Button>

<Button
 component={RouterLink} to="/dashboard/user"
 onClick={()=>{
  setStatus('Delivered')
 }}
>Delivered</Button>

<Button
 component={RouterLink} to="/dashboard/user"
 onClick={()=>{
  setStatus('Rejected')
 }}
>Rejected</Button>

<Button 
 component={RouterLink} to="/dashboard/user"
 onClick={()=>{
  setStatus('Closed')
 }}
>Closed</Button>
</Box>
                </ListItem>
               
                </>
              {/* ))} */}
            </Collapse>
          </div>
        ) : (
          <ListItem
            key={item.title}
            button
            component={RouterLink}
            to={item.path}
            activeClassName="active" 
          >
            <ListItemIcon
             activeClassName="active" 
            >{item.icon}</ListItemIcon>
            <ListItemText disableTypography primary={item.title} 
             activeClassName="active" 
            />
          </ListItem>
        )
      )}
    </List>
      {/* {info && info} */}
    {/* </StyledNavItem> */}
      

      <Box sx={{ flexGrow: 1 }} />

      {/* <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Box
            component="img"
            src="/assets/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              Get more?
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              From only $69
            </Typography>
          </Box>

          <Button href="https://material-ui.com/store/items/minimal-dashboard/" target="_blank" variant="contained">
            Upgrade to Pro
          </Button>
        </Stack>
      </Box> */}
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
export {Btn,Nav}