import React, { useState,useEffect } from 'react'
import useForm from '../../useForm'
import { createAPIEndpoint, ENDPOINTS } from '../../api'
import { Typography ,Card,CardActions,CardContent,Container,Stack,Box, Grid, Button, CardMedia, TextField,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,CardHeader} from '@mui/material'
import { useNavigate } from 'react-router'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import useStateContext from '../../useStateContext'
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
export default function EditBooking() {


  const{context,setContext,resetContext} = useStateContext()
  const [book,setBook] = useState([])

const[dateIn,setDateIn] = useState(new Date())
const[dateOut,setDateOut] = useState(new Date())

const [room,setRoom] = useState([])

const [open, setOpen] = React.useState(false);
const [oneRoom,setOneRoom] = useState([])


const getFreshModel = () =>({
  dateIn: null,
  dateOut:null
}) 

const{
  values,
  setValues,
  errors,
  setErrors,
  handleInputChange
} = useForm(getFreshModel);
const navigate = useNavigate()


useEffect(() => {
  axios.get(`https://localhost:7099/api/Booking/${context.bookId}`,{headers: {
    'Authorization': 'Bearer ' + context.jwt
  }})
  .then(res =>{
      setBook(res.data)
      setOneRoom(res.data)
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

function image(x) {
  if (x === undefined) {
    return require(`../../img/EvangelionFinally.jpg`)
  } else {
    return require(`../../img/Rooms/${x}`)
  }
}

  const done = e =>{
    e.preventDefault();
      console.log(values)
      axios.put(`https://localhost:7099/api/Booking/${context.bookId}`,{bookingId:context.bookId,userId:context.userId,roomId:oneRoom.roomId,dateIn: dateIn,dateOut:dateOut}).then(res => {
      console.log(res)
      navigate('/bookManage')
       }).catch(err => console.log(err))
  }

  const handleClickOpen = () => {
    setOpen(true);
    axios.get(`https://localhost:7099/api/Room`,{headers: {
    'Authorization': 'Bearer ' + context.jwt
  }})
  .then(res =>{
      setRoom(res.data)   
      }).catch(err => console.log(err))
  };
  
  const handleClose = () => {
    setOpen(false);
    axios.get(`https://localhost:7099/api/Room/${context.roomId}`,{headers: {
      'Authorization': 'Bearer ' + context.jwt
    }})
    .then(res =>{
        setOneRoom(res.data)
        console.log(res.data)  
        }).catch(err => console.log(err))
  };



  return (
    <>
    <Container  maxWidth = "xl" style={{ backgroundColor: '#433f3f' ,height: '100vh',marginBottom: '100px' ,marginTop:'200px'}}>
      
     
       <Card style={{height: '900px', width:'900px',marginLeft: 100,marginTop:50,alignItems:'center'}}>
       <CardMedia image={image(book.roomPicture)} style={{height: '190px'}}/>
       <CardContent style={{marginLeft: 10,marginTop:40,alignItems:'center'}}>
           <Typography sx={{ fontSize: 22 }} style={{marginLeft:130,marginBottom:30}}>
          This is the booking you want to edit 
           </Typography>
           <form noValidate autoComplete='on' onSubmit={done}>
 
      <Grid container spacing={1} >
      <Grid item >
      <Stack spacing={1} direction="column" sx={{maxWidth:400}}>
      <Typography sx={{ fontSize: 20 }} component="div">
       Room Name:{oneRoom.roomName}
      </Typography>
      
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Status:{status(oneRoom.status)}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Status:{category(oneRoom.categoryType)}
      </Typography >
      
      
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Cost:£{oneRoom.cost}
      </Typography >
      </Stack>
      </Grid>
      <Grid item >
      <Stack spacing={1} direction="column" sx={{minWidth:400}}>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Customer Name:{book.firstName}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Email: {book.userEmail}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        datein: {book.dateIn}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        dateout: {book.dateOut}
      </Typography >
      </Stack>
      </Grid>
      </Grid>
     

      
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
        image={require(`../../img/Rooms/${p.roomPicture}`)}
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

        <Box sx={{ml:15,padding:2,mt: 5 }}></Box>
      <Grid container spacing={5}>
      <Grid item xs={'auto'}>
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
   <Grid item xs={'auto'}>
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

        <Button  type = "submit" variant='outlined' style={{marginTop:100,marginLeft:200}}>
         Confirm Changes
       </Button>
         </form>
       </CardContent>
       </Card>
    
    </Container>
     <footer style={{ padding: '50px' ,  }}>
 
   Ismail Fagbenro Made this 🙂
 </footer>
 </>
  )
}
