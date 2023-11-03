import React, { useEffect, useState } from 'react'
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
import './index.css'
import VerifiedIcon from '@mui/icons-material/Verified';
//   import { HelperText } from '@mui/material';

 import { Label } from '@mui/icons-material';
import { useAuthContext } from './AuthProvider';
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
  const [grandTotal1,setGrandTotal1]=useState('')
  const [grandTotal2,setGrandTotal2]=useState('')
  const [grandTotal3,setGrandTotal3]=useState('')
  
  const [conditionInput,setConditionInput]=useState('')
  // const [grandTotalArray, setGrandTotalArray] = useState([]); 
  const [formValues, setFormValues] = useState({
    invoice: '',
    eway_bill: '',
    drn: '',
    invoice_no: '',
    invoice_date: '',
  });
    
  const { orderUrl, setOrderUrl, purchaseData, setPurchaseData } = useAuthContext();
console.log(lineItem)
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
          setConditionInput(parsedData[0].line_items[0].outstandingQuantity)
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


  const handleSubmit = async (e) => {
    e.preventDefault();
  console.log(1)
    // Your API URL
    const apiUrl = 'https://vms.glenindia.com/api/delivery/';
  
    try {
      // Create a FormData object to collect form data
      const formData = new FormData();
  
      // Add input values to the FormData object
      formData.append('invoice', formValues.invoice);
      formData.append('eway_bill', formValues.eway_bill);
      formData.append('drn', formValues.drn);
      formData.append('invoice_no', formValues.invoice_no);
      formData.append('invoice_date', formValues.invoice_date); // Correct this line
  console.log(2)
      // Make a POST request to the API
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('API response:', data);
 
    } catch (error) {
      // Handle the error here
      console.error('API request error:', error);
    }
  };
// 1
const handleChange=(e)=>{
const newValue=e.target.value;
if(Number(newValue)<=conditionInput){
setInputValue(newValue)
setGrandTotal1 ( lineItem.reduce((accumulator, item) => {
  const productPrice = item.product_price;
  const total = productPrice * inputValue;
  const gst = (total * 18) / 100;
  return accumulator + (total + gst);
}, 0))
}
else{
  alert('Input must be less than pending qty')
}
}
// 2
const handleChange2=(e)=>{
  const newValue=e.target.value;
if(Number(newValue)<=conditionInput){

setInputValue2(newValue)
setGrandTotal2( lineItem.reduce((accumulator, item) => {
  const productPrice = item.product_price;
  const total = productPrice * inputValue2;
  const gst = (total * 18) / 100;
  return accumulator + (total + gst);
}, 0))
}
else{
  alert('Input must be less than pending qty')
}
}
// 3
const handleChange3=(e)=>{
  const newValue=e.target.value;
if(Number(newValue)<=conditionInput){

setInputValue3(newValue)
setGrandTotal3( lineItem.reduce((accumulator, item) => {
  const productPrice = item.product_price;
  const total = productPrice * inputValue3;
  const gst = (total * 18) / 100;
  return accumulator + (total + gst);
}, 0))
}
else{
  alert('Input must be less than pending qty')
}
}

// Calculate the grand total for input value 1


// Calculate the grand total for input value 2


// Calculate the grand total for input value 3


// Set the grand total states
// setGrandTotal1(grandTotal1.toFixed(2));
// setGrandTotal2(grandTotal2.toFixed(2));
// setGrandTotal3(grandTotal3.toFixed(2));


const updateConditionInput=(item)=>{
setConditionInput(item)
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues)
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
                     const productPrice = item.product_price;
                     const quantity = item.quantity;
                     const total = productPrice * inputValue;
                     const gst = (total * 18) / 100;
                     const grandTotal=total+gst;
                    //  const updatedGrandTotalArray = [...grandTotalArray];
                    //  updatedGrandTotalArray[index] = grandTotal;
                    //  setGrandTotalArray(updatedGrandTotalArray);
        
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
            value={inputValue}
            onChange={handleChange}
          
            />
                      {/* {item.outstandingQuantity} */}
                     </TableCell>
                     <TableCell component="th" scope="row">
                     {/* { item.total_price} */}
                     {grandTotal.toFixed(2)}
                     </TableCell>
