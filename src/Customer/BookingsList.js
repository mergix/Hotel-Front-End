import { Card, CardContent, CardHeader, Typography,ToggleButton,ToggleButtonGroup,Grid,CardActions,Button, Container, Alert, AlertTitle } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useStateContext from '../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios';
import IconButton from '@mui/material/IconButton';


export default function BookingsList() {

  const [book,setBook] = useState([])
  const [past,setPast] = useState([])
  const{context,setContext,resetContext} = useStateContext()
  const [alignment, setAlignment] = React.useState('Current Bookings');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const navigate = useNavigate()
  console.log(context.jwt)

  useEffect(() => {
      axios.get(`https://localhost:7099/userlist/${context.currentUserId}`,{headers: {
        'Authorization': 'Bearer ' + context.jwt
      }})
      .then(res =>{
          setBook(res.data)   
          }).catch(err => console.log(err))
  },[])

  useEffect(() => {
    axios.get(`https://localhost:7099/userlist/past/${context.currentUserId}`,{headers: {
      'Authorization': 'Bearer ' + context.jwt
    }})
    .then(res =>{
        setPast(res.data)   
        }).catch(err => console.log(err))
},[])

  function category(p){
    switch (p) {
      case 1:
        return "Single Room"
        case 2:
          return "Double Room"
        case 3:
          return "Deluxe Room"
        case 4:
          return "Presidential Suite"
      default:
        return "no value"
    }
  }

  function CurrentPast(){
    if(alignment == "Current Bookings") {
      return   book.map(p => (
        <Card sx={{
           width: 650, mx: 'auto', mt: 10,
           '& .MuiCardHeader-action': { m: 0, alignSelf: 'center',paddingTop:100 }
       }} key= {p.bookingId}>
           <CardHeader
               title = {'booking placeholder'}
           />
           <CardContent>
               <Typography variant='h6'>
               Person that booked:{p.user.firstName}
               </Typography>
               {/* <img src={book.roomPicture}/> */}
               <div> Cost : £{p.room.cost}</div>
               <div> Type : {category(p.room.categoryType)}</div>
               <div> From: {p.dateIn}</div>
               <div> To :{p.dateOut}</div>
               <div> Booking made at :{p.lastModified}</div>
           </CardContent>
           <CardActions>
             <Button  onClick={() => {setContext({bookId: p.bookingId});
            navigate('/userViewBook');
            }}>View</Button>
           </CardActions>
       </Card>
       ))
    } else {
       return past.map(p => (
        <Card sx={{
           maxWidth: 650, mx: 'auto', mt: 10,
           '& .MuiCardHeader-action': { m: 0, alignSelf: 'center',paddingTop:100 }
       }} key= {p.bookingId}>
           <CardHeader
               title = {'booking placeholder'}
           />
           <CardContent>
               <Typography variant='h6'>
               Person that booked:{p.user.firstName}
               </Typography>
               {/* <img src={book.roomPicture}/> */}
               <div> Cost : £{p.room.cost}</div>
               <div> Type : {category(p.room.categoryType)}</div>
               <div> From: {p.dateIn}</div>
               <div> To :{p.dateOut}</div>
               <div> Booking made at :{p.lastModified}</div>
           </CardContent>
           <CardActions>
             <Button  onClick={() => {setContext({bookId: p.bookingId});
            navigate('/rebook');
            }}>Rebook</Button>
           </CardActions>
       </Card>
       ))
    }}

 function booklist(){
  if(context.currentUserId == 0){
    return <div style={{marginTop:'140px'}}><Alert severity="info">
<AlertTitle>Something Went wrong</AlertTitle>
    You have not Logged In  — <strong>Please Login before you can view your bookings</strong>
</Alert></div>
 }
 else if (book.length == 0){
  return <div style={{marginTop:'140px'}}><Alert severity="info">
  <AlertTitle>You dont Have Bookings</AlertTitle>
     You can check our rooms available and book from there — 😁
  </Alert></div>
 }
 else{
  return <Container  style={{
    marginTop: '140px',
    backgroundColor: '#2d386d',
    padding: '20px'
    }}>
<ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="Current Bookings">Current Bookings</ToggleButton>
      <ToggleButton value="Past Booking">Past Booking</ToggleButton>
    </ToggleButtonGroup>

{CurrentPast()}
   </Container>
 }
 }
return (
<>
{booklist()}
    </>
)
}
