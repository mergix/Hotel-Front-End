import { Card, CardContent, CardHeader, Typography,Grid, Container,CardActions,Button,CardMedia,Alert,AlertTitle,Dialog,DialogTitle,Stack,DialogActions,DialogContent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react'
import useStateContext from '../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios';

export default function Room() {

    const{context,setContext,resetContext} = useStateContext()
    const navigate = useNavigate()


    const [room,setRoom] = useState([])
    let [test,setTest] = useState([])
    const [noCookie,setnoCookie] = useState("")
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    useEffect(() => {
      axios.get(`https://localhost:7099/api/Room`,{ withCredentials: true }).then(res =>{
              setRoom(res.data.result)
              setTest(res.data.result)
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

        function singleFilter(){
          let single = room.filter(x => x.categoryType == 1)
          setTest(single)
        }
        function doubleFilter(){
          let double = room.filter(x => x.categoryType == 2)
          console.log(double)
          setTest(double)
      
        }
        function deluxeFilter(){
          let deluxe = room.filter(x => x.categoryType == 3)
          console.log(deluxe)
          setTest(deluxe)
        }
        function presidentialFilter(){
          let president = room.filter(x => x.categoryType == 4)
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

        function costfilter500(){
          let aStatus = room.filter(x => x.cost <= 500)
          setTest(aStatus)
        }

        function costfilter1000(){
          let aStatus = room.filter(x => x.cost >= 1000)
          setTest(aStatus)
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


<Grid direction={'column'}   container spacing={1} sx={{
      marginTop: '40px',
      marginBottom: '50px',
      padding:'10px',
      }}>
            <Grid item >
  <Typography style={{fontSize:'30px',fontWeight:"bold",textDecoration:'underline'}}> All the Rooms</Typography>
            </Grid>
            <Grid item >
  <Button variant="contained" onClick={handleClickOpen} sx={{color: (theme) => theme.palette.text.secondary,background:'#2998cf'}}>
        Filter the list
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Filter the rooms "}
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
      <Button variant="contained" onClick={costfilter500}>Rooms 500 and under</Button>
      <Button variant="contained" onClick={costfilter1000}>Rooms 1000 and more</Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog> 
      </Grid>
      </Grid>
<Grid container spacing={5}  direction="row" justify = "center" style={{
  backgroundColor : '#5E5C5C',
  padding: '5px',
  paddingBottom:'60px',
  marginBottom: '100px'
}}>
{test.map(p => (
  <Grid item >
<Card style={{ 
  width: '505px',
  height:'405px',
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
      </>
  )
}
