
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Pagination,
  Typography,
  TablePagination,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { Button } from '@chakra-ui/react';
// import Typography from 'src/theme/overrides/Typography';

const apiUrl = 'https://dev.techstreet.in/vmsglen/public/api/ledger?page=1&';
const apiToken = '84|YfnNVUukdmkzwP8XzkGld0zn0FKG2R0AeY2ARQm3';
const itemsPerPage = 15;


const buttonStyles = {
    margin: '0 5px',
    padding: '5px 10px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };



export const Ledger=()=>{

  const navigate=useNavigate()
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [item,setItem]=useState(0)




  
 

  useEffect(() => {

if(!localStorage.getItem('token')){
  navigate('/login')
  
}

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
          params: {
            page: currentPage,
            per_page: itemsPerPage,
            search: searchTerm,
          },
        });

        if (!response.data) {
          throw new Error('No data received');
        }
        console.log(response)
        setProducts(response.data.data);
        setTotalPages(response.data.meta.last_page);
       
      //  const serialNo=response.data.meta.total
    //   setItem(response.data.meta.total)
    //  console.log(setItem)
    //     setTotalPages(response.data.last_page)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, searchTerm, navigate])
  console.log(totalPages)
  // useEffect(()=>{
  //   if(!localStorage.getItem("token")){
  //     navigate("/login")
  //     // setAuth(true)
  //   }

//   const renderPageButtons = () => {
//     const pageButtons = [];
//     for (let page = 1; page <= totalPages; page += 1) {
//       pageButtons.push(
//         <Button
//           key={page}
//           style={buttonStyles}
//           onClick={() => handlePageChange(page)}
//           variant={currentPage === page ? 'contained' : 'outlined'}
//         >
//           {page}
//         </Button>
//       );
//     }
//     return pageButtons;
//   };

  const handlePageChange = (event, newPage) => {
    // console.log(newPage)
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };
  


 

  return (

    <Container>
       
     <Typography variant="h4" gutterBottom>
      Ledger
          </Typography>
          <div
          style={{
            display:'flex',
            width:'50%',
            justifyContent:'space-between'
          }}
          >
          <TextField
        label="From Date"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        halfWidth
        margin="normal"
        align="right"
      />
    
      <TextField
        label="To Date"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        halfWidth
        margin="normal"
        align="right"
        // sx={{ mx: '2' }}
      
      />
          </div>
     
   
      
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>S No.</TableCell>
            <TableCell>Date</TableCell>
            <TableCell >Items</TableCell>
            <TableCell >Type</TableCell>
            <TableCell >₹ Amount(Cores)</TableCell>
            <TableCell > ₹ Amount(Dr.)</TableCell>
            <TableCell >₹ Balance</TableCell>
            {/* <TableCell >Unit Price</TableCell>
            <TableCell > Unit Type</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
        
        {products.map((item,index)=>{
                return ( 
              <>
              <TableRow>
              <TableCell component="th" scope="row">        
              {/* {setItem - ((currentPage - 1) * itemsPerPage) + index}  */}
              {/* {index+1} */}
              {(currentPage - 1) * itemsPerPage + index + 1}
              {/* {item.serial} */}
 </TableCell>
         
              <TableCell component="th" scope="row"
            style={{
                width:'150px'
            }}
            >        
{item.date}  
 </TableCell>
 <TableCell component="th" scope="row">
                  {item.particulars}
                     </TableCell>
                     <TableCell component="th" scope="row">
                  {item.type}
                     </TableCell>
                     <TableCell component="th" scope="row">
                  {item.cr}
                     </TableCell>
                     <TableCell component="th" scope="row">
                  {item.dr}
                     </TableCell>
                     <TableCell component="th" scope="row">
                  {item.balance.toFixed(2)}
                     </TableCell>
                     {/* <TableCell component="th" scope="row">
                  {item.unit_price
}
                     </TableCell>
                     <TableCell component="th" scope="row">
                  {item.unit_type}
                     </TableCell> */}
             
     
       
                </TableRow>
               </> 
                
              )
                  })}
         
        </TableBody>
        </Table>
        </TableContainer>
        
        {/* <TablePagination
  component="div"
  count={totalPages}
  page={currentPage}
  onPageChange={handlePageChange}
  // rowsPerPage={rowsPerPage}
  // onRowsPerPageChange={handleChangeRowsPerPage}
/> */}
{/* <TablePagination
        component="div"
        count={totalPages}
        page={currentPage - 1}
        onPageChange={handlePageChange}
        rowsPerPage={itemsPerPage}
        labelRowsPerPage=""
      /> */}
         {/* <Pagination
        count={totalPages}
        page={currentPage-1}
        onChange={handlePageChange}
      /> */}
{/*  
<div style={{display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} 
         style={{
            margin: '0 10px',
            padding: '10px 20px',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
         }}
        >
          Previous
        </button>
        <button 
         style={{
            margin: '0 10px',
            padding: '10px 20px',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
         }}
        >{currentPage}</button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}
         style={{
            margin: '0 10px',
            padding: '10px 20px',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
         }}
        >
          Next
        </button>
      </div>  */}
         {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {renderPageButtons()}
      </div> */}
        {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div> */}
{/* <Pagination 
count={7} 
page={currentPage}
onChange={handlePageChange}
// color="primary"
// active={currentPage}

/> */}
<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
  <Pagination 
    count={totalPages} 
    page={currentPage}
    onChange={handlePageChange}
    // color="primary"
    // active={currentPage}
  />
</div>
    </Container>
   
  )
}


