import { Card,Typography,CardActions,CardContent,Button,CardMedia } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState,useEffect } from 'react'
import useStateContext from '../../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios';


export default function ViewRoom() {

  const [room,setRoom] = useState([])
    const navigate = useNavigate()
    const{context,setContext,resetContext} = useStateContext()
  

    useEffect(() => {
      axios.get(`https://localhost:7099/api/Room/${context.roomId}`)
      .then(res =>{
          setRoom(res.data) 
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
  function isAdmin(p){
    switch (p) {
      case 1:
        return "Customer"
        case 2:
          return "Admin"
      default:
        return "no value"
    }
  }

  function image(x){
    if(x === undefined){
     return require(`../../img/EvangelionFinally.jpg`)
    }
    else{ return require(`../../img/Rooms/${x}`)}
  }
  return (
    <>
    <Container  style={{marginTop: '150px'}}>
    <Card sx={{
      minHeight: 600,minWidth: 650, mx: 'auto', mt: 10,
  }}>
     <CardMedia
        component="img"
        alt={room.roomPicture}
        height="194"
        image={image(room.roomPicture)}
      />
    <CardContent style={{marginLeft: 300,marginTop:70,alignItems:'center'}}>
      <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
        Room Details
      </Typography>
      <Typography sx={{ fontSize: '19pt' }} component="div">
       Room Name: {room.roomName}
      </Typography>
      <Typography sx={{ fontSize: '19pt' }} component="div">
       Room Type: {category(room.categoryType)}
      </Typography>
      <Typography sx={{ mb: 1.5,fontSize: '19pt' }}>
        Status:{status(room.status)}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: '19pt' }}>
        Cost:£{room.cost}
      </Typography >
      <Typography sx={{ fontSize: '19pt' }} >
        ------------
        <br />
        Last Modified: {room.lastModified}
      </Typography>
    </CardContent>
    <CardActions  style={{marginLeft: 400,marginTop:70,alignItems:'center'}}>
      <Button sx={{ fontSize: '19pt' }} onClick={() => {
      setContext({roomId: room.roomId});
       navigate('/roomEdit');
       }}>Edit</Button>
      <Button sx={{ fontSize: '19pt' }} onClick={() => {
      setContext({roomId: room.roomId});
       navigate('/roomDelete');
       }}>Delete</Button>
    </CardActions>
    </Card>
    </Container>
    </>
  )
}
