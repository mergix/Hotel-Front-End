import React, { useState,useEffect } from 'react'
import useForm from '../useForm'
import { Typography ,Card,CardActions,CardContent,Container, Grid,Box,Stack ,Button, CardMedia, TextField,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,CardHeader,Collapse,Alert,AlertTitle} from '@mui/material'
import { useNavigate } from 'react-router'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import useStateContext from '../useStateContext';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';

export default function BookRoom() {

  const{context,setContext,resetContext} = useStateContext()
  const [room,setRoom] = useState([])
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
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
      setcUser(res.data.result)
      }).catch(err => console.log(err))
},[])

  const book = e =>{
    e.preventDefault();
    console.log(dateOut)
    if ( dateOut  < Date.now()) {
      setOpen2(true)
    } else{
      axios.post(`https://localhost:7099/api/Booking`,{dateIn:dateIn,dateOut:dateOut,userId:context.currentUserId,roomId:context.roomId},{ withCredentials: true }).then(res => {
      console.log(res)
      navigate('/booklist')
       }).catch(err => console.log(err))
    }

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
 
   <Container  style={{ backgroundColor: '#433f3f',marginBottom: '100px' ,marginTop:'150px',padding: '30px'}}>

      <form noValidate autoComplete='on' onSubmit={book}>
      <Card sx={{
      height: '800px',width: '870px',marginLeft:'80px'
  }}>
    <CardMedia component="img" image={image(oneRoom.roomPicture)} style={{backgroundSize:"cover",height:'200px'}}/> 
         <CardContent >
          <Typography sx={{fontSize:"23px", fontWeight:"bold",marginLeft:'50px',textDecoration:'underline'}}>
         Please Select a room to book as well as Your desired dates  
          </Typography>
        <Box sx={{ml:0,padding:4}}>
      <Grid container spacing={5} >
      <Grid item >
      <Stack spacing={1} direction="column" sx={{width:'400px'}}>
      <Typography sx={{ mb: 1.7,fontSize: 20 }}>
        Type:{category(oneRoom.categoryType)}
      </Typography >
      <Typography sx={{ fontSize: 18 }} style={{marginBottom:2}}>
       Description:{oneRoom.roomName}
      </Typography>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Status:{status(oneRoom.status)}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Cost:{oneRoom.cost}
      </Typography >
      <Button variant="contained" onClick={handleClickOpen}>
        Select Room
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{backgroundColor:"#DEDEDE"}}>
          {"Pick a Room"}
        </DialogTitle>
        <DialogContent sx={{backgroundColor:"background.default"}}>
          <DialogContentText id="alert-dialog-description">
             <Grid container spacing={3} >
            {room.map(p => (
              <Grid item >
      <Card style={{ 
  width: '505px',
  height:'390px'
  }}>
      <CardHeader
        action={
          <IconButton aria-label="settings" sx={{color:"text.primary"}}>
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
        <Typography variant="body2" color="text.primary">
         Description:{p.roomName}
        </Typography>
        <Typography variant="body2" color="text.primary">
         Status :{status(p.status)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <Button variant="contained"  onClick={() => {
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
        <DialogActions sx={{backgroundColor:"#DEDEDE"}}>
          <Button onClick={handleClose}>Close</Button>
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
        <Box sx={{ml:10,padding:2,mt: 0 }}>
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
   <Collapse in={open2}>
    <Alert  style={{paddingTop:"10px",marginTop:'15px'}} severity="info" action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen2(false);
              }}
            >
              <IconButton fontSize="inherit" />
            </IconButton>
          }>
<AlertTitle>Something Went wrong</AlertTitle>
 <strong>Your check-out date cannot be the same or be less than the current date </strong>
</Alert>
</Collapse>
   </Box>
   <Button  type = "submit" variant='contained' style={{marginTop:30,marginLeft:'580px'}}>
         Confirm the Booking
       </Button>

      </CardContent>
      </Card>
        </form>

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
