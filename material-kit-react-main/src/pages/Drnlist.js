

// github updated code 
   

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Typography, Card, Button,Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  StyledInput,
  HelperText,
  FormControl, FormHelperText,  

  TextField,
  Pagination,
Input,
  TablePagination, 
  makeStyles,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import './index.css'
import VerifiedIcon from '@mui/icons-material/Verified';
//   import { HelperText } from '@mui/material';

 import { Label } from '@mui/icons-material';
import { useAuthContext } from './AuthProvider';
import { Footer } from './Footer';
// import { object } from 'prop-types';
// import { HelperText } from '@mui/icons-material';

  // const useStyles = makeStyles((theme) => ({
  //   form: {
  //     backgroundColor: 'lightgray',
  //     padding: theme.spacing(2),
  //     
  //     flexDirection: 'column',
  //   },
  // }));

export const Drnlist = () => {


  const [lineItem,setLineItem]=useState([])
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [inputValue, setInputValue]=useState('')
  const [inputValue2,setInputValue2]=useState('')
  const [inputValue3,setInputValue3]=useState('')
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalAmount2, setTotalAmount2] = useState(0);
  const [totalAmount3, setTotalAmount3] = useState(0);
  const [idlineItemArray,setIdlineItemArray]=useState(0)
  const [subsidiaryId,setSubsidiaryId]=useState('')
  const [locationId,setLocationId]=useState('')
  const [poId,setPoId]=useState('')

   const  token = sessionStorage.getItem("token"); 
  // const token='107|UcKUUoV1lBraUd87wpOFaYRh3VIyCqK0rvoQHXxN'
  
 
  
  const [conditionInput,setConditionInput]=useState('')
  // const [grandTotalArray, setGrandTotalArray] = useState([]); 
  const [formValues, setFormValues] = useState({
    invoice: '',
    eway_bill: '',
    drn: '',
    invoice_no: null,
    invoice_date: null,
  });
    
  const { orderUrl, setOrderUrl, purchaseData, setPurchaseData } = useAuthContext();
console.log(`line_item${lineItem}`)
console.log(`subsidiary_id:${subsidiaryId}`)
console.log(`location_id:${locationId}`)
console.log(`poid:${poId}`)
// console.log(conditionInput)

useEffect(() => {
  const storedLineItemData = localStorage.getItem('lineItemData');
  if (storedLineItemData) {
    setLineItem(JSON.parse(storedLineItemData));
  }
}, []);

  useEffect(() => {
    const storedPurchaseData = localStorage.getItem('purchaseData');
    if (storedPurchaseData) {
      try {
        const parsedData = JSON.parse(storedPurchaseData);
        setPurchaseData(parsedData);
        //  setLineItem(purchaseData[0].line_items)
        if (parsedData.length > 0) {
          // Retrieve the line_items from the first item in purchaseData
          setLineItem(parsedData[0].line_items);
          setSubsidiaryId(parsedData[0].subsidiary_id)
          setLocationId(parsedData[0].location_id)
          setPoId(parsedData[0].id)
          setConditionInput(parsedData[0].line_items[0].outstandingQuantity)
          setIdlineItemArray(parsedData[0].line_items[0].id)
        }
      } catch (error) {
        console.error('Error parsing data from local storage:', error);
      }
    }
  }, [setPurchaseData,setLineItem]);


  // formDate
  function formatDateWithAMPM(dateString) {
    const date = new Date(Date.parse(dateString));
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      // minute: '2-digit',
      // second: '2-digit',
      hour12: true, // Add AM/PM
    };
    return date.toLocaleString(undefined, options);
  }
  
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior
  
//     // Create a data object with the form values
    
//     // const data = {
//     //   subsidiary_id: '10',
//     //   location_id: '54',
//     //   po_id: '1420',
//     //   invoice_no: formValues.invoice_no, // Use the invoice_no from the form
//     //   invoice_date: formValues.invoice_date, // Use the invoice_date from the form
//     //   items: JSON.stringify([
//     //     {
//     //       item_id: idlineItemArray, // Use the item_id from your state or wherever it's coming from
//     //       qty: inputValue, // Use the quantity input value
//     //       amount: totalAmount, // Use the total amount value
//     //     }
//     //   ])
//     // };

//     // Create a new FormData instance
// const formData = new FormData();

