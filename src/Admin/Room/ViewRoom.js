import { Card,Typography,CardActions,CardContent,Button,CardMedia } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState,useEffect } from 'react'
import useStateContext from '../../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios';
import moment from 'moment';


export default function ViewRoom() {

  const [room,setRoom] = useState([])
    const navigate = useNavigate()
    const{context,setContext,resetContext} = useStateContext()
  

    useEffect(() => {
      axios.get(`https://localhost:7099/api/Room/${context.roomId}`,{ withCredentials: true })
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
    if(x === undefined || x === ''){
     return require(`../../img/EvangelionFinally.jpg`)
    }
    else{ return require(`../../img/Rooms/${x}`)}
  }
  return (
    <>
    <Container  style={{marginTop: '150px'}}>
    <Card sx={{
      height: '690px',
      width: '740px',
       mx: 'auto',
        mt: 10,
  }}>
     <CardMedia
        component="img"
        alt={room.roomPicture}
        height="230"
        image={image(room.roomPicture)}
      />
    <CardContent style={{
      marginLeft: '50px',
      marginTop:'10px',
      alignItems:'center',
      padding: '10px',
      }}>
      <Typography sx={{ fontSize: '25px' }} color="text.primary" gutterBottom>
        Room Details
      </Typography>
      <Typography sx={{ fontSize: '20px' ,paddingBottom:"10px"}} component="div">
       Description: {room.roomName}
      </Typography>
      <Typography sx={{ fontSize: '20px' }} component="div">
       Room Type: {category(room.categoryType)}
      </Typography>
      <Typography sx={{ mb: 1.5,fontSize: '20px' }}>
        Status:{status(room.status)}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: '20px' }}>
        Cost:£{room.cost}
      </Typography >
      <Typography sx={{ fontSize: '20px' }} >
        ------------
        <br />
        Last Modified: {moment(room.lastModified).format('MMMM Do YYYY, h:mm:ss a')}
      </Typography>
    </CardContent>
    <CardActions  style={{marginLeft: '500px',marginTop:30,alignItems:'center'}}>
      <Button variant='outlined' sx={{ fontSize: '20px' }} onClick={() => {
      setContext({roomId: room.roomId});
       navigate('/roomEdit');
       }}>Edit</Button>
      <Button variant='outlined'sx={{ fontSize: '20px' }} onClick={() => {
      setContext({roomId: room.roomId});
       navigate('/roomDelete');
       }}>Delete</Button>
    </CardActions>
    </Card>
    </Container>
    </>
  )
}
