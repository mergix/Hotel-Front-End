import { Card, CardContent, CardHeader, Typography,Grid, Container,CardActions,Button,CardMedia,Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext from '../useStateContext';
import { useNavigate } from 'react-router'
import { margin } from '@mui/system';

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
<Grid container spacing={5}  direction="row" justify = "center" style={{
  backgroundColor : '#fff',
  padding: '5px',
  paddingBottom:'60px',
  marginBottom: '100px'
}}>
{room.map(p => (
  <Grid item >
<Card style={{ 
  width: '505px',
  height:'405px'
  }}>
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
  image={require(`../img/Rooms/${p.roomPicture}`)}
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
