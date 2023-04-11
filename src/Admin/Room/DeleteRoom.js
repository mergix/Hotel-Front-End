import { Card,Typography,CardActions,CardContent,Button,TextField,CardMedia } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState,useEffect } from 'react'
import useStateContext from '../../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios'
import useForm from '../../useForm';

export default function DeleteRoom() {

    const navigate = useNavigate()
    const{context,setContext,resetContext} = useStateContext()
    const [room,setRoom] = useState([])

    useEffect(() => {
      axios.get(`https://localhost:7099/api/Room/${context.roomId}`,{headers: {
        'Authorization': 'Bearer ' + context.jwt
      }})
      .then(res =>{
          setRoom(res.data)   
          }).catch(err => console.log(err))
  },[])
  const del = e =>{
    e.preventDefault();
   axios.delete(`https://localhost:7099/api/Room/${context.roomId}`).then(res => {
    console.log(res.data)
    navigate('/roomManage')
   }).catch(err => console.log(err))
}

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
      height: '600px',
      width: '700px',
       mx: 'auto',
        mt: 10,
  }}>
     <CardMedia
        component="img"
        alt="green iguana"
        height="160"
        image={image(room.roomPicture)}
      />
    <CardContent style={{marginLeft: '50px',marginTop:'30px',alignItems:'center'}}>
      <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
        This is the room you want to delete
      </Typography>
      <Typography sx={{ fontSize: '20px' }} component="div">
       Room Name: {room.roomName}
      </Typography>
      <Typography sx={{ mb: 1.5,fontSize: '20px' }}>
      Status: {status(room.status)}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: '20px' }}>
        Cost: £{room.cost}
      </Typography >
      <Typography sx={{ fontSize: '20px' }} >
        ------------
        <br />
        Last Modified: {room.lastModified}
      </Typography>
    </CardContent>
    <form noValidate autoComplete='on' onSubmit={del}>
    <CardActions  style={{marginLeft: '500px',marginTop:70,alignItems:'center'}}>
      <Button sx={{ fontSize: '20px' }} type='sumbit'>Delete</Button>
    </CardActions>
    </form>
    </Card>
    </Container>
    </>
  )
}
