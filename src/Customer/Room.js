import { Card, CardContent, CardHeader, Typography,Grid, Container,CardActions,Button,CardMedia,Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext from '../useStateContext';
import { useNavigate } from 'react-router'

export default function Room() {

    // const{context,useContext} = useStateContext()
    const{context,setContext,resetContext} = useStateContext()
    const navigate = useNavigate()

    // console.log(context);

    // const { id } = useParams
    const [room,setRoom] = useState([])

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.room)
        .fetch()
        .then(res =>{
            setRoom(res.data)   
            }).catch(err => console.log(err))
    },[])

    const book = e =>{
      e.preventDefault();
      // setContext({roomId: p.roomId})
      // console.log(userId)
      navigate('/')

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


  return (
<>
<Container style={{marginTop: '20vh'}}>

  <Typography> All the Rooms</Typography>
<Grid container spacing={5}  direction="row" justify = "center">
{room.map(p => (
  <Grid item >
<Card sx={{ minWidth: 345 }}>
<CardHeader
  action={
    <IconButton aria-label="settings">
      Price: £{p.cost}
    </IconButton>
  }
  title= {category(p.categoryType)}
/>
<CardMedia
  component="img"
  height="194"
  image="https://picsum.photos/id/237/200/300"
  alt="Paella dish"
/>
<CardContent>
  <Typography variant="body2" color="text.secondary">
   Description:{p.roomName}
  </Typography>
  <Typography variant="body2" color="text.secondary">
   Status :{status(p.status)}
  </Typography>
</CardContent>
<CardActions disableSpacing>
<Button  onClick={() => {setContext({roomId: p.roomId});
    navigate('/userViewRoom');
    }}>View</Button>
</CardActions>
</Card>
</Grid>
     ))}
  </Grid>

</Container>
      </>
  )
}
