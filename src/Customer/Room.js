import { Card, CardContent, CardHeader, Typography,Grid, Container,CardActions,Button,CardMedia,Alert,AlertTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react'
import useStateContext from '../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios';

export default function Room() {

    const{context,setContext,resetContext} = useStateContext()
    const navigate = useNavigate()


    const [room,setRoom] = useState([])
    const [noCookie,setnoCookie] = useState("")

    useEffect(() => {
      axios.get(`https://localhost:7099/api/Room`,{ withCredentials: true }).then(res =>{
            if (res.data == "No cookie") {
              setContext({token: false})
              resetContext();
              navigate("/")
            } else {
              setRoom(res.data.result)
            }
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


  function disable(p){
    if (p.status == 0) {
    return <Button variant='contained' onClick={() => {setContext({roomId: p.roomId});
    navigate('/userViewRoom');
    }}>View</Button>
    } else if(p.status == 1) {
     return <Button variant='contained' disabled onClick={() => {setContext({roomId: p.roomId});
    navigate('/userViewRoom');
    }}>View</Button>
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
        function statusUI(p){
          switch (p) {
            case 0:
              return <Typography variant="body2" color="#2e7d32">
              Status :Available
             </Typography>
              case 1:
                return <Typography variant="body2" color="#d32f2f">
                Status : Booked
               </Typography>
            default:
              return "no value gg"
          }
        }
        
  function booklist(){
    if(context.currentUserId == 0){
      return <div style={{marginTop:'140px'}}><Alert severity="info">
  <AlertTitle>Something Went wrong</AlertTitle>
      You have not Logged In  — <strong>Please Login before you can view your bookings</strong>
  </Alert></div>
   }

   }
  return (
<>
<Container style={{marginTop: '20vh'}}>

  <Typography> All the Rooms</Typography>
<Grid container spacing={5}  direction="row" justify = "center" style={{
  backgroundColor : '#5E5C5C',
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
    <IconButton aria-label="settings" sx={{color:"text.primary"}}>
      Price: £{p.cost}
    </IconButton>
  }
  title= {category(p.categoryType)}
  color="text.primary"
/>
<CardMedia
  component="img"
  height="194"
  image={require(`../img/Rooms/${p.roomPicture}`)}
  alt="Paella dish"
/>
<CardContent>
  <Typography variant="body2" color="text.primary">
   Description:{p.roomName}
  </Typography>
  {statusUI(p.status)}
</CardContent>
<CardActions disableSpacing>
{disable(p)}
</CardActions>
</Card>
</Grid>
     ))}
  </Grid>

</Container>
<footer class="footer">
			<p>
			Ismail Fagbenro
			</p>
			<p>
				These are My links to contact me.
			</p>
			<div class="social">
				<a href="first.html" ><i class="fa-brands fa-github fa-2xl"></i></a>
				<a href="first.html" class="first"><i class="fa-brands fa-linkedin-in fa-2xl"></i></a>
			</div>
			<p>
				Email
			</p>

			<p>
				Mobile
			</p>
	</footer>
      </>
  )
}