</>
                  )
                }))}
                </TableRow>

                {/* 2 */}
                <TableRow>

{lineItem.length>0&&(lineItem.map((item,index)=>{
     const productPrice = item.product_price;
     const quantity = item.quantity;
     const total = productPrice * inputValue2;
     const gst = (total * 18) / 100;
     const grandTotal2=total+gst
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
value={inputValue2}
onChange={handleChange2}

/>
      {/* {item.outstandingQuantity} */}
     </TableCell>
     <TableCell component="th" scope="row">
     {/* { item.total_price} */}
     {grandTotal2.toFixed(2)}
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
value={inputValue3}
onChange={handleChange3}

/>
      {/* {item.outstandingQuantity} */}
     </TableCell>
     <TableCell component="th" scope="row">
     {/* { item.total_price} */}
     {grandTotal3.toFixed(2)}
     </TableCell>
</>
  )
}))}
</TableRow>
<h5>Total of GrandTotals: {(grandTotal1) + (grandTotal2) + (grandTotal3)}</h5>

               </> 
               
        </TableBody>
        </Table>

{/* form  */}
<Button
          // variant="contained"
          // color="primary"
          style={{
            marginBottom:'25px',marginLeft:'40%',marginTop:'25px'
          }}
          onClick={toggleFormVisibility}
        >
          {isFormVisible ? 'Hide Form' : 'Show Form'}
        </Button>

        {isFormVisible && (
        <form onSubmit={handleSubmit} style={{ marginTop: '25px', marginBottom: '25px',display:'flex',
        flexDirection:"column" ,width:'40%,',marginLeft:'25%'}}>
              {/* Input box 1 */}
              <FormControl required>
        <div style={{
          display:'flex',
          flexDirection:'row',
          marginBottom:'20px'
        }}>
          <p
          style={{
            marginTop:'15px',
        marginRight:'20px',
        
          }}
          >invoice:</p>
                <TextField 
                    name="invoice"
                    value={formValues.invoice}
                    onChange={handleInputChange}
                   
                placeholder="Input 1" type='file' style={{marginLeft:'30px'}}/>
                </div>
              </FormControl>
        
              {/* Input box 2 */}
              <FormControl required>
              <div style={{
          display:'flex',
          flexDirection:'row',
          marginBottom:'20px'
        }}>
           <p
          style={{
            marginTop:'15px',
        marginRight:'20px'
          }}
          >E-Way Bill</p>
                <TextField placeholder="Input 2" type='file'
                    name="eway_bill"
                    value={formValues.eway_bill}
                    onChange={handleInputChange}
              
                style={{marginLeft:'12px'}}/>
                </div>
              </FormControl>
        
              {/* Input box 3 */}
              <FormControl required>
              <div style={{
          display:'flex',
          flexDirection:'row',
          marginBottom:'20px'
        }}>
           <p
          style={{
            marginTop:'15px',
        marginRight:'20px'
          }}
          >Upload GRN</p>
                <TextField placeholder="Input 3" type='file'
                   name="drn"
                   value={formValues.drn}
                   onChange={handleInputChange}
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
           <p
          style={{
            marginTop:'15px',
        marginRight:'20px'
          }}
          >invoice no:</p>
                <TextField placeholder="Input 4"
                   name="invoice_no"
                   value={formValues.invoice_no}
                   onChange={handleInputChange}
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
           <p
          style={{
        
            marginTop:'15px',
        marginRight:'20px'
          }}
          >invoice Date:</p>
                <TextField placeholder="Input 5" type='date'
                   name="invoice_date"
                   value={formValues.invoice_date }
                   onChange={handleInputChange}
                style={{marginLeft:'0px',width:'365px'}}/>
                </div>
              </FormControl>
        
        
              <Button type="submit" variant="contained" color="primary" style={{marginLeft:'25%',width:'150px'}}>
                Submit
              </Button>
            </form>
        )}


       
        </TableContainer>
       
        </Card>
        </>
    </div>
  )
}
