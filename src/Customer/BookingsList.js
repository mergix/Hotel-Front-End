import { Card, CardContent, CardHeader, Typography,Grid,CardActions,Button, Container, Alert, AlertTitle } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useStateContext from '../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios';
import IconButton from '@mui/material/IconButton';


export default function BookingsList() {

  const [book,setBook] = useState([])
  const{context,setContext,resetContext} = useStateContext()
  const navigate = useNavigate()
  console.log(context.jwt)

  useEffect(() => {
      axios.get(`https://localhost:7099/userlist/${context.userId}`,{headers: {
        'Authorization': 'Bearer ' + context.jwt
      }})
      .then(res =>{
          setBook(res.data)   
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
 function booklist(){
  if(context.userId == 0){
    return <div style={{marginTop:'140px'}}><Alert severity="info">
<AlertTitle>Something Went wrong</AlertTitle>
    You have not Logged In  — <strong>Please Login before you can view your bookings</strong>
</Alert></div>
 }else{
  return <Container  style={{marginTop: '140px'}}>
  {book.map(p => (
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
        navigate('/userViewBook');
        }}>View</Button>
       </CardActions>
   </Card>
   ))}
   </Container>
 }
 }
return (
<>
{booklist()}
    </>
)
}
