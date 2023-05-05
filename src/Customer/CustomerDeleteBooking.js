import React, { useState,useEffect } from 'react'
import useForm from '../useForm'
import { Typography ,Card,CardActions,CardContent,Container, Grid, Button, CardMedia, TextField,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions} from '@mui/material'
import { useNavigate } from 'react-router'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import useStateContext from '../useStateContext'
import axios from 'axios';
import moment from 'moment';

export default function CustomerDeleteBooking() {

    const{context,setContext,resetContext} = useStateContext()
    const [book,setBook] = useState([])
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    useEffect(() => {
      axios.get(`https://localhost:7099/api/Booking/${context.bookId}`,{ withCredentials: true })
      .then(res =>{
        if (res.data == "No cookie") {
          setContext({token: false})
          navigate("/")
        }
          setBook(res.data.result)
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
        return require(`../img/EvangelionFinally.jpg`)
      } else {
        return require(`../img/Rooms/${x}`)
      }
    }
  


      function done2(){
        axios.delete(`https://localhost:7099/api/Booking/${context.bookId}`,{ withCredentials: true }).then(res => {
          if (res.data == "No cookie") {
            setContext({token: false})
            navigate("/")
          }
          console.log(res)
          navigate('/booklist')
           }).catch(err => console.log(err))
      }
  return (
    <>
    <Container  style={{ backgroundColor: '#433f3f' ,height: '100vh',marginBottom: '100px' ,marginTop:'200px',padding:'10px'}}>
       <Card style={{height: '750px', width:'750px',marginLeft: 200,marginTop:50,alignItems:'center'}}>
       <CardMedia image={image(book.roomPicture)} style={{height: '190px'}}/>
       <CardContent style={{marginLeft: 10,marginTop:40,alignItems:'center'}}>
       <Typography sx={{fontSize:"23px", fontWeight:"bold",marginLeft:'50px',textDecoration:'underline'}}>
         This is the details of the booking you want to delete 
          </Typography>
           <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Type:{category(book.categoryType)}
      </Typography >
      <Typography sx={{ fontSize: 20 }} style={{marginBottom:2}} component="div">
      Description:{book.roomName}
      </Typography>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Status:{status(book.status)}
      </Typography >
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Cost:{book.roomName}
      </Typography >

      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Check-In Date: {moment(book.dateIn).format('LL')}
      </Typography >

   <Typography sx={{ mb: 1.5,fontSize: 20 }}>
      Check-Out Date: {moment(book.dateOut).format('LL')}
      </Typography >
      <Typography sx={{ fontSize: 24 }} style={{marginBottom:10}} component="div">
      Owner of booking:{book.firstName}
      </Typography>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Email:{book.userEmail}
      </Typography >

      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Booked at : {moment(book.lastModified).format('LLL')}
      </Typography >



        <Button   variant='outlined' style={{marginTop:30,marginLeft:500}} onClick={() => {
       handleClickOpen()
       }}>
         Delete the Booking
       </Button>
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
Are you sure you want to Delete this booking?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type = "submit" onClick={() => {
       done2()
       }}>Delete</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  
       </CardContent>
       </Card>

    </Container>
 </>
  )
}
