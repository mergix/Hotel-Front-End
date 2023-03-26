import { AppBar, Button, Toolbar, Typography,Box } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useStateContext from '../useStateContext'
import { FaHotel } from 'react-icons/fa';
import { grey} from '@mui/material/colors';

export default function Navbar() {

    const{resetContext} = useStateContext()
    const navigate = useNavigate()

    const logout = () =>{
        resetContext()
        navigate("/")
    }
    const toRoom = () =>{
      navigate("/room")
  }
  const toBookingList = () =>{
    navigate("/booklist")
}
const login = () =>{
  navigate("/login")
}
const home = () =>{
  navigate("/")
}
const register = () =>{
  navigate("/register")
}
  return (
    <>
    <AppBar  sx={{position : 'fixed' ,height: '80px'}}>
        <Toolbar sx={{width: 650, margin:'auto'}}>
        <Box sx={ { display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',paddingRight:"30px"}}>
      <FaHotel size={40} color={grey[500]} />
      <Typography
        sx={{
          ml: 1,
          color: (theme) => theme.palette.secondary.main,
          fontSize: '25px',
          fontWeight: 'bold',
        }}
        component="h3"
      >
        SH
      </Typography>
    </Box>
        <Box sx={{ flexGrow: 1, display: {flexDirection: 'row', md: 'flex' } }} >
        <Button  onClick={home} style={{marginRight: '20px'}}>Discover More</Button>
        <Button  onClick={toRoom} style={{marginRight: '20px'}}>View Rooms</Button>
        <Button  onClick={toBookingList}style={{marginRight: '20px'}}>View Your Bookings</Button>
        </Box>
        <Button onClick={login}>Login</Button>
        <Button onClick={logout}>Logout</Button>
        <Button onClick={register}>SignUp</Button>
        </Toolbar>
    </AppBar>
    <Container>
    <Outlet/>
    </Container>
    </>
  )
}
