import { Card,Typography,CardActions,CardContent,Button,CardMedia,Alert,AlertTitle,Collapse } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState,useEffect } from 'react'
import useStateContext from '../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios';
import IconButton from '@mui/material/IconButton';

export default function UserViewRoom() {
    const navigate = useNavigate()
    const{context,setContext,resetContext} = useStateContext()
    const [room,setRoom] = useState([])
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
      axios.get(`https://localhost:7099/api/Room/${context.roomId}`,{ withCredentials: true })
      .then(res =>{
        if (res.data == "No cookie") {
          setContext({token: false})
          navigate("/")
        }
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  function image(x) {
    if (x === undefined) {
      return require(`../img/EvangelionFinally.jpg`)
    } else {
      return require(`../img/Rooms/${x}`)
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
        image={image(room.roomPicture)}
      />
    <CardContent style={{marginLeft: 100,marginTop:70,alignItems:'center'}}>
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
      <Collapse in={open}>
      <Alert severity="info" action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <IconButton fontSize="inherit" />
            </IconButton>
          }>
      <AlertTitle>Something Went wrong</AlertTitle>
          You have not Logged In  — <strong>Please Login before booking a room</strong>
      </Alert>
      </Collapse>
    </CardContent>
    <CardActions  style={{marginLeft: 550,marginTop:70,alignItems:'center'}}>
      <Button sx={{ fontSize: 34 }} onClick={() => {
        if (context.currentUserId == 0) {
          setOpen(true) 
        }else{
       navigate('/book')}
       }}>Book</Button>
    </CardActions>
    </Card>
    </Container>
    </>
  )
}