// // Append the simple key-value pairs
// formData.append('subsidiary_id', subsidiaryId);
// formData.append('location_id', locationId);
// formData.append('po_id', poId);
// formData.append('invoice_no', formValues.invoice_no); // Use the invoice_no from the form
// formData.append('invoice_date', formValues.invoice_date); // Use the invoice_date from the form
// // Stringify the array and append it as a single value

// // Append any file inputs
// formData.append('invoice', formValues.input); // Use your file input variable for 'file1'
// formData.append('eway_bill', formValues.eway_bill);
// formData.append('drn',formValues.drn)
// // Use your file input variable for 'file2'
// // Create an array of items as an object

// const items = [
//   {
//     item_id: idlineItemArray, // Use the item_id from your state or wherever it's coming from
//     qty: inputValue, // Use the quantity input value
//     amount: totalAmount, // Use the total amount value
//   }
// ];

// formData.append('items', JSON.stringify(items));
    
//     try {
//       const response = await axios.post(
//         'https://dev.techstreet.in/vmsglen/public/api/delivery',
//         formData, // Use the data object with all the required values
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       // setSubsidiaryId('')
//       // setLocationId('')
//       // setPoId('')

//       // setFormValues({ ...formValues });
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error sending the request:', error);
//     }
//   };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('subsidiary_id', subsidiaryId);
  formData.append('location_id', locationId);
  formData.append('po_id', poId);
//   formData.append('invoice', formValues.input); // Use your file input variable for 'file1'
// formData.append('eway_bill', formValues.eway_bill);
// formData.append('drn',formValues.drn)
formData.append('invoice', formValues.invoice); // Use your file input variable for 'invoice'
formData.append('eway_bill', formValues.eway_bill);
formData.append('drn', formValues.drn);

  formData.append('invoice_no', formValues.invoice_no);
  formData.append('invoice_date', formValues.invoice_date);

  const items = [
    {
      item_id: idlineItemArray,
      qty: inputValue,
      amount: totalAmount,
    }
  ];

  formData.append('items', JSON.stringify(items));

  try {
    const response = await axios.post(
      'https://dev.techstreet.in/vmsglen/public/api/delivery',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Make sure to set the content type to multipart/form-data
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error sending the request:', error);
  }
};


  
      // Add input values to the FormData object
      // formData.append('invoice', formValues.invoice);
      // formData.append('eway_bill', formValues.eway_bill);
      // formData.append('drn', formValues.drn);
      // formData.append('invoice_no', formValues.invoice_no);
      // formData.append('invoice_date', formValues.invoice_date); 

  
// 1
const handleChange = (e) => {
  const newValue = e.target.value;
  if (Number(newValue) <= conditionInput) {
    setInputValue(newValue);

    const updatedTotalAmount = lineItem.reduce((total, item) => {
      const productPrice = item.product_price;
      const total1 = productPrice * newValue; // Use newValue from the input
      const gst1 = (total1 * 18) / 100;
      const grandTotal1 = total1 + gst1;
      return total + grandTotal1;
    }, 0).toFixed(2);

    setTotalAmount(updatedTotalAmount);
  } else {
    alert('Input must be less than pending qty');
  }
};

// 2
const handleChange2 = (e) => {
  const newValue = e.target.value;
  if (Number(newValue) <= conditionInput) {
    setInputValue2(newValue);

    const updatedTotalAmount = lineItem.reduce((total, item) => {
      const productPrice = item.product_price;
      const total2 = productPrice * newValue; // Use newValue from the input
      const gst2 = (total2 * 18) / 100;
      const grandTotal2 = total2 + gst2;
      return total + grandTotal2;
    }, 0).toFixed(2);

    setTotalAmount2(updatedTotalAmount);
  } else {
    alert('Input must be less than pending qty');
  }
};

// 3
const handleChange3 = (e) => {
  const newValue = e.target.value;
  if (Number(newValue) <= conditionInput) {
    setInputValue3(newValue);

    const updatedTotalAmount = lineItem.reduce((total, item) => {
      const productPrice = item.product_price;
      const total3 = productPrice * newValue; // Use newValue from the input
      const gst3 = (total3 * 18) / 100;
      const grandTotal3 = total3 + gst3;
      return total + grandTotal3;
    }, 0).toFixed(2);

    setTotalAmount3(updatedTotalAmount);
  } else {
    alert('Input must be less than pending qty');
  }
};


