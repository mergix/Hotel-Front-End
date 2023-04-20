import { Card,Typography,CardActions,CardContent,Button,CardMedia,Grid } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState,useEffect } from 'react'
import useStateContext from '../useStateContext';
import axios from 'axios';
import { useNavigate } from 'react-router'

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
      minHeight: 850,minWidth: 800, mx: 'auto', mt: 5,
  }}>

    <CardContent style={{marginLeft: 80,marginTop:70,alignItems:'center'}}>
      <Typography sx={{ fontSize: 34 }} color="text.secondary" gutterBottom>
        headers
      </Typography>
      <CardMedia image={image(book.roomPicture)} style={{height: '190px',padding:"50px"}}/>
      <Grid container spacing={3} sx={{padding:5}} >
      <Grid item xs container direction="column" spacing={2}>
      <Typography sx={{ mb: 1.5, fontSize: 20 }} component="div">
       Room Name : {book.roomName}
      </Typography>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Status : {status(book.status)}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Cost: {book.cost}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Type: {category(book.categoryType)}
      </Typography >
      </Grid>
      <Grid item xs container direction="column" spacing={2}>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Name: {book.firstName + " "+ book.lastName}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Email: {book.userEmail}
      </Typography >
      </Grid>
      </Grid>
      <Typography sx={{ fontSize: 20 }} >
        ------------------------------------------------------
        <br />
        Last Modified:{book.lastModified}
      </Typography>
    </CardContent>
    <CardActions  style={{marginLeft: 400,marginTop:70,alignItems:'center'}}>
      <Button sx={{ fontSize: 24 }} onClick={() => {
        setContext({bookId: book.bookingId});
       navigate('/editBooking');
       }}>Edit</Button>
      <Button sx={{ fontSize: 24 }} onClick={() => {
       navigate('/deleteBooking');
       }}>Delete</Button>
    </CardActions>
    </Card>
    </Container>
    </>
  )
}
