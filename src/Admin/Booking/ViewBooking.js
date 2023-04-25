import { Card,Typography,CardActions,CardContent,Button,CardMedia,Grid } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState,useEffect } from 'react'
import useStateContext from '../../useStateContext';
import axios from 'axios';
import { useNavigate } from 'react-router'

export default function ViewBooking() {

  const navigate = useNavigate()
  const{context,setContext,resetContext} = useStateContext()
  const [book,setBook] = useState([])
    useEffect(() => {
        axios.get(`https://localhost:7099/api/Booking/${context.bookId}`,{ withCredentials: true })
        .then(res =>{
            setBook(res.data.result)
            console.log(res.data)
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
        return require(`../../img/EvangelionFinally.jpg`)
      } else {
        return require(`../../img/Rooms/${x}`)
      }
    }
  
  return (
    <>
    <Container  style={{marginTop: '150px'}}>
    <Card sx={{
      height: '650px',
      width: '900px',
      mx: 'auto',
      mt: 5, 
  }}>

    <CardContent style={{marginLeft: '30px',marginTop:'30px',alignItems:'center'}}>
      <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
        Booking
      </Typography>
      <CardMedia image={image(book.roomPicture)} style={{height: '190px',padding:'10px'}}/>
      <Grid container spacing={3} sx={{mt:'20px',ml:'5px'}} style={{
        borderBottom: '5px solid #ddd',
        }}>
      <Grid item xs container direction="column" spacing={2}>
      <Typography sx={{ fontSize: 18 }} component="div">
       Room Description:{book.roomName}
      </Typography>
      <Typography sx={{ mb: 1.5,fontSize: 18 }}>
        Status:{status(book.status)}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 18 }}>
        Cost:{book.cost}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 18 }}>
        Type:{category(book.categoryType)}
      </Typography >
      </Grid>
      <Grid item xs container direction="column" spacing={2} style={{
        borderLeft: '5px solid #ddd',
        }}>
      <Typography sx={{ mb: 1.5,fontSize: 18 }}>
        Customer Name:{book.firstName}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 18 }}>
        Email: {book.userEmail}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
      Check-In Date: {book.dateIn}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
      Check-Out Date: {book.dateOut}
      </Typography >
      </Grid>
      </Grid>
      <Typography sx={{ fontSize: 18,ml:'5px' }} >
        Last Modified:{book.lastModified}
      </Typography>
    </CardContent>
    <CardActions  style={{marginLeft: 700,marginTop:'20px',alignItems:'center'}}>
      <Button sx={{ fontSize: 20 }} onClick={() => {
        setContext({bookId: book.bookingId});
       navigate('/bookEdit');
       }}>Edit</Button>
      <Button sx={{ fontSize: 20 }} onClick={() => {
        setContext({bookId: book.bookingId});
       navigate('/bookDelete');
       }}>Delete</Button>
    </CardActions>
    </Card>
    </Container>
    </>
  )
}