const updateConditionInput=(item)=>{
setConditionInput(item)
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues)
  };
  const handleFileInputChange = (e, fieldName) => {
  const file = e.target.files[0]; // Get the selected file
  setFormValues({ ...formValues, [fieldName]: file });
};

  const handleClose = () => {
    setIsFormVisible(false);
  };
  


  return (
    <div>
     <>
        <Typography variant="h4" gutterBottom
        style={{
          marginLeft:'30px',
          marginBottom:'30px'
        }}
        >
        DRN Overview
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
        {purchaseData.length > 0 && (
          purchaseData.map((item, index) => (

      <div >


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
        {/* media query */}
        
        <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    justifyContent: 'space-evenly',
    marginTop: '30px',
    marginBottom: '30px',
    }
  }
  id='drndiv'

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
      
    
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      backgroundColor:'#e2e8f0',
      color:'#061B64'
    }}
  >
    <p style={{color:'#061B64'}}>{item.oid
}</p>
    <p style={{ color:'#061B64', fontSize: '12px', margin: '-10px 0px 0px 0px' }}>Purchase Order Id</p>
  </div>
  {/* 2 */}
  <div
    style={{
    //   border: "1px solid lightblue",
      borderRadius: '5%',
      fontSize: '17px',
      
    
      paddingTop: '25px',
      margin: '0 20px 0 20px',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      backgroundColor:'#D0F2FF',
      color:'#061B64'
    }}
  >
    <p style={{ textAlign: 'center' }}>{item.deliveries[0].subsidiary_id}</p>
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
 textAlign: 'center',
      paddingTop: '30px',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      backgroundColor:'#FFF7CD',
      color:'#7A4F01'
    }}
  >
    <p> {item.deliveries[0].location_id}</p>
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

    <p>
    {formatDateWithAMPM(item.deliveries[0].created_at)}
</p>


    <p style={{   color:'white', fontSize: '12px', marginTop: '-15px' }}>Created at</p>
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
    <p> 
    {formatDateWithAMPM(item.deliveries[0].updated_at)}
    </p>
    <p style={{   color:'#7A0C2E', fontSize: '12px', marginTop: '-15px' }}>Updated At</p>
  </div>
  {/* 7 */}
  
</div>

</div>
    
          ))
        )}
      </Typography>
    </Card>

    {/* create DRN */}
    <Card
      style={{
        width:'95%',
        height:"auto",
        margin:'25px',
      }}
    >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>S No.</TableCell>
            <TableCell>Product Code</TableCell>
            <TableCell >Product Name</TableCell>
            <TableCell >Price</TableCell>
            <TableCell >GST</TableCell>
            
            <TableCell >Ordered Qty</TableCell>
            <TableCell >Delivered Qty</TableCell>
            <TableCell >Pending Qty </TableCell>
            <TableCell >Qty in This Delivery</TableCell>
            <TableCell >Total Amount </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
        
           
              <>
{/* 1 */}
              <TableRow>

                {lineItem.length>0&&(lineItem.map((item,index)=>{
                    //  const productPrice = item.product_price;
                    //  const quantity = item.quantity;
                    //  const total = productPrice * inputValue;
                    //  const gst = (total * 18) / 100;
                    //  const grandTotal1=total+gst;
                    //  const calculatedTotal = grandTotal1.toFixed(2);

                  return (
<>
<TableCell component="th" scope="row">        
{index+1}
 </TableCell>
         
              <TableCell component="th" scope="row">        
{item.product_code}
 </TableCell>
 <TableCell component="th" scope="row">
                  {item.product_name}
                     </TableCell>
                     <TableCell component="th" scope="row">
                  {item.product_price}
                     </TableCell>
                     <TableCell component="th" scope="row">
                  {item.gst}
                     </TableCell>
                  
                     <TableCell component="th" scope="row">
                  {item.quantity}
                     </TableCell>
                     <TableCell component="th" scope="row">
                  {item.quantityReceived}

                     </TableCell>
                     <TableCell component="th" scope="row">
                  {conditionInput}
                     </TableCell>
                     <TableCell component="th" scope="row">
            <TextField
            value={inputValue.toString()}
            onChange={handleChange}
          
            />
                      {/* {item.outstandingQuantity} */}
                     </TableCell>
                     <TableCell component="th" scope="row">
                     {/* { item.total_price} */}
                     {/* {grandTotal1.toFixed(2)} */}
                     {totalAmount}
              
                   {/* < MyComponent
     grandTotal={grandTotal1.toFixed(2)}
      handleTotalAmount={grandTotal1.toFixed(2)}
    /> */}

                     </TableCell>
</>
                  )
                }))}
                </TableRow>

                {/* 2 */}
                <TableRow>

