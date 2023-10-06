// // import { Helmet } from 'react-helmet-async';
// // import { filter } from 'lodash';
// // import { sentenceCase } from 'change-case';
// // import { useState } from 'react';
// // // @mui
// // import {
// //   Card,
// //   Table,
// //   Stack,
// //   Paper,
// //   Avatar,
// //   Button,
// //   Popover,
// //   Checkbox,
// //   TableRow,
// //   MenuItem,
// //   TableBody,
// //   TableCell,
// //   Container,
// //   Typography,
// //   IconButton,
// //   TableContainer,
// //   TablePagination,
// // } from '@mui/material';
// // // components
// // import Label from '../components/label';
// // import Iconify from '../components/iconify';
// // import Scrollbar from '../components/scrollbar';
// // // sections
// // import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// // // mock
// // import USERLIST from '../_mock/user';

// // // ----------------------------------------------------------------------

// // const TABLE_HEAD = [
// //   { id: 'name', label: 'Name', alignRight: false },
// //   { id: 'company', label: 'Company', alignRight: false },
// //   { id: 'role', label: 'Role', alignRight: false },
// //   { id: 'isVerified', label: 'Verified', alignRight: false },
// //   { id: 'status', label: 'Status', alignRight: false },
// //   { id: '' },
// // ];

// // // ----------------------------------------------------------------------

// // function descendingComparator(a, b, orderBy) {
// //   if (b[orderBy] < a[orderBy]) {
// //     return -1;
// //   }
// //   if (b[orderBy] > a[orderBy]) {
// //     return 1;
// //   }
// //   return 0;
// // }

// // function getComparator(order, orderBy) {
// //   return order === 'desc'
// //     ? (a, b) => descendingComparator(a, b, orderBy)
// //     : (a, b) => -descendingComparator(a, b, orderBy);
// // }

// // function applySortFilter(array, comparator, query) {
// //   const stabilizedThis = array.map((el, index) => [el, index]);
// //   stabilizedThis.sort((a, b) => {
// //     const order = comparator(a[0], b[0]);
// //     if (order !== 0) return order;
// //     return a[1] - b[1];
// //   });
// //   if (query) {
// //     return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
// //   }
// //   return stabilizedThis.map((el) => el[0]);
// // }

// // export default function UserPage() {
// //   const [open, setOpen] = useState(null);

// //   const [page, setPage] = useState(0);

// //   const [order, setOrder] = useState('asc');

// //   const [selected, setSelected] = useState([]);

// //   const [orderBy, setOrderBy] = useState('name');

// //   const [filterName, setFilterName] = useState('');

// //   const [rowsPerPage, setRowsPerPage] = useState(5);

// //   const handleOpenMenu = (event) => {
// //     setOpen(event.currentTarget);
// //   };

// //   const handleCloseMenu = () => {
// //     setOpen(null);
// //   };

// //   const handleRequestSort = (event, property) => {
// //     const isAsc = orderBy === property && order === 'asc';
// //     setOrder(isAsc ? 'desc' : 'asc');
// //     setOrderBy(property);
// //   };

// //   const handleSelectAllClick = (event) => {
// //     if (event.target.checked) {
// //       const newSelecteds = USERLIST.map((n) => n.name);
// //       setSelected(newSelecteds);
// //       return;
// //     }
// //     setSelected([]);
// //   };

// //   const handleClick = (event, name) => {
// //     const selectedIndex = selected.indexOf(name);
// //     let newSelected = [];
// //     if (selectedIndex === -1) {
// //       newSelected = newSelected.concat(selected, name);
// //     } else if (selectedIndex === 0) {
// //       newSelected = newSelected.concat(selected.slice(1));
// //     } else if (selectedIndex === selected.length - 1) {
// //       newSelected = newSelected.concat(selected.slice(0, -1));
// //     } else if (selectedIndex > 0) {
// //       newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
// //     }
// //     setSelected(newSelected);
// //   };

// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setPage(0);
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //   };

// //   const handleFilterByName = (event) => {
// //     setPage(0);
// //     setFilterName(event.target.value);
// //   };

// //   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

// //   const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

// //   const isNotFound = !filteredUsers.length && !!filterName;

// //   return (
// //     <>
// //       <Helmet>
// //         <title> User | Minimal UI </title>
// //       </Helmet>

// //       <Container>
// //         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
// //           <Typography variant="h4" gutterBottom>
// //             User
// //           </Typography>
// //           <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
// //             New User
// //           </Button>
// //         </Stack>

