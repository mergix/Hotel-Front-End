import { Typography , CssBaseline,Card,CardActions,CardContent,Container, Grid, Button, CardMedia} from '@mui/material'
import { height, width } from '@mui/system'
import React,{ useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext from '../useStateContext';
import { useNavigate } from 'react-router'
export default function AdminHome() {


  const{context,setContext,resetContext} = useStateContext()
  const navigate = useNavigate()
  const [room,setRoom] = useState([])

  useEffect(() => {
      createAPIEndpoint(ENDPOINTS.room)
      .fetch()
      .then(res =>{
          setRoom(res.data)   
          }).catch(err => console.log(err))
  },[])




  return (
    <>

    <section >
     <Container maxWidth = "xl" style={{ backgroundColor: '#433f3f' ,height: '30vh',marginBottom: '100px' }}>
    <Typography variant="h2" marginTop={10} gutterBottom>
            This is the Adminstative Side for the management of the Hotel Spectrum
    </Typography>
    <Typography variant='h6' gutterBottom>
          You can view the buttons for management below
    </Typography>
     </Container>
    <div style = {{margin: 'auto',justify:'center'}}>
     <Button variant="contained">Users</Button>
     <Button variant="contained">Bookings</Button>
     <Button variant="contained">Rooms</Button>
    </div>
    </section>
    
    <footer style={{ padding: '50px' }}>
    
      Ismail Fagbenro Made this 🙂
    </footer>
    
    
    
    
    </>
  )
}
