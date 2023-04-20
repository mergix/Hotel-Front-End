import React, { useState,useEffect } from 'react'
import useForm from '../useForm'
import { Typography ,Card,CardActions,CardContent,Container, Grid, Button, CardMedia, TextField} from '@mui/material'
import { useNavigate } from 'react-router'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import useStateContext from '../useStateContext'
import axios from 'axios';

export default function CustomerDeleteBooking() {

    const{context,setContext,resetContext} = useStateContext()
    const [book,setBook] = useState([])
    const navigate = useNavigate()
  
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
  
      const done = e =>{
        e.preventDefault();
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
    <Container  maxWidth = "xl" style={{ backgroundColor: '#433f3f' ,height: '100vh',marginBottom: '100px' ,marginTop:'200px'}}>
       <Card style={{height: '750px', width:'750px',marginLeft: 200,marginTop:50,alignItems:'center'}}>
       <CardMedia image={image(book.roomPicture)} style={{height: '190px'}}/>
       <CardContent style={{marginLeft: 10,marginTop:40,alignItems:'center'}}>
           <Typography sx={{ fontSize: 22 }} style={{marginLeft:130,marginBottom:30}}>
          This is the booking you want to Delete 
           </Typography>
           <form noValidate autoComplete='on' onSubmit={done}>
      <Typography sx={{ fontSize: 24 }} style={{marginBottom:30}} component="div">
       Room Name:{book.roomName}
      </Typography>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Status:{status(book.status)}
      </Typography >

      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Cost:{book.roomName}
      </Typography >

      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        datein: {book.dateIn}
      </Typography >

   <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        dateout: {book.dateOut}
      </Typography >
      <Typography sx={{ fontSize: 24 }} style={{marginBottom:10}} component="div">
      Owner of booking:{book.firstName}
      </Typography>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Email:{book.userEmail}
      </Typography >

      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Booked at : {book.dateIn}
      </Typography >



        <Button  type = "submit" variant='outlined' style={{marginTop:30,marginLeft:500}}>
         Delete the Booking
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
