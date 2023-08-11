import { Typography , CssBaseline,Card,CardActions,CardContent,Container, Grid, Button, CardMedia,Box,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material'
import React,{ useEffect, useState } from 'react'
import useStateContext from '../useStateContext';
import { useNavigate } from 'react-router'
import { FaHotel } from 'react-icons/fa';
import useAuth from '../useAuth'
import { grey} from '@mui/material/colors';

export default function UserHome() {

  const{context,setContext,resetContext} = useStateContext()
  const navigate = useNavigate()
  const [room,setRoom] = useState([])
  const {auth,setAuth} = useAuth();

  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false);
  };


  const alertCookie = () =>{
	if (context.token == false) {
		setOpen(true)
	}
	else{
		console.log('No problem')
	}
  }


  useEffect(()=>{
	console.log(auth.token)
}, [])

  return (
    <>


<Container id="banner">
			<div id="banner-2">

				<h1>Welcome to Spectrum Hotel</h1>
				<p>Stay with us today!</p>
				<a href="#part-1" class="button">Explore</a>
			</div>

			<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your current session has expired please login again"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Login</Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
		</Container>

    <section id="part-1">
		<div class="-a">
			<p>
				Register With us to get started  
			</p> 

		</div>
		<div class="-b" >
			<p>
				Browse Our Rooms to see luxury that awaits you 
			</p> 
		</div>
		<div class="-c">
			<p>
				Login so you always keep your progress
			</p>
		</div>
	</section>
</>

  )
}
