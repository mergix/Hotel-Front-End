import { AppBar, Button, Toolbar, Typography,Box,Grid } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useStateContext from '../useStateContext'

export default function NavbarAdmin() {

    const{context,resetContext} = useStateContext()
    const navigate = useNavigate()

    const login = () =>{
        navigate("/adminLogin")
      }
      const logout = () =>{
        resetContext()
        navigate("/adminhome")
    }
    const navigateRoom = () =>{
      navigate("/roomManage")
  }
  const navigateBooking = () =>{
    navigate("/bookManage")
}
const navigateUser = () =>{
  navigate("/userManage")
}

function LoginButtons(){
  if (context.currentUserId == 0) {
    return <Grid container spacing={1}>
    <Grid item  sx={{mr:0}}>
    <Button onClick={login}style={{marginLeft: '300px'}}>Login</Button>
    </Grid>
    </Grid>
  } else {
    return    <Button onClick={logout} style={{marginLeft: '300px'}}>Logout</Button>
    
  }
}
  return (
    <>
     <AppBar  sx={{position : 'fixed' ,height: '120px',backgroundColor: '#2d386d'}}>
        <Toolbar sx={{width: 650, margin:'auto'}}>
        <Typography  align='left' style={{fontSize:18,marginRight:'50px'}}>
            Hotel Spectrum Admin Side
        </Typography>
        <Box sx={{ flexGrow: 1, display: {flexDirection: 'row', md: 'flex' },ml: 10 }} >
        <Button onClick={navigateRoom}  style={{marginRight: '20px'}}>Manage Rooms</Button>
        <Button  onClick={navigateUser} style={{marginRight: '20px'}}>Manage Users</Button>
        <Button onClick={navigateBooking} style={{marginRight: '20px'}}>Manage Bookings</Button>
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
