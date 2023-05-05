import { Card,Typography,CardActions,CardContent,Button,CardMedia,Grid,Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState,useEffect } from 'react'
import useStateContext from '../useStateContext';
import axios from 'axios';
import { useNavigate } from 'react-router'
import moment from 'moment';

export default function UserViewBooking() {

    const navigate = useNavigate()
    const{context,setContext,resetContext} = useStateContext()
    const [book,setBook] = useState([])
      useEffect(() => {
          axios.get(`https://localhost:7099/api/Booking/${context.bookId}`,{ withCredentials: true })
          .then(res =>{
            if (res.data == "No cookie") {
              setContext({token: false})
              navigate("/")
            }
            console.log(res)
              setBook(res.data.result)   
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
    
      function status(p){
        switch (p) {
          case 0:
            return "Available"
            case 1:
              return "Booked"
          default:
            return "no value"
        }
      }
      function image(x) {
        if (x === undefined) {
          return require(`../img/EvangelionFinally.jpg`)
        } else {
          return require(`../img/Rooms/${x}`)
        }
      }
    
  return (
    <>
    <Container  style={{marginTop: '100px'}}>
    <Card sx={{
      height: '600px',width: '900px', mx: 'auto', mt: 5,
  }}>

      <CardMedia image={image(book.roomPicture)} style={{height: '190px',padding:"50px"}}/>
    <CardContent style={{marginLeft: 5,marginTop:30,alignItems:'center'}}>
    <Typography sx={{fontSize:"23px", fontWeight:"bold",marginLeft:'50px',textDecoration:'underline'}}>
         This is your current booking details 
          </Typography>
       <Box sx={{ml:0,padding:2}}>
      <Grid container spacing={1}  >
      <Grid item>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Type: {category(book.categoryType)}
      </Typography >
      <Typography sx={{ fontSize: 20 }} >
      Description : {book.roomName}
      </Typography>
      <Typography sx={{ fontSize: 20 }}>
        Status : {status(book.status)}
      </Typography >
      <Typography sx={{ fontSize: 20 }}>
        Cost: {book.cost}
      </Typography >
      </Grid>
      <Grid item>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Name: {book.firstName + " "+ book.lastName}
      </Typography >
      <Typography sx={{fontSize: 20 }}>
        Email: {book.userEmail}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
      Check-In Date: {moment(book.dateIn).format('LL')}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
      Check-Out Date: {moment(book.dateOut).format('LL')}
      </Typography >
      </Grid>
      </Grid>
      </Box>
      <Typography sx={{ fontSize: 20,ml:'25px' }} >
        Last Modified:{ moment(book.lastModified).format('LLL')}
      </Typography>
    </CardContent>
    <CardActions  style={{marginLeft: '650px',marginTop:'10px',alignItems:'center'}}>
      <Button variant='contained' sx={{ fontSize: 18 }} onClick={() => {
        setContext({bookId: book.bookingId});
       navigate('/editBooking');
       }}>Edit</Button>
      <Button variant='contained' sx={{ fontSize: 18 }} onClick={() => {
       navigate('/deleteBooking');
       }}>Delete</Button>
    </CardActions>
    </Card>
    
    </Container>
    </>
  )
}
