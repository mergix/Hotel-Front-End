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
          axios.get(`https://localhost:7099/api/Booking/${context.bookId}`,{headers: {
            'Authorization': 'Bearer ' + context.jwt
          }})
          .then(res =>{
            console.log(res)
              setBook(res.data)   
              }).catch(err => console.log(err))
      },[])
    
  return (
    <>
    <Container  style={{marginTop: '100px'}}>
    <Card sx={{
      minHeight: 850,minWidth: 800, mx: 'auto', mt: 10,
  }}>

    <CardContent style={{marginLeft: 180,marginTop:70,alignItems:'center'}}>
      <Typography sx={{ fontSize: 34 }} color="text.secondary" gutterBottom>
        headers
      </Typography>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://picsum.photos/id/237/200/300"
        style={{padding:30}}
      />
      <Grid container spacing={3} sx={{padding:20}} >
      <Grid item xs container direction="column" spacing={2}>
      <Typography sx={{ fontSize: 34 }} component="div">
       Room Name : 
      </Typography>
      <Typography sx={{ mb: 1.5,fontSize: 28 }}>
        Status : 
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 28 }}>
        Cost: 
      </Typography >
      </Grid>
      <Grid item xs container direction="column" spacing={2}>
      <Typography sx={{ mb: 1.5,fontSize: 28 }}>
        Name: 
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 28 }}>
        Email: 
      </Typography >
      </Grid>
      </Grid>
      <Typography sx={{ fontSize: 28 }} >
        ------------------------------------------------------
        <br />
        last lastModified
      </Typography>
    </CardContent>
    <CardActions  style={{marginLeft: 400,marginTop:70,alignItems:'center'}}>
      <Button sx={{ fontSize: 34 }} onClick={() => {
       navigate('/');
       }}>Edit</Button>
      <Button sx={{ fontSize: 34 }} onClick={() => {
       navigate('/');
       }}>Delete</Button>
    </CardActions>
    </Card>
    </Container>
    </>
  )
}
