import React, { useState,useEffect } from 'react'
import useForm from '../../useForm'
import { createAPIEndpoint, ENDPOINTS } from '../../api'
import { Typography ,Card,CardActions,CardContent,Container, Grid, Button, CardMedia, TextField} from '@mui/material'
import { useNavigate } from 'react-router'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import useStateContext from '../../useStateContext'
import axios from 'axios';

export default function DeleteBooking() {

  const{context,setContext,resetContext} = useStateContext()
  const [book,setBook] = useState([])
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
        createAPIEndpoint(ENDPOINTS.booking).delete({}).then(res => {
        console.log(res)
        navigate('/booklist')
         }).catch(err => console.log(err))
    }
  return (
    <>
    <Container  maxWidth = "xl" style={{ backgroundColor: '#433f3f' ,height: '100vh',marginBottom: '100px' ,marginTop:'200px'}}>
       <Grid container spacing={20} justify = "center">
     <Grid item>
       <Card style={{height: '750px', width:'750px',marginLeft: 200,marginTop:50,alignItems:'center'}}>
       <CardMedia image="https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg" style={{height: '100px', width:'100%'}}/>
       <CardContent style={{marginLeft: 10,marginTop:40,alignItems:'center'}}>
           <Typography sx={{ fontSize: 22 }} style={{marginLeft:130,marginBottom:30}}>
          This is the booking you want to Delete 
           </Typography>
           <form noValidate autoComplete='on' onSubmit={done}>
      <Typography sx={{ fontSize: 24 }} style={{marginLeft:200,marginBottom:30}} component="div">
       Room Name:{book.roomName}
      </Typography>
      <Grid container spacing={2} style ={{marginLeft: 100,marginBottom:50}}>
      <Grid item xs={'auto'} style={{marginRight:110}}>
      <Typography sx={{ mb: 1.5,fontSize: 34 }}>
        Status:{status(book.status)}
      </Typography >
      </Grid>
      <Grid item xs={8}>
      <Typography sx={{ mb: 1.5,fontSize: 34 }}>
        Cost:{book.roomName}
      </Typography >
      </Grid>
      </Grid>
      <Grid container spacing={2}>
      <Grid item xs={'auto'} style={{marginRight:110}}>
      <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        datein: {book.dateIn}
      </Typography >
    </Grid>
   <Grid item xs={'auto'}>
   <Typography sx={{ mb: 1.5,fontSize: 20 }}>
        dateout: {book.dateOut}
      </Typography >
   </Grid>
   </Grid>
        <Button  type = "submit" variant='outlined' style={{marginTop:100,marginLeft:200}}>
         Delete the Booking
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