{lineItem.length>0&&(lineItem.map((item,index)=>{
    //  const productPrice = item.product_price;
    //  const quantity = item.quantity;
    //  const total = productPrice * inputValue2;
    //  const gst = (total * 18) / 100;
    //  const grandTotal2=total+gst
  return (
<>
<TableCell component="th" scope="row">        
{index+1}
</TableCell>

<TableCell component="th" scope="row">        
{item.product_code}
</TableCell>
<TableCell component="th" scope="row">
  {item.product_name}
     </TableCell>
     <TableCell component="th" scope="row">
  {item.product_price}
     </TableCell>
     <TableCell component="th" scope="row">
  {item.gst}
     </TableCell>
  
     <TableCell component="th" scope="row">
  {item.quantity}
     </TableCell>
     <TableCell component="th" scope="row">
  {item.quantityReceived}

     </TableCell>
     <TableCell component="th" scope="row">
  {conditionInput}
     </TableCell>
     <TableCell component="th" scope="row">
<TextField
value={inputValue2.toString()}
onChange={handleChange2}

/>
      {/* {item.outstandingQuantity} */}
     </TableCell>
     <TableCell component="th" scope="row">
     {/* { item.total_price} */}
     {/* {grandTotal2.toFixed(2)} */}
     {totalAmount2}
     </TableCell>
</>
  )
}))}
</TableRow>
{/* 3 */}
<TableRow>

{lineItem.length>0&&(lineItem.map((item,index)=>{
     const productPrice = item.product_price;
     const quantity = item.quantity;
     const total = productPrice * inputValue3;
     const gst = (total * 18) / 100;
     const grandTotal3=total+gst
     
  return (
<>
<TableCell component="th" scope="row">        
{index+1}
</TableCell>

<TableCell component="th" scope="row">        
{item.product_code}
</TableCell>
<TableCell component="th" scope="row">
  {item.product_name}
     </TableCell>
     <TableCell component="th" scope="row">
  {item.product_price}
     </TableCell>
     <TableCell component="th" scope="row">
  {item.gst}
     </TableCell>
  
     <TableCell component="th" scope="row">
  {item.quantity}
     </TableCell>
     <TableCell component="th" scope="row">
  {item.quantityReceived}
     </TableCell>
     <TableCell component="th" scope="row">
  {conditionInput}
     </TableCell>
     <TableCell component="th" scope="row">
<TextField
value={inputValue3.toString()}
onChange={handleChange3}

/>
      {/* {item.outstandingQuantity} */}
     </TableCell>
     <TableCell component="th" scope="row">
     {/* { item.total_price} */}
     {/* {grandTotal3.toFixed(2)} */}
     {totalAmount3}
     </TableCell>
</>
  )
}))}
</TableRow>

 {/* total calculation tablerow */}
<TableRow>
          <TableCell colSpan={3}><h5>Total of GrandTotals:</h5></TableCell>
          <TableCell colSpan={1}>
            <h5>
            {lineItem.length > 0 &&
              lineItem.reduce((total, item) => {
                const productPrice = item.product_price;
                const total1 = productPrice * inputValue;
                const gst1 = (total1 * 18) / 100;
                const grandTotal1 = total1 + gst1;

                const total2 = productPrice * inputValue2;
                const gst2 = (total2 * 18) / 100;
                const grandTotal2 = total2 + gst2;

                const total3 = productPrice * inputValue3;
                const gst3 = (total3 * 18) / 100;
                const grandTotal3 = total3 + gst3;

                return total + grandTotal1 + grandTotal2 + grandTotal3;
              }, 0).toFixed(2)}
            </h5>
           
          </TableCell>
        </TableRow>
               </> 
               {/* <h5>Total of GrandTotals: {(Number(grandTotal1)) + (Number(grandTotal2)) + (Number(grandTotal3))}</h5>  */}
        </TableBody>
        </Table>