// //         <Card>
// //           <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

// //           <Scrollbar>
// //             <TableContainer sx={{ minWidth: 800 }}>
// //               <Table>
// //                 <UserListHead
// //                   order={order}
// //                   orderBy={orderBy}
// //                   headLabel={TABLE_HEAD}
// //                   rowCount={USERLIST.length}
// //                   numSelected={selected.length}
// //                   onRequestSort={handleRequestSort}
// //                   onSelectAllClick={handleSelectAllClick}
// //                 />
// //                 <TableBody>
// //                   {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
// //                     const { id, name, role, status, company, avatarUrl, isVerified } = row;
// //                     const selectedUser = selected.indexOf(name) !== -1;

// //                     return (
// //                       <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
// //                         <TableCell padding="checkbox">
// //                           <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
// //                         </TableCell>

// //                         <TableCell component="th" scope="row" padding="none">
// //                           <Stack direction="row" alignItems="center" spacing={2}>
// //                             <Avatar alt={name} src={avatarUrl} />
// //                             <Typography variant="subtitle2" noWrap>
// //                               {name}
// //                             </Typography>
// //                           </Stack>
// //                         </TableCell>

// //                         <TableCell align="left">{company}</TableCell>

// //                         <TableCell align="left">{role}</TableCell>

// //                         <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

// //                         <TableCell align="left">
// //                           <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
// //                         </TableCell>

// //                         <TableCell align="right">
// //                           <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
// //                             <Iconify icon={'eva:more-vertical-fill'} />
// //                           </IconButton>
// //                         </TableCell>
// //                       </TableRow>
// //                     );
// //                   })}
// //                   {emptyRows > 0 && (
// //                     <TableRow style={{ height: 53 * emptyRows }}>
// //                       <TableCell colSpan={6} />
// //                     </TableRow>
// //                   )}
// //                 </TableBody>

// //                 {isNotFound && (
// //                   <TableBody>
// //                     <TableRow>
// //                       <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
// //                         <Paper
// //                           sx={{
// //                             textAlign: 'center',
// //                           }}
// //                         >
// //                           <Typography variant="h6" paragraph>
// //                             Not found
// //                           </Typography>

// //                           <Typography variant="body2">
// //                             No results found for &nbsp;
// //                             <strong>&quot;{filterName}&quot;</strong>.
// //                             <br /> Try checking for typos or using complete words.
// //                           </Typography>
// //                         </Paper>
// //                       </TableCell>
// //                     </TableRow>
// //                   </TableBody>
// //                 )}
// //               </Table>
// //             </TableContainer>
// //           </Scrollbar>

// //           <TablePagination
// //             rowsPerPageOptions={[5, 10, 25]}
// //             component="div"
// //             count={USERLIST.length}
// //             rowsPerPage={rowsPerPage}
// //             page={page}
// //             onPageChange={handleChangePage}
// //             onRowsPerPageChange={handleChangeRowsPerPage}
// //           />
// //         </Card>
// //       </Container>

// //       <Popover
// //         open={Boolean(open)}
// //         anchorEl={open}
// //         onClose={handleCloseMenu}
// //         anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
// //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
// //         PaperProps={{
// //           sx: {
// //             p: 1,
// //             width: 140,
// //             '& .MuiMenuItem-root': {
// //               px: 1,
// //               typography: 'body2',
// //               borderRadius: 0.75,
// //             },
// //           },
// //         }}
// //       >
// //         <MenuItem>
// //           <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
// //           Edit
// //         </MenuItem>

// //         <MenuItem sx={{ color: 'error.main' }}>
// //           <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
// //           Delete
// //         </MenuItem>
// //       </Popover>
// //     </>
// //   );
// // }


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Container,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Pagination,
//   Typography,
//   TablePagination,
//   Card,
//   Button
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// // import Typography from 'src/theme/overrides/Typography';

// // const apiUrl = 'https://dev.techstreet.in/vmsglen/public/api/orders?status=Accepted';
// // const apiToken = '147|770QaHeB3OMMoRMScdjc88lk8WLtJiAhxunPbWjT';
// // const itemsPerPage = 10;


// // import { useNavigate } from 'react-router-dom';




// export default function UserPage() {

//   const navigate=useNavigate()
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   // const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(false); // Add loading state
//   const [error, setError] = useState(false); // Add error state
//   const [selectedStatus, setSelectedStatus] = useState('Accepted'); // Initialize with 'Accepted'
  

