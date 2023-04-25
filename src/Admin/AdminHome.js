import { Typography , CssBaseline,Card,CardActions,CardContent,Container, Grid, Button, CardMedia,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material'
import { height, width } from '@mui/system'
import React,{ useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext from '../useStateContext';
import { useNavigate } from 'react-router'
export default function AdminHome() {


  const{context,setContext,resetContext} = useStateContext()
  const navigate = useNavigate()
  const [room,setRoom] = useState([])

  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false);
  };


  const alertCookie = () =>{
	if (context.token == false) {
		setOpen(true)
		resetContext()
	}
	else{
		console.log('No problem')
	}
  }

  useEffect(()=>{
    alertCookie()
  }, [])




  return (
    <>


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
     <Container maxWidth = "xl" style={{ backgroundColor: '#433f3f' ,height: '100vh',marginBottom: '100px' }}>
    <Typography variant="h2" marginTop={20} gutterBottom>
            This is the Adminstative Side for the management of the Hotel Spectrum
    </Typography>
    <Typography variant='h6' gutterBottom>
          You can view the buttons for management below
    </Typography>
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
