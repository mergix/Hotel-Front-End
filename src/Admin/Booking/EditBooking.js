import React, { useState,useEffect } from 'react'
import useForm from '../../useForm'
import { createAPIEndpoint, ENDPOINTS } from '../../api'
import { Typography ,Card,CardActions,CardContent,Container, Grid, Button, CardMedia, TextField,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,CardHeader} from '@mui/material'
import { useNavigate } from 'react-router'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import useStateContext from '../../useStateContext'
import axios from 'axios';
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


  const done = e =>{
    e.preventDefault();
      console.log(values)
      createAPIEndpoint(ENDPOINTS.booking).post({userId:context.userId,roomId:context.roomId,dateIn: dateIn,dateOut:dateOut}).then(res => {
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



  return (
    <>
    <Container  maxWidth = "xl" style={{ backgroundColor: '#433f3f' ,height: '100vh',marginBottom: '100px' ,marginTop:'200px'}}>
       <Grid container spacing={20} justify = "center">
     <Grid item>
       <Card style={{height: '700px', width:'700px',marginLeft: 200,marginTop:50,alignItems:'center'}}>
       <CardMedia image="https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg" style={{height: '150px', width:'100%'}}/>
       <CardContent style={{marginLeft: 10,marginTop:40,alignItems:'center'}}>
           <Typography sx={{ fontSize: 22 }} style={{marginLeft:130,marginBottom:30}}>
          This is the booking you want to edit 
           </Typography>
           <form noValidate autoComplete='on' onSubmit={done}>
 
      <Typography sx={{ fontSize: 20 }} style={{marginLeft:200,marginBottom:30}} component="div">
       Room Name:{book.roomName}
      </Typography>
      <Grid container spacing={2} style ={{marginLeft: 100,marginBottom:50}}>
      <Grid item xs={'auto'} style={{marginRight:110}}>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Status:{status(book.status)}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Status:{category(book.categoryType)}
      </Typography >
      </Grid>
      <Grid item xs={8}>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Cost:£{book.cost}
      </Typography >
      </Grid>
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
      </Grid>
      <Grid container spacing={2}>
      <Grid item xs={'auto'} style={{marginRight:110}}>
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
