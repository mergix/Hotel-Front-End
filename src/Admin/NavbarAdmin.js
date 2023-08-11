import { AppBar, Button, Toolbar, Typography,Box,Grid } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { BiHotel } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import useStateContext from '../useStateContext'
import { grey, red} from '@mui/material/colors';

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

const home = () =>{
  navigate("/adminhome")
}
function LoginButtons(){
  if (context.currentUserId == 0) {
    return <Grid container spacing={1}>
    <Grid item  sx={{mr:0}}>
    <Button onClick={login}style={{marginLeft: '500px'}} sx={{color: (theme) => theme.palette.secondary.main}}>Login</Button>
    </Grid>
    </Grid>
  } else {
    return <Box sx={{ flexGrow: 1, display: {flexDirection: 'row', md: 'flex' },ml: 10 }} >
    <Button onClick={navigateRoom}  style={{marginRight: '20px'}} sx={{color: (theme) => theme.palette.secondary.main}}>Manage Rooms</Button>
    <Button  onClick={navigateUser} style={{marginRight: '20px'}} sx={{color: (theme) => theme.palette.secondary.main}}>Manage Users</Button>
    <Button onClick={navigateBooking} style={{marginRight: '20px'}} sx={{color: (theme) => theme.palette.secondary.main}}>Manage Bookings</Button>
    <Button onClick={logout} style={{marginLeft: '100px'}} sx={{color: (theme) => theme.palette.secondary.main}}>Logout</Button>
    </Box>
    
  }
}
  return (
    <>
     <AppBar  sx={{position : 'fixed' ,height: '120px',backgroundColor: '#454545'}}>
        <Toolbar sx={{width: 700, marginLeft:'250px',marginTop:'30px'}}>
        <Box  onClick={home} sx={ { display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',paddingRight:"30px"}}>
      <GrUserAdmin size={40} />
      <BiHotel size={40} color={grey[500]}/>
      <Typography
        sx={{
          ml: 1,
          color: (theme) => theme.palette.secondary.main,
          fontSize: '25px',
          fontWeight: 'bold',
          whiteSpace:'nowrap'
        }}
        component="h3"
      >
        SH Admin Side
      </Typography>
    </Box>

            {LoginButtons()}
        </Toolbar>
    </AppBar>
    <Container>
    <Outlet/>
    </Container>
    <footer class="footer">
			<p>
			Ismail Fagbenro
			</p>
			<p>
				These are My links to contact me.
			</p>
			<div class="social">
				<a href="first.html" ><i class="fa-brands fa-github fa-2xl"></i></a>
				<a href="first.html" class="first"><i class="fa-brands fa-linkedin-in fa-2xl"></i></a>
			</div>
			<p>
				Email
			</p>

			<p>
				Mobile
			</p>
	</footer>
    </>
  )
}
