import { AppBar, Button, Toolbar, Typography,Box } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useStateContext from '../useStateContext'

export default function NavbarAdmin() {

    const{resetContext} = useStateContext()
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
  return (
    <>
     <AppBar  sx={{position : 'fixed' ,height: '120px'}}>
        <Toolbar sx={{width: 650, margin:'auto'}}>
        <Typography  align='left' style={{fontSize:18,marginRight:'50px'}}>
            Hotel Spectrum Admin Side
        </Typography>
        <Box sx={{ flexGrow: 1, display: {flexDirection: 'row', md: 'flex' },ml: 10 }} >
        <Button onClick={navigateRoom}  style={{marginRight: '20px'}}>Manage Rooms</Button>
        <Button  onClick={navigateUser} style={{marginRight: '20px'}}>Manage Users</Button>
        <Button onClick={navigateBooking} style={{marginRight: '20px'}}>Manage Bookings</Button>
        </Box>
        <Button onClick={login}style={{marginLeft: '300px'}}>Login</Button>
        <Button onClick={logout}>Logout</Button>
        </Toolbar>
    </AppBar>
    <Container>
    <Outlet/>
    </Container>
    </>
  )
}
