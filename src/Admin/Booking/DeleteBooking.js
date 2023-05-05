import React, { useState,useEffect } from 'react'
import { Typography ,Card,CardActions,CardContent,Container, Grid, Button, CardMedia, TextField} from '@mui/material'
import { useNavigate } from 'react-router'
import useStateContext from '../../useStateContext'
import axios from 'axios';
import moment from 'moment';


export default function DeleteBooking() {

  const{context,setContext,resetContext} = useStateContext()
  const [book,setBook] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`https://localhost:7099/api/Booking/${context.bookId}`,{ withCredentials: true })
    .then(res =>{
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
      return require(`../../img/EvangelionFinally.jpg`)
    } else {
      return require(`../../img/Rooms/${x}`)
    }
  }

    const done = e =>{
      e.preventDefault();
      axios.delete(`https://localhost:7099/api/Booking/${context.bookId}`,{ withCredentials: true }).then(res => {
        console.log(res)
        navigate('/bookManage')
         }).catch(err => console.log(err))
    }
  return (
    <>
    <Container  maxWidth = "xl" style={{ backgroundColor: '#433f3f' ,height: '100vh',marginBottom: '100px' ,marginTop:'200px'}}>
       <Card style={{height: '750px', width:'750px',marginLeft: 200,marginTop:50,alignItems:'center'}}>
       <CardMedia image={image(book.roomPicture)} style={{height: '230px'}}/>
       <CardContent style={{marginLeft: 10,marginTop:20,alignItems:'center'}}>
       <Typography sx={{ fontSize: 23, fontWeight:"bold",textDecoration:'underline' }} color="text.primary" gutterBottom>
        Booking :{book.bookingId}
      </Typography>
           <form noValidate autoComplete='on' onSubmit={done}>
      <Typography sx={{ fontSize: 20 }} style={{marginBottom:30}} component="div">
       Description:{book.roomName}
      </Typography>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Status:{status(book.status)}
      </Typography >

      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Cost:£{book.cost}
      </Typography >

      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
      Check-In Date:{moment(book.dateIn).format('MMMM Do YYYY, h:mm:ss a')}
      </Typography >

   <Typography sx={{ mb: 1.5,fontSize: 20 }}>
   Check-Out Date: {moment(book.dateOut).format('MMMM Do YYYY, h:mm:ss a')}
      </Typography >
      <Typography sx={{ fontSize: 24 }} style={{marginBottom:10}} component="div">
      Owner of booking:{book.firstName + " "+ book.lastName}
      </Typography>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Email:{book.userEmail}
      </Typography >

      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        Booked at : {moment(book.lastModified).format('MMMM Do YYYY, h:mm:ss a')}
      </Typography >



        <Button  type = "submit" variant='outlined' style={{marginTop:30,marginLeft:500}}>
         Delete the Booking
       </Button>
         </form>
       </CardContent>
       </Card>

    </Container>
 </>
  )
}
