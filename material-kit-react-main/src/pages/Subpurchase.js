

// chatgpt 

import { Typography, Card, Button,Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Pagination,

  TablePagination } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VerifiedIcon from '@mui/icons-material/Verified';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DescriptionIcon from '@mui/icons-material/Description';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from './AuthProvider';
import { Footer } from './Footer';



const token = sessionStorage.getItem("token");

export const Subpurchase = () => {
  const [products, setProducts] = useState([]);
  const { purchaseId,setPurchaseId } = useAuthContext();
  const [lineItem,setLineItem]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [drnlist,setDrnList]=useState([])
  const [dataVisible, setDataVisible] = useState(false);
  const [drnVisible, setDrnVisible] = useState(false);
  const navigate=useNavigate()
  const {orders,setOrders}=useAuthContext()
  const {setPurchaseData}=useAuthContext()


//  console.log("drndata",purchaseData)

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      // Redirect to the login page if the token is not present
      navigate('/login')}
      else{
    const fetchData = async () => {
      try {
        const storedPurchaseId = localStorage.getItem('purchaseId');
        // Save data to local storage


// Retrieve data from local storage



        if (storedPurchaseId) {
          // Use the stored purchaseId instead of the one from context
          // This ensures that the purchaseId persists across page refreshes
          // You can still use the purchaseId from context if it's set.
          setPurchaseId(storedPurchaseId);
          // const newUrl=`https://dev.techstreet.in/vmsglen/public/api/orders/${purchaseId}`
          // setOrders(newUrl)
        }

        const response = await axios.get(`https://dev.techstreet.in/vmsglen/public/api/orders/${purchaseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params:{
            page: currentPage,
            search: searchTerm,
          }
        });

        if (!response.data) {
          throw new Error('No data received');
        }
console.log(response.data.data)
        const companyName = response.data.data;
        setProducts([companyName]);
        setLineItem(response.data.data.line_items)
        setDrnList(response.data.data.deliveries)
        // authtransfer
    //  setPurchaseData(response.data.data.deliveries)
console.log(products)
        // localStorage.setItem('drnData',products)
        setTotalPages(response.data.last_page);
        // localStorage.setItem('', JSON.stringify(response.data.data));
        localStorage.setItem('purchaseId', purchaseId);
         localStorage.setItem('purchaseData', JSON.stringify([companyName]));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }}, [purchaseId,orders,setOrders,setPurchaseData]);
  
//   drn search
const handlePageChange = (event, newPage) => {
    // console.log(newPage)
    setCurrentPage(newPage);
  };

const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };


  return (
    <>
        <Typography variant="h4" gutterBottom
        style={{
          marginLeft:'30px',
          marginBottom:'30px'
        }}
        >
        Purchase Overview
          </Typography>
    <Card
    style={{
      width:'95%',
      height:"auto",
      marginLeft:'25px',
     // border:"1px solid lightblue",
    }}
    >
      <Typography variant="h4" gutterBottom>
        {products.length > 0 && (
          products.map((item, index) => (

      <div>

            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', 
            width: "15%" ,marginTop:'30px',marginLeft:"20px"
          }}>
              <h4
              style={{
                // margin:'auto'
              }}
              >{item.company_name}</h4>
              <h6 style={{ color: '#18dcff',marginTop:'5px' }}><VerifiedIcon /></h6>
            </div>
        
        <h4
        style={{
          marginTop:'8px',marginLeft:"20px"
        }}
        >
{/* {item.title} */}
Test
        </h4>
        <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    justifyContent: 'space-evenly',
    marginTop: '30px',
    marginBottom: '30px',
  }}
>
  {/* all 8 div */}
  {/* 1 */}
  <div
    style={{
    //   border: "3px solid #9b59b6",
      borderRadius: '5%',
      fontSize: '17px',
      textAlign: 'center',
      margin: '0 20px 0 20px',
      paddingTop: '25px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      backgroundColor:'#e2e8f0',
      color:'#061B64'
    }}
  >
    <p style={{color:'#061B64'}}>{item.oid}</p>
    <p style={{ color:'#061B64', fontSize: '12px', margin: '-10px 0px 0px 0px' }}>Purchase Order Id</p>
  </div>
  {/* 2 */}
  <div
    style={{
    //   border: "1px solid lightblue",
      borderRadius: '5%',
      fontSize: '17px',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '25px',
      margin: '0 20px 0 20px',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      backgroundColor:'#D0F2FF',
      color:'#061B64'
    }}
  >
    <p style={{ textAlign: 'center' }}>{item.subsidiary_name}</p>
    <p style={{ color:'#061B64', fontSize: '12px', textAlign: 'center', marginTop: '-15px' }}>Subsidiary</p>
  </div>
  {/* 3 */}
  <div
    style={{
        // width:"80%",
        // height:"100px",
        marginLeft:'20px',
    //   border: "1px solid lightblue",
      borderRadius: '5%',
      fontSize: '17px',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      paddingTop: '30px',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      backgroundColor:'#FFF7CD',
      color:'#7A4F01'
    }}
  >
    <p> {item.location_name}</p>
    <p style={{color:'#7A4F01', fontSize: '12px', marginTop: '-15px' }}>Location</p>
  </div>
  {/* 4 */}
  <div
    style={{
        // width:"60%",
        // height:"100px",
        marginLeft:'20px',
    //   border: "1px solid lightblue",
      borderRadius: '5%',
      fontSize: '17px',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      paddingTop: '25px',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      marginRight:'25px',
      color:'#7A0C2E',
     backgroundColor:'#FFE7D9'
     
    }}
  >
    <p> {item.total_products}</p>
    <p style={{ color: 'gray', fontSize: '12px', marginTop: '-15px' }}>Products</p>
  </div>
  {/* 5 */}
  <div
    style={{
    //   border: "1px solid lightblue",
      borderRadius: '5%',
      fontSize: '17px',
      textAlign: 'center',
      paddingTop: '10px',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      marginLeft:'25px',
      backgroundColor:'#2ecc71',
      color:'white'
    }}
  >
    <p> {item.total_amount}</p>
    <p style={{   color:'white', fontSize: '12px', marginTop: '-15px' }}>Total Amount</p>
  </div>
  {/* 6 */}
  <div
    style={{
    //   border: "1px solid lightblue",
      borderRadius: '5%',
      fontSize: '17px',
      textAlign: 'center',
      paddingTop: '10px',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      color:'#7A0C2E',
      backgroundColor:'#FFE7D9'
    }}
  >
    <p> {item.issue_date}</p>
    <p style={{   color:'#7A0C2E', fontSize: '12px', marginTop: '-15px' }}>Issued</p>
  </div>
  {/* 7 */}
  <div
    style={{
    //   border: "1px solid lightblue",
      borderRadius: '5%',
      fontSize: '17px',
      textAlign: 'center',
      paddingTop: '10px',
      marginLeft: '20px',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      backgroundColor:'#95a5a6',
      color:'white'
    }}
  >
    <p> {item.validity}</p>
    <p style={{color:'white', fontSize: '12px', marginTop: '-15px' }}>Validity</p>
  </div>
  {/* 8 */}
  <div
    style={{
    //   border: "1px solid lightblue",
      borderRadius: '5%',
      marginLeft: '20px',
      fontSize: '17px',
      textAlign: 'center',
      paddingTop: '10px',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      marginRight:'25px',
      backgroundColor:'#e2e8f0',
      color:'#061B64'
    }}
  >
    <p>{item.status}</p>
    <p style={{ color:'#061B64', fontSize: '12px', marginTop: '-15px' }}>Status</p>
  </div>
</div>

</div>
    
          ))
        )}
      </Typography>
    </Card>
   {/* purchase order card */}

    <Card
    style={{
      width:'95%',
      height:"auto",
      margin:'25px',
   
     // border:"1px solid lightblue",
    }}
    >

      <div
      style={{
        width:'95%',
        display:'flex',
    justifyContent:'space-between',
margin:'15px 25px 15px 25px'
      }}
      >
<h4
style={{
  fontFamily:'sans-serif,Public Sans'
}}
>Purchase Orders</h4>
{/* drn btn */}
<Link to="/dashboard/subpurchase/drnlist"><Button
>Create DRN</Button></Link>

</div>
{/* tablediv */}
<div
style={{
  margin:'15px 25px 15px 25px',
  maxHeight: '300px', overflow: 'auto'
}}
>
<TableContainer component={Paper}

>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>S No.</TableCell>
            <TableCell>Product Code </TableCell>
            <TableCell >Product Name</TableCell>
            <TableCell >Remark</TableCell>
            <TableCell >Price</TableCell>
            <TableCell >GST(%) </TableCell>
            <TableCell >Ordered Qty</TableCell>
            <TableCell >Delivered Qty</TableCell>
            <TableCell >Pending Qty </TableCell>
            <TableCell >Total Amount</TableCell>
            <TableCell > Schedule</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <div style={{display:'flex'  , width:'120px',
            // border:'2px solid red'
            justifyContent:'space-around',
        marginTop:'20px'}}>
            <p
              style={{
             
              }}
            >  {dataVisible ? "Hide Data" : "Show Data"}</p>
        <KeyboardArrowDownIcon
  variant="contained"
  color="primary"
  onClick={() => setDataVisible(!dataVisible)}

>
  {dataVisible ? "Hide Data" : "Show Data"}
</KeyboardArrowDownIcon>
            </div>
     
        
  {dataVisible&&lineItem.map((item,index) => (
    <TableRow key={item.id}>
      <TableCell>{index+1}</TableCell>
      <TableCell>{item.product_code}</TableCell>
      <TableCell>{item.product_name}</TableCell>
      <TableCell>{item.remark}</TableCell>
      <TableCell>{item.product_price}</TableCell>
      <TableCell>{item.gst}</TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>{item.quantityInvoiced}</TableCell>
      <TableCell>{item.outstandingQuantity}</TableCell>
      <TableCell>{item.total_price}</TableCell>
      <TableCell>{item.schedule}</TableCell>  
    </TableRow>
  ))}

  {/* total amount */}
  
  {/* <div>
    <h5>
      Final Total :{item.}
    </h5>
  </div> */}
</TableBody>

        </Table>
        <div
  style={{
    // marginRight:'80%'
    // border:'1px solid red',
    width:'95%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'end',
    marginTop:'15px',
    // marginRight:'30px'
  }}
  >
    <h5>  Final Total :
 {lineItem.reduce((total, item) => (
    total + parseFloat(item.total_price)
  ), 0).toFixed(2)}</h5>
</div>
       
        </TableContainer>
</div>
    </Card>

    {/* drn list card */}
    <Card
    style={{
      width:'95%',
      height:"auto",
      margin:'25px',
   
     // border:"1px solid lightblue",
    }}
    >

      <div
      style={{
        // width:'100%',
        display:'flex',
    justifyContent:'space-between',
margin:'15px 25px 15px 25px'
      }}
      >
<h4
style={{
  fontFamily:'sans-serif,Public Sans',marginTop:'25px'
}}
>DRN List</h4>
{/* drn search  */}
<TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        halfWidth
        margin="normal"
        align="right"
      />

</div>
{/* tablediv */}
<div
style={{
  margin:'15px 25px 15px 25px',
  maxHeight: '300px', overflow: 'auto'
}}
>
<TableContainer component={Paper}

>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>S No.</TableCell>
            <TableCell>Action </TableCell>
            <TableCell >DRN No</TableCell>
            <TableCell >DRN Date </TableCell>
            <TableCell >No. of Products</TableCell>
            <TableCell >Total Amount</TableCell>
            <TableCell >Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <div style={{display:'flex'  , width:'120px',
            // border:'2px solid red'
            justifyContent:'space-around',
        marginTop:'20px'}}>
            <p
              style={{
             
              }}
            >  {drnVisible ? "Hide Data" : "Show Data"}</p>
        <KeyboardArrowDownIcon
  variant="contained"
  color="primary"
  onClick={() => setDrnVisible(!drnVisible)}

>
  {drnVisible ? "Hide Data" : "Show Data"}
</KeyboardArrowDownIcon>
            </div>
  {drnVisible &&drnlist.map((item,index) => (
    <TableRow key={item.id}>
      <TableCell>{index+1}</TableCell>
      {/* action */}
      {/* icon */}
      <div
      style={{
        display:'flex'
      }}
      >
      <TableCell
      ><RemoveRedEyeIcon
      style={{
      color:'#3498db',
      fontSize:'30px', cursor:'pointer'
      }}
      /></TableCell>
      <TableCell
      ><DescriptionIcon
      style={{
        color:'#e74c3c' ,
        fontSize:'30px',
        cursor:'pointer'
              }}/></TableCell>
      </div>
      <TableCell>{item.drn_id}</TableCell>
      <TableCell>{item.created_at}</TableCell> 
         <TableCell>{item.total_products}</TableCell>
      <TableCell>{item.total_delivery_price}</TableCell>
      <TableCell>{item.status}</TableCell>
    </TableRow>
  ))}

  {/* total amount */}
  
  {/* <div>
    <h5>
      Final Total :{item.}
    </h5>
  </div> */}
</TableBody>

        </Table>
       
        </TableContainer>
        {/* pagination for drn list  */}
        <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
        }}
      > 
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
        />
     </div> 
</div>
    </Card>

{/* Activities */}
<Card
    style={{
      width:'95%',
      height:"auto",
      margin:'25px',
   
     // border:"1px solid lightblue",
    }}
    >

<h4
style={{
  fontFamily:'sans-serif,Public Sans',margin:'15px 25px 15px 25px'
}}
>Activities</h4>


{/* tablediv */}
<div
style={{
  margin:'15px 25px 15px 25px',
  maxHeight: '300px', overflow: 'auto'
}}
>
<TableContainer component={Paper}

>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>S No.</TableCell>
            <TableCell>Subject </TableCell>
            <TableCell >Action</TableCell>
            <TableCell >Remark</TableCell>
            <TableCell >ActionBy</TableCell>
            <TableCell >Date </TableCell>
        
          </TableRow>
        </TableHead>
        <TableBody>
  {/* {lineItem.map((item,index) => (
    <TableRow key={item.id}>
      <TableCell>{index+1}</TableCell>
      <TableCell>{item.product_code}</TableCell>
      <TableCell>{item.product_name}</TableCell>
      <TableCell>{item.remark}</TableCell>
      <TableCell>{item.product_price}</TableCell>
      <TableCell>{item.gst}</TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>{item.quantityInvoiced}</TableCell>
      <TableCell>{item.outstandingQuantity}</TableCell>
      <TableCell>{item.total_price}</TableCell>
      <TableCell>{item.schedule}</TableCell>  
    </TableRow>
  ))} */}
<TableRow>
<div
 style={{
   textAlign:'center',
   marginLeft:'100%',
   marginTop:'20px',
//    border:'2px solid red',
   width:'100%'
}}
  >
    <p
   
    >Activities not found!</p>
  </div>
</TableRow>

  {/* total amount */}
  
  {/* <div>
    <h5>
      Final Total :{item.}
    </h5>
  </div> */}
</TableBody>
        </Table>
               </TableContainer>
</div>
    </Card>
    {/* footer  */}
<Footer/>
    </>
  );
};

