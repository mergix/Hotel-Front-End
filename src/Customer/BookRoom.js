import React, { useState,useEffect } from 'react'
import useForm from '../useForm'
import { Typography ,Card,CardActions,CardContent,Container, Grid,Box,Stack ,Button, CardMedia, TextField,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,CardHeader} from '@mui/material'
import { useNavigate } from 'react-router'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import useStateContext from '../useStateContext';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';

export default function BookRoom() {

  const{context,setContext,resetContext} = useStateContext()
  const [room,setRoom] = useState([])
  const [open, setOpen] = React.useState(false);
const [oneRoom,setOneRoom] = useState([])
const [cUser, setcUser] = useState([])

const[dateIn,setDateIn] = useState(new Date())
const[dateOut,setDateOut] = useState(new Date())




const navigate = useNavigate()


useEffect(() => {
  axios.get(`https://localhost:7099/api/Room/${context.roomId}`,{ withCredentials: true })
  .then(res =>{
      setOneRoom(res.data)
      console.log(res.data)  
      }).catch(err => console.log(err))
},[])

useEffect(() => {
  axios.get(`https://localhost:7099/api/User/${context.currentUserId}`,{ withCredentials: true })
  .then(res =>{
      setcUser(res.data)
      }).catch(err => console.log(err))
},[])

  const book = e =>{
    e.preventDefault();
      axios.post(`https://localhost:7099/api/Booking`,{dateIn:dateIn,dateOut:dateOut,userId:context.currentUserId,roomId:context.roomId},{ withCredentials: true }).then(res => {
      console.log(res)
      navigate('/booklist')
       }).catch(err => console.log(err))
  }
  const handleClickOpen = () => {
    setOpen(true);
    axios.get(`https://localhost:7099/api/Room`,{ withCredentials: true })
  .then(res =>{
      setRoom(res.data.result)   
      }).catch(err => console.log(err))
  };
  
  const handleClose = () => {
    setOpen(false);
    axios.get(`https://localhost:7099/api/Room/${context.roomId}`,{ withCredentials: true })
    .then(res =>{
        setOneRoom(res.data)
        console.log(res.data)  
        }).catch(err => console.log(err))
  };

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

  function image(x) {
    if (x === undefined) {
      return require(`../img/EvangelionFinally.jpg`)
    } else {
      return require(`../img/Rooms/${x}`)
    }
  }




  return (
    <>
 
   <Container  maxWidth = "xl" style={{ backgroundColor: '#433f3f' ,height: '130vh',marginBottom: '100px' ,marginTop:300}}>
      <Grid container spacing={20} justify = "center">
    <Grid item>
      <form noValidate autoComplete='on' onSubmit={book}>
      <Card sx={{
      minHeight: 800,minWidth: 800, mx: 'auto', mt: 0,marginLeft:10
  }}>
    <CardMedia image={image(oneRoom.roomPicture)} style={{height: '190px'}}/> 
         <CardContent >
          <Typography>
         Please confirm your details  
          </Typography>
        <Box sx={{ml:1,padding:4}}>
      <Grid container spacing={2} >
      <Grid item >
      <Stack spacing={1} direction="column" sx={{minWidth:400}}>
      <Typography sx={{ fontSize: 18 }} style={{marginBottom:2}}>
       Room Name:{oneRoom.roomName}
      </Typography>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Status:{status(oneRoom.status)}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Cost:{oneRoom.cost}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Type:{category(oneRoom.categoryType)}
      </Typography >
      <Button variant="outlined" onClick={handleClickOpen}>
        Select Room
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Pick a Room"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
             Please pick a room you wish to book 

             <Grid container spacing={3} >
            {room.map(p => (
              <Grid item >
      <Card sx={{ minWidth: 500 }}>
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
        alt={p.roomPicture.slice(0,-4)}
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
      <Button  onClick={() => {
              setContext({roomId: p.roomId});
             handleClose();
             console.log(oneRoom.roomPicture);
            }}>Choose</Button>
      </CardActions>
      </Card>
      </Grid>
     ))}
     </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      </Stack>
      </Grid>

      <Grid item>
      <Stack spacing={2} direction="column">
      <Stack item>
      <Typography sx={{ fontSize: 20 }} style={{marginBottom:30}} component="div">
       Name: {cUser.firstName + "  "+ cUser.lastName}
      </Typography>
      </Stack>
      <Stack item>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Email:{cUser.userEmail}
      </Typography >
      </Stack>
      </Stack>
      </Grid>
      </Grid>
      </Box>
        <Box sx={{ml:15,padding:2,mt: 5 }}>
      <Grid container spacing={5}>
      <Grid item  sx={{mr:15}}>
  <DesktopDatePicker
     label="Start Date"
     id='dateIn'
     renderInput={(params) => {
       return <TextField {...params} />;
     }}
     value={dateIn}
     onChange={setDateIn}
   />
</Grid>
<Grid item >
   <DesktopDatePicker
     label="End Date"
     value={dateOut}
     id='dateOut'
     renderInput={(params) => <TextField {...params} />}
     onChange={setDateOut}
     sx = {{ml: 20}}
   />
   </Grid>
   </Grid>
   </Box>
   <Button  type = "submit" variant='outlined' style={{marginTop:90,marginLeft:800}}>
         Confirm the Booking
       </Button>

      </CardContent>
      </Card>
        </form>
    </Grid>
  </Grid>
   </Container>
    <footer style={{ padding: '50px' ,  }}>

  Ismail Fagbenro Made this 🙂
</footer>
</>
  )
}
