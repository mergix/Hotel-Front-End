import { Card,Typography,CardActions,CardContent,Button,CardMedia } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState,useEffect } from 'react'
import useStateContext from '../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios';

export default function UserViewRoom() {
    const navigate = useNavigate()
    const{context,setContext,resetContext} = useStateContext()
    const [room,setRoom] = useState([])

    useEffect(() => {
      axios.get(`https://localhost:7099/api/Room/${context.roomId}`)
      .then(res =>{
          setRoom(res.data) 
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
  return (
    <>
    <Container  style={{marginTop: '140px'}}>
    <Card sx={{
      minHeight: 600,minWidth: 650, mx: 'auto', mt: 10,
  }}>
     <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://picsum.photos/id/237/200/300"
      />
    <CardContent style={{marginLeft: 300,marginTop:70,alignItems:'center'}}>
      <Typography sx={{ mb: 1.5,fontSize: 22 }} component="div">
       Type: {category(room.categoryType)}
      </Typography>
      <Typography sx={{ mb: 1.5,fontSize: 22 }} color="text.secondary" gutterBottom>
        Description:{room.roomName}
        </Typography>
      <Typography sx={{ mb: 1.5,fontSize: 22 }}>
        Status:{status(room.status)}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 22 }}>
        Cost:£{room.cost}
      </Typography >
      <Typography sx={{ fontSize: 22 }} >
        ------------
        <br />
      Last Modified : {room.lastModified}
      </Typography>
    </CardContent>
    <CardActions  style={{marginLeft: 800,marginTop:70,alignItems:'center'}}>
      <Button sx={{ fontSize: 34 }} onClick={() => {
       navigate('/book');
       }}>Book</Button>
    </CardActions>
    </Card>
    </Container>
    </>
  )
}
