import { AppBar, Button, Toolbar, Typography,Box, Grid } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useStateContext from '../useStateContext'
import { FaHotel } from 'react-icons/fa';
import { grey} from '@mui/material/colors';

export default function Navbar() {

    const{context,resetContext} = useStateContext()
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

function LoginButtons(){
  if (context.currentUserId == 0) {
    return <Grid container spacing={1}>
    <Grid item  sx={{mr:0}}>
    <Button onClick={login}>Login</Button>
    </Grid>
    <Grid item  sx={{mr:0}}>
    <Button onClick={register}>SignUp</Button>
    </Grid>
    </Grid>
  } else {
    return <Button onClick={logout}>Logout</Button>
    
  }
}
  return (
    <>
    <AppBar  sx={{position : 'fixed' ,height: '80px' ,backgroundColor:'#DEDEDE'}}>
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
        <Button  onClick={toRoom} style={{marginRight: '20px'}}>Rooms</Button>
        <Button  onClick={toBookingList}style={{marginRight: '20px'}}>View Your Bookings</Button>
        </Box>
        {LoginButtons()}
        </Toolbar>
    </AppBar>
    <Container>
    <Outlet/>
    </Container>
    </>
  )
}