//   const apiToken = '147|770QaHeB3OMMoRMScdjc88lk8WLtJiAhxunPbWjT';
//   const itemsPerPage = 10;
//   // const List= [
//   //   "Accepted",
//   //   "In Progress",
//   //   "Delivered",
//   //   "Rejected",
//   //   "Closed"
//   // ];

  // const List =[
  //   {Accepted:'Accepted'},
  //   {InProgress:'In Progress'},
  //   {Delivered:'Delivered'},
  //   {Rejected:'Rejected'},
  //   {Closed:'Closed'}
  // ]


//   const apiUrl = `https://dev.techstreet.in/vmsglen/public/api/orders?status=${selectedStatus}`;
  


//   useEffect(() => {

// if(!localStorage.getItem('token')){
//   navigate('/login')
  
// }



//     const fetchData = async (status) => {
//       try {
//         setLoading(true); // Set loading to true while fetching
//         setError(null); 
//         const response = await axios.get(apiUrl, {
//           headers: {
//             Authorization: `Bearer ${apiToken}`,
//           },
       
//         });

//         if (!response.data) {
//           throw new Error('No data received')
//           // setError(true)
//         }
//         console.log(response.data.data)
//         setProducts(response.data.data);
//         setLoading(false);
//       //  const serialNo=response.data.meta.total
     
//         // setTotalPages(response.data.last_page);
//       } catch (error) {
//         setError(true); // Set error state if there's an error
//         setLoading(false);
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData(selectedStatus)
//   }, [currentPage,
//     selectedStatus
//     ])

 

//   return (
//   <div>
//           {/* Create buttons for each status */}
//           {List.map((status) => (
//             <Button
//               key={status}
//               variant="contained"
//               color={status === selectedStatus ? 'primary' : 'default'}
//               onClick={() => setSelectedStatus(status)} // Update selected status
//             >
//               {status}
//             </Button>
//           ))}
//     <Card>
//     <Container>
//      <Typography variant="h4" gutterBottom st marginBottom={4} marginTop={4} >
//          Accepted Order
//           </Typography>
        
      

    
//       <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//           <TableCell>Action</TableCell>
//             <TableCell>Purchase Order id</TableCell>
//             <TableCell >Company Name</TableCell>
//             <TableCell >Total Products</TableCell>
//             <TableCell >Amount</TableCell>
//             <TableCell > issued</TableCell>
//             <TableCell >Valid</TableCell>

//           </TableRow>
//         </TableHead>
//         {loading?(<h3>Loading..</h3>):error?(<h2>error...</h2>):(
//         <TableBody>
        
//         {products.map((item,index)=>{
//                 return ( 
//               <>
//               <TableRow>
//               <TableCell component="th" scope="row">        
// {index+1}  
//  </TableCell>
         
//               <TableCell component="th" scope="row">        
// {item.oid}  
//  </TableCell>
//  <TableCell component="th" scope="row">
//                   {item.company_name}
//                      </TableCell>
//                      <TableCell component="th" scope="row">
//                   {item.total_products}
//                      </TableCell>
//                      <TableCell component="th" scope="row">
//                   {item.total_amount}
//                      </TableCell>
//                      <TableCell component="th" scope="row">
//                   {item.issue_date}
//                      </TableCell>
//                      <TableCell component="th" scope="row">
//                   {item.validity}
//                      </TableCell>
       
//                 </TableRow>
//                </> 
                
//               )
//                   })}
         
//         </TableBody>)}
//         </Table>
//         </TableContainer>
       
//     </Container>
//     </Card>  </div>
//   )
// }



import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

import { Btn } from '.'
import { useButtonContext } from './ButttonProvide';
import { TokenLogic } from './TokenLogic';





 const UserPage = () => {
  const [orders, setOrders] = useState([]);
  const { status, setStatus } = useButtonContext();

 
  // const {status}=btnProvider
  console.log(status)

  useEffect(()=>{
<TokenLogic/>
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiToken = '147|770QaHeB3OMMoRMScdjc88lk8WLtJiAhxunPbWjT'
        const apiUrl = `https://dev.techstreet.in/vmsglen/public/api/orders?status=${status}` // Construct the dynamic API URL
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        });

        setOrders(response.data)
        // console.log(orders)
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [status]); 

  return (
    <div>UserPage</div>
  )
}
export default UserPage