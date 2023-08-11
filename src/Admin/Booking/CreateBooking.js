import React, { useState, useEffect } from 'react'
import useForm from '../../useForm'
import {
  Typography, Card, CardHeader, CardActions, CardContent, Stack,
  Container, Grid, Button, CardMedia, TextField, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions, Box,Collapse,Alert,AlertTitle
} from '@mui/material'
import { useNavigate } from 'react-router'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import useStateContext from '../../useStateContext'
import axios from 'axios';
import IconButton from '@mui/material/IconButton';

export default function CreateBooking() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const {context, setContext, resetContext } = useStateContext()
  const [room, setRoom] = useState([])
  const [cUser, setcUser] = useState([])
  let [oneRoom, setOneRoom] = useState([])
  const [dateIn, setDateIn] = useState(new Date())
  const [dateOut, setDateOut] = useState(new Date())

  function image(x) {
    if (x === undefined) {
      return require(`../../img/EvangelionFinally.jpg`)
    } else {
      return require(`../../img/Rooms/${x}`)
    }
  }

  function category(p) {
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

  function status(p) {
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
    axios.get(`https://localhost:7099/api/Room`,{ withCredentials: true })
      .then(res => {
        setRoom(res.data.result)
      }).catch(err => console.log(err))
  };

  const handleClose = () => {
    setOpen(false);
    axios.get(`https://localhost:7099/api/Room/${context.roomId}`,{ withCredentials: true })
      .then(res => {
        setOneRoom(res.data)
        console.log(res.data)
        console.log(oneRoom)
      }).catch(err => console.log(err))
  };

  const getFreshModel = () => ({
    dateIn: null,
    dateOut: null
  })

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange
  } = useForm(getFreshModel);

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`https://localhost:7099/api/Room`,{ withCredentials: true })
      .then(res => {
        setRoom(res.data.result)
      }).catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get(`https://localhost:7099/api/User/${context.currentUserId}`,{ withCredentials: true })
      .then(res => {
        setcUser(res.data.result)
      }).catch(err => console.log(err))
  }, [])

  const book = e => {
    e.preventDefault();
    console.log(values)
    if ( dateOut  < Date.now()) {
      setOpen2(true)
    }else{
      axios.post(`https://localhost:7099/api/Booking`,{
        userId: context.currentUserId,
        roomId: context.roomId,
        dateIn: dateIn,
        dateOut: dateOut
      },{ withCredentials: true }).then(res => {
        console.log(res)
        navigate('/bookManage')
      }).catch(err => console.log(err))

    }
  }
  return (
    <>
    <Container  style={{ backgroundColor: '#433f3f',marginBottom: '100px' ,marginTop:'140px',padding:'20px'}}>
       <Card style={{height: '820px', width:'870px',marginLeft: '80px'}}>
       <CardMedia image={image(oneRoom.roomPicture)} style={{height: '230px'}}/>
       <CardContent style={{marginLeft: 0,marginTop:20,alignItems:'center'}}>
       <Typography sx={{fontSize:"23px", fontWeight:"bold",marginLeft:'30px',textDecoration:'underline'}}>
         Please Select a room to book as well as Your desired dates  
          </Typography>
    <form noValidate autoComplete='on' onSubmit={book}>

     <Box sx={{ml:0,padding:4}}>
      <Grid container spacing={2} >
      <Grid item >
      <Stack spacing={1} direction="column" sx={{width:400}}>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Type:{category(oneRoom.categoryType)}
      </Typography >
      <Typography sx={{ fontSize: 20 }} style={{marginBottom:2}}>
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
        <DialogContent sx={{backgroundColor:"background.default",padding:'50px'}}>
          <DialogContentText id="alert-dialog-description" sx={{marginTop:'60px'}}>
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
        <Typography variant="body2" color="text.primary">
         Description:{p.roomName}
        </Typography>
        <Typography variant="body2" color="text.primary">
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
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      </Stack>
      </Grid>

      <Grid item>
      <Stack spacing={2} direction="column">
      <Stack item>
      <Typography sx={{ fontSize: 20 }} style={{marginBottom:30}}>
       Name: {cUser.firstName + "  "+ cUser.lastName}
      </Typography>
      </Stack>
      <Stack item>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Email:{cUser.firstName}
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
       return <TextField {...params} 
       InputLabelProps={{style: { color: '#25383C' }}}/>;
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
     renderInput={(params) => <TextField {...params}
     InputLabelProps={{style: { color: '#25383C' }}} />}
     onChange={setDateOut}
     sx = {{ml: 20}}
   />
   </Grid>
   </Grid>
   <Collapse in={open2}>
    <Alert  style={{paddingTop:"10px",marginTop:'15px'}} severity="error" action={
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
        <Button  type = "submit" variant='contained' style={{marginTop:'5px',marginLeft:'580px'}}>
         Confirm the Booking
       </Button>
         </form>
       </CardContent>
       </Card>
    </Container>
 </>
  )
}
