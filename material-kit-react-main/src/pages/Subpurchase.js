

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

import { useAuthContext } from './AuthProvider';

const token = sessionStorage.getItem("token");

export const Subpurchase = () => {
  const [products, setProducts] = useState([]);
  const { purchaseId,setPurchaseId } = useAuthContext();
  const [lineItem,setLineItem]=useState([])
console.log(lineItem)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPurchaseId = localStorage.getItem('purchaseId');

        if (storedPurchaseId) {
          // Use the stored purchaseId instead of the one from context
          // This ensures that the purchaseId persists across page refreshes
          // You can still use the purchaseId from context if it's set.
          setPurchaseId(storedPurchaseId);
        }

        const response = await axios.get(`https://dev.techstreet.in/vmsglen/public/api/orders/${purchaseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.data) {
          throw new Error('No data received');
        }
console.log(response.data.data)
        const companyName = response.data.data;
        setProducts([companyName]);
        setLineItem(response.data.data.line_items)

        localStorage.setItem('purchaseId', purchaseId);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [purchaseId]);

  // const row=fetchData();
//   const divStyle = {
//     border: '1px dashed grey',
// // width:'100px'
//   };

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
            width: "21%" ,marginTop:'30px',marginLeft:"20px"
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
          marginTop:'10px',marginLeft:"20px"
        }}
        >
{/* {item.title} */}
Test
        </h4>

        <div
        style={{
          display:'grid',
          gridTemplateColumns:'repeat(6, 1fr)',
           gap:'20px',
          justifyContent:'space-evenly',
          marginTop:'30px',
          marginBottom:'30px'
        }}
        >
          {/* all 8 div */}
        {/* 1 */}
          <div
           style={{
            width:'130px',
            height:'65px',
             border:"1px solid lightblue",
             borderRadius:'5%',
            fontSize:'17px',  
            textAlign:'center',
            // marginLeft:'20px',
            margin: '0 20px 0 20px',
            paddingTop:'10px',
            display:'flex',
            flexDirection:'column',
         
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
          }}>
            <p>{item.oid}</p>
            <p style={{color:'gray',fontSize:'12px',
              margin: '-10px 0px 0px 0px',
          }}>Purchase Order Id</p>
            </div>
            {/* 2 */}
          <div style={{
            width:'260px',
            height:'65px',
  border:"1px solid lightblue",
             borderRadius:'5%',
  fontSize:'17px',
  display:'flex',
  flexDirection:'column',
  paddingTop:'10px',
  margin: '0 20px 0 20px',
  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
  // textAlign:'center'

          }}>
       <p
       style={{
        textAlign:'center'
       }}
       >{item.subsidiary_name}</p>    
       <p
       style={{color:'gray',fontSize:'12px',textAlign:'center',marginTop:'-15px'}}
       >Subsidiary</p> 
            </div>
            {/* 3 */}
          <div style={{
 width:'auto',
 height:'65px',
 border:"1px solid lightblue",
             borderRadius:'5%',
 fontSize:'17px',
 display:'flex',
 flexDirection:'column',
 textAlign:'center',
 paddingTop:'10px',
 boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
          }}>
         <p> {item.location_name}</p>  
         <p
         style={{color:'gray',fontSize:'12px',marginTop:'-15px'}}
         >Location</p> 
            </div>
            {/* 4 */}
          <div style={{
 width:'auto',
 height:'65px',
 border:"1px solid lightblue",
             borderRadius:'5%',
 fontSize:'17px',
 display:'flex',
 flexDirection:'column',
 textAlign:'center',
 paddingTop:'10px',
 boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
          }}>
            <p>  {item.total_products}</p>
          <p
          style={{color:'gray',fontSize:'12px',marginTop:'-15px'}}
          >Products</p>
            </div>
            {/* 5 */}
          <div style={{
 width:'auto',
 height:'65px',
 border:"1px solid lightblue",
             borderRadius:'5%',
 fontSize:'17px',
 textAlign:'center',
 paddingTop:'10px',
 boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
          }}>
            <p>  {item.total_amount}</p>
  <p
  style={{color:'gray',fontSize:'12px',marginTop:'-15px'}}
  >Total Amount</p>
            </div>
            {/* 6 */}
          <div style={{
 width:'auto',
 height:'65px',
 border:"1px solid lightblue",
             borderRadius:'5%',
 fontSize:'17px',
 textAlign:'center',
 marginRight:'20px',
 paddingTop:'10px',
 boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
          }}>
            <p>  {item.issue_date}</p>
          <p
          style={{color:'gray',fontSize:'12px',marginTop:'-15px'}}
          >Issued</p>
            </div>
            {/* 7 */}
          <div style={{
 width:'130px',
 height:'65px',
 border:"1px solid lightblue",
             borderRadius:'5%',
 fontSize:'17px',
 textAlign:'center',
 marginLeft:'20px',
 paddingTop:'10px',
 boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
          }}>
            <p>    {item.validity}</p>
        <p
        style={{color:'gray',fontSize:'12px',marginTop:'-15px'}}
        >Validity</p>
            </div>
            {/* 8 */}
          <div style={{
 width:'100px',
 height:'65px',
 border:"1px solid lightblue",
             borderRadius:'5%',
             marginLeft:'20px',
 fontSize:'17px',
 textAlign:'center',
 paddingTop:'10px',
 boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
          }}>
            <p>{item.status}</p>
            <p
            style={{color:'gray',fontSize:'12px',marginTop:'-15px'}}
            >Status</p>
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
        // width:'100%',
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
<Button
>Create DRN</Button>
</div>
{/* tablediv */}
<div
style={{
  margin:'15px 25px 15px 25px'
}}
>
<TableContainer component={Paper}

>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
  {lineItem.map((item,index) => (
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
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'end',
    marginTop:'15px'
  }}
  >
    <h6>  Final Total :
 {lineItem.reduce((total, item) => (
    total + parseFloat(item.total_price)
  ), 0)}</h6>
</div>
       
        </TableContainer>
</div>
    </Card>
    </>
  );
};

