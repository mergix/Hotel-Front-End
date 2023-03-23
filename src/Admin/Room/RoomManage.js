import { Card, CardContent, CardHeader, Typography,Grid,CardActions,Button, Container,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Stack,CardMedia} from '@mui/material';
import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import useStateContext from '../../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios';

export default function RoomManage() {


  const [open, setOpen] = React.useState(false);
 
  const [room,setRoom] = useState([])
  let [test,setTest] = useState([])
  const{context,setContext,resetContext} = useStateContext()
  const navigate = useNavigate()

  useEffect(() => {
      axios.get(`https://localhost:7099/api/Room`,{headers: {
        'Authorization': 'Bearer ' + context.jwt
      }})
      .then(res =>{
          setRoom(res.data)
          setTest(res.data) 
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


function singleFilter(){
    let single = room.filter(x => x.room.categoryType == 1)
    setTest(single)
  }
  function doubleFilter(){
    let double = room.filter(x => x.room.categoryType == 2)
    console.log(double)
    setTest(double)

  }
  function deluxeFilter(){
    let deluxe = room.filter(x => x.room.categoryType == 3)
    console.log(deluxe)
    setTest(deluxe)
  }
  function presidentialFilter(){
    let president = room.filter(x => x.room.categoryType == 4)
    console.log(president)
    setTest(president)
  }
  function noFilter(){
    let all = room
    console.log(all)
    setTest(all)
  }
  function bookedFilter(){
    let bStatus = room.filter(x => x.status == 1)
    setTest(bStatus)
  }

  function availableFilter(){
    let aStatus = room.filter(x => x.status == 0)
    setTest(aStatus)
  }

  return (
    <>
    <Container  style={{marginTop: '140px'}}>

    <Grid container spacing={3} style={{marginTop: '40px',marginBottom:"50px"}}>
    <Grid item >
    <Button variant="contained" sx ={{mx:'auto',marginLeft:'auto'}} onClick={() => {
          navigate('/roomCreate');
          }}>Create a  New Room +</Button>
          </Grid>
          <Grid item >
          <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Filter the list
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Filter By room type Or by Booked and available rooms"}
        </DialogTitle>
        <DialogContent>
        <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={singleFilter}>Single Rooms</Button>
      <Button variant="contained" onClick={doubleFilter}>Double Rooms</Button>
      <Button variant="contained" onClick={deluxeFilter}>Deluxe Rooms</Button>
      <Button variant="contained" onClick={presidentialFilter}>Presidential Suite </Button>
      <Button variant="contained" onClick={noFilter}>All Types </Button>
          </Stack>
          <br></br>
          <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={bookedFilter}>Booked Rooms</Button>
      <Button variant="contained" onClick={availableFilter}>Available Rooms</Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </Grid>
    </Grid>

    <Grid container spacing={3} >
    {test.map(p => (
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


{/* <Card sx={{ maxWidth: 345 }}>
<CardHeader
  action={
    <IconButton aria-label="settings">
      cost
    </IconButton>
  }
  title="Category Type"
  subheader="September 14, 2016"
/>
<CardMedia
  component="img"
  height="194"
  image="/static/images/cards/paella.jpg"
  alt="Paella dish"
/>
<CardContent>
  <Typography variant="body2" color="text.secondary">
    This impressive paella is a perfect party dish and a fun meal to cook
    together with your guests. Add 1 cup of frozen peas along with the mussels,
    if you like.
  </Typography>
</CardContent>
<CardActions disableSpacing>
<Button  onClick={() => {setContext({roomId: room.roomId});
    navigate('/userViewRoom');
    }}>View</Button>
</CardActions>
</Card> */}