import { Typography , CssBaseline,Card,CardActions,CardContent,Container, Grid, Button, CardMedia,Box} from '@mui/material'
import { height, width } from '@mui/system'
import React,{ useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext from '../useStateContext';
import { useNavigate } from 'react-router'
import { FaHotel } from 'react-icons/fa';
import { grey} from '@mui/material/colors';

export default function UserHome() {

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
 <Container maxWidth = "xl" style={{ backgroundColor: '#433f3f' ,height: '100vh',marginBottom: '100px' ,marginTop:'100px' }}>
<Typography variant="h2" marginTop={10} gutterBottom>
        Ismail Fagbenro
</Typography>
<Typography variant='h6' gutterBottom>
      I am the Created this App
</Typography>
<Typography variant='body1' gutterBottom>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc mattis enim ut tellus. Ultrices dui sapien eget mi proin. Sed elementum tempus egestas sed sed risus pretium. Mattis pellentesque id nibh
</Typography>
 </Container>
</section>

<footer style={{ padding: '50px' ,  }}>

  Ismail Fagbenro Made this 🙂
</footer>




</>

  )
}
