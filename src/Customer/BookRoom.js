import React, { useState,useEffect } from 'react'
import useForm from '../useForm'
import { Typography ,Card,CardActions,CardContent,Container, Grid, Button, CardMedia, TextField,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,CardHeader} from '@mui/material'
import { useNavigate } from 'react-router'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import useStateContext from '../useStateContext';
import axios from 'axios';


export default function BookRoom() {

  const{context,setContext,resetContext} = useStateContext()
  const [room,setRoom] = useState([])
  const [open, setOpen] = React.useState(false);
const [oneRoom,setOneRoom] = useState([])

const[dateIn,setDateIn] = useState(new Date())
const[dateOut,setDateOut] = useState(new Date())




const navigate = useNavigate()


useEffect(() => {
  axios.get(`https://localhost:7099/api/Room/${context.roomId}`)
  .then(res =>{
      setOneRoom(res.data) 
      }).catch(err => console.log(err))
},[])

  const book = e =>{
    e.preventDefault();
      console.log(dateOut)
      axios.post(`https://localhost:7099/api/Booking`,{userId:context.userId,roomId:context.roomId,dateIn:dateIn,dateOut:dateOut}).then(res => {
      console.log(res)
      navigate('/booklist')
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
 
   <Container  maxWidth = "xl" style={{ backgroundColor: '#433f3f' ,height: '100vh',marginBottom: '100px' ,marginTop:300}}>
      <Grid container spacing={20} justify = "center">
    <Grid item>
      <Card sx={{
      minHeight: 850,minWidth: 800, mx: 'auto', mt: 0,marginLeft:15
  }}>
      <CardMedia image="https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg" style={{height: '100px', width:'100%'}}/>
      <CardContent >
          <Typography>
         Please confirm your details  
          </Typography>
          <form noValidate autoComplete='on' onSubmit={book}>
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
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
  
              {room.map(p => (
        <Card sx={{
           minWidth: 250, mx: 'auto', mt: 10,
           '& .MuiCardHeader-action': { m: 0, alignSelf: 'center',paddingTop:100 }
       }} key={p.userId}>
           <CardHeader
               title = {p.roomName}
               key={p.userId}
           />
           <CardContent>
               <Typography variant='h6' key={p.userId}>
               {category(p.categoryType)}
               </Typography>
               {/* <img src={book.roomPicture}/> */}
               <div key={p.userId}> {p.cost}</div>
               <div key={p.userId}> {status(p.status)}</div>
               <div key={p.userId}> {p.lastModified}</div>
           </CardContent>
           <CardActions>
             <Button  onClick={() => {
              setContext({roomId: p.roomId});
             handleClose();
            }}>Pick</Button>
           </CardActions>
       </Card>
       ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
 <DesktopDatePicker
    label="Start Date"
    id='dateIn'
    renderInput={(params) => {
      return <TextField {...params} />;
    }}
    onChange={setDateIn}
    value={dateIn}
  />

  <DesktopDatePicker
    label="End Date"
    id='dateOut'
    renderInput={(params) => <TextField {...params} />}
    onChange={setDateOut}
    value={dateOut}
  />
       <Button  type = "submit">
        Confirm the Booking
      </Button>
        </form>

      </CardContent>
      </Card>
    </Grid>
  </Grid>
   </Container>
    <footer style={{ padding: '50px' ,  }}>

  Ismail Fagbenro Made this 🙂
</footer>
</>
  )
}