{/* form  */}
<Button
          // variant="contained"
          // color="primary"
          style={{
            marginBottom:'25px',marginLeft:'40%',marginTop:'25px'
          }}
          onClick={() => {
            if (
              lineItem.length > 0 &&
              lineItem.reduce((total, item) => {
                const productPrice = item.product_price;
                const total1 = productPrice * inputValue;
                const gst1 = (total1 * 18) / 100;
                const grandTotal1 = total1 + gst1;
        
                const total2 = productPrice * inputValue2;
                const gst2 = (total2 * 18) / 100;
                const grandTotal2 = total2 + gst2;
        
                const total3 = productPrice * inputValue3;
                const gst3 = (total3 * 18) / 100;
                const grandTotal3 = total3 + gst3;
        
                return total + grandTotal1 + grandTotal2 + grandTotal3;
              }, 0) !== 0
            ) {
              toggleFormVisibility(); // Open the form
            } else {
              alert("Total amount must not be 0");
            }
          }}
        >
          {isFormVisible ? 'Hide Form' : 'Show Form'}
        </Button>

      
        {isFormVisible && (
            <Dialog open={isFormVisible} onClose={handleClose}>
            <DialogTitle
            style={{
              color:'#2065D1',     
 }}
            >Form</DialogTitle>
            <DialogContent>
        <form onSubmit={handleSubmit} style={{ marginTop: '25px', marginBottom: '25px',display:'flex',
        flexDirection:"column" ,width:'40%,'}}>
              {/* Input box 1 */}
              <FormControl required>
        <div style={{
          display:'flex',
          flexDirection:'row',
          marginBottom:'20px'
        }}>
          <h5
          style={{
            marginTop:'15px',
        marginRight:'20px',
        
          }}
          >Invoice:</h5>
                <TextField 
                    name="invoice"
                    value={formValues.invoice}
                    // onChange={(e) => handleFileInputChange(e, 'invoice')}
                   
                placeholder="Input 1" type='file' style={{marginLeft:'40px'}}/>
                </div>
              </FormControl>
        
              {/* Input box 2 */}
              <FormControl required>
              <div style={{
          display:'flex',
          flexDirection:'row',
          marginBottom:'20px'
        }}>
           <h5
          style={{
            marginTop:'15px',
        marginRight:'20px'
          }}
          >E-Way Bill :</h5>
                <TextField placeholder="Input 2" type='file'
                
              
                  
                    name="eway_bill"
                    value={formValues.eway_bill}
                    // onChange={(e) => handleFileInputChange(e, 'eway_bill')}
              
                style={{marginLeft:'8px'}}/>
                </div>
              </FormControl>
        
              {/* Input box 3 */}
              <FormControl required>
              <div style={{
          display:'flex',
          flexDirection:'row',
          marginBottom:'20px'
        }}>
           <h5
          style={{
            marginTop:'15px',
        marginRight:'20px'
          }}
          >Upload GRN :</h5>
                <TextField placeholder="Input 3" type='file'
                   name="drn"
                   value={formValues.drn}
                  //  onChange={(e) => handleFileInputChange(e, 'drn')}
                style={{marginLeft:'-5px'}}/>
                </div>
              </FormControl>
        
              {/* Input box 4 */}
              <FormControl required>
              <div style={{
          display:'flex',
          flexDirection:'row',
          marginBottom:'20px'
        }}>
           <h5
          style={{
            marginTop:'15px',
        marginRight:'20px'
          }}
          >Invoice No:</h5>
                <TextField placeholder="Invoice No"
                   name="invoice_no"
                   value={formValues.invoice_no}
                  //  onChange={(e)=>handleInputChange(e, 'invoice_no')}
                style={{marginLeft:'10px',width:'365px'}}/>
                </div>
              </FormControl>
        
        
              {/* Input box 5 */}
              <FormControl required>
              <div style={{
          display:'flex',
          flexDirection:'row',
          marginBottom:'20px'
        }}>
           <h5
          style={{
        
            marginTop:'15px',
        marginRight:'20px'
          }}
          >Invoice Date:</h5>
                <TextField placeholder="Input 5" type='date'
                   name="invoice_date"
                   value={formValues.invoice_date }
                   onChange={(e)=>handleInputChange(e, 'invoice_date')}
                style={{marginLeft:'-5px',width:'365px'}}/>
                </div>
              </FormControl>
              <Button type="submit" variant="contained" color="primary" style={{marginLeft:'40%',width:'150px'}}>
                Submit
              </Button>
            </form>
            </DialogContent>
      </Dialog>
        )}  
        </TableContainer>
       
        </Card>
        </>
        {/* footer */}
        <Footer/>
    </div>
  )
}
