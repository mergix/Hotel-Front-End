import { AppBar, Button, Toolbar, Typography,Box, Grid } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useStateContext from '../useStateContext'
import { BiHotel } from "react-icons/bi";
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
    return <Grid container spacing={1} sx={{paddingLeft:'100px'}}>
    <Grid item  sx={{mr:0}}>
    <Button onClick={login} sx={{color: (theme) => theme.palette.secondary.main}}>Login</Button>
    </Grid>
    <Grid item  sx={{mr:0}}>
    <Button onClick={register} sx={{color: (theme) => theme.palette.secondary.main}}>SignUp</Button>
    </Grid>
    </Grid>
  } else {
    return <Grid container spacing={1}>

      <Grid item  sx={{mr:0}}>

<Button  onClick={toBookingList}sx={{marginRight: '20px',color: (theme) => theme.palette.secondary.main}}>View Your Bookings</Button> 
  </Grid>
  <Grid item  sx={{mr:0}}>

  <Button onClick={logout} sx={{color: (theme) => theme.palette.secondary.main}} >Logout</Button>
  </Grid>
  
    </Grid>
  }
}
  return (
    <>
    <AppBar  sx={{position : 'fixed' ,height: '80px' ,backgroundColor:'#454545'}}>
        <Toolbar sx={{width: 650, margin:'auto'}}>
        <Box  onClick={home} sx={ { display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',paddingRight:"30px"}}>
      <BiHotel size={40} color={grey[500]}/>
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
        <Button  onClick={toRoom} sx={{paddingLeft: '60px',color: (theme) => theme.palette.secondary.main , whiteSpace:'nowrap'}}>View Our Rooms</Button>
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
