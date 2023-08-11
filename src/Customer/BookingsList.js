import { Card, CardContent, CardHeader, Typography,ToggleButton,ToggleButtonGroup,Grid,CardActions,Button, Container, Alert, AlertTitle } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useStateContext from '../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios';
import moment from 'moment';


export default function BookingsList() {

  const [book,setBook] = useState([])
  const [past,setPast] = useState([])
  const{context,setContext,resetContext} = useStateContext()
  const [alignment, setAlignment] = React.useState('Current Bookings');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const navigate = useNavigate()

  useEffect(() => {
      axios.get(`https://localhost:7099/userlist/${context.currentUserId}`,{ withCredentials: true })
      .then(res =>{
        if (res.data == "No cookie") {
          setContext({token: false})
          navigate("/")
        } else {
          setBook(res.data.result)
        }
          }).catch(err => console.log(err))
  },[])

  useEffect(() => {
    axios.get(`https://localhost:7099/userlist/past/${context.currentUserId}`,{ withCredentials: true })
    .then(res =>{
      if (res.data == "No cookie") {
      } else {
        setPast(res.data.result)
      }
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
               title = {'Your Booking'}
           />
           <CardContent>
               <Typography variant='h6'>
               Person that booked:{p.user.firstName}
               </Typography>
               {/* <img src={book.roomPicture}/> */}
               <div> Cost : £{p.room.cost}</div>
               <div> Type : {category(p.room.categoryType)}</div>
               <div> Check-In Date: {moment(p.dateIn).format('LL')}</div>
               <div> Check-Out Date :{moment(p.dateOut).format('LL')}</div>
               <div> Booking made at :{ moment(p.lastModified).format('LLL')}</div>
           </CardContent>
           <CardActions>
             <Button variant='contained' onClick={() => {setContext({bookId: p.bookingId});
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
               title = {'Your Booking'}
           />
           <CardContent>
               <Typography variant='h6'>
               Person that booked:{p.user.firstName}
               </Typography>
               <div> Cost : £{p.room.cost}</div>
               <div> Type : {category(p.room.categoryType)}</div>
               <div> Check-In Date: {moment(p.dateIn).format('LL')}</div>
               <div> Check-Out Date :{moment(p.dateOut).format('LL')}</div>
               <div> Booking made at :{ moment(p.lastModified).format('LLL')}</div>
           </CardContent>
           <CardActions>
             <Button variant='contained' onClick={() => {setContext({bookId: p.bookingId});
            navigate('/rebook');
            }}>Rebook</Button>
           </CardActions>
       </Card>
       ))
    }}

 function booklist(){
  if(context.currentUserId == 0){
    return <div style={{marginTop:'140px',height:'80vh'}}><Alert severity="info">
<AlertTitle>Something Went wrong</AlertTitle>
    You have not Logged In  — <strong>Please Login before you can view your bookings</strong>
</Alert></div>
 }
 else if (book.length == 0 && past.length == 0){
  return <div style={{marginTop:'140px'}}><Alert severity="info">
  <AlertTitle>You dont Have Bookings</AlertTitle>
     You can check our rooms available and book from there — 😁
  </Alert></div>
 }
 else{
  return<>
  <Container  style={{
    marginTop: '120px',
    backgroundColor: '#5E5C5C',
    padding: '20px',
    paddingBottom:'60px'
    }}>
<ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton sx={{color:'#F5F5F5'}} value="Current Bookings">Current Bookings</ToggleButton>
      <ToggleButton value="Past Booking" sx={{color:'#F5F5F5'}}>Past Booking</ToggleButton>
    </ToggleButtonGroup>

{CurrentPast()}
   </Container>
  </>
 }
 }
return (
<>
{booklist()}
    </>
)
}
