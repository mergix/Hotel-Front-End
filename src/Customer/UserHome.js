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

<Container id="banner">
			<div id="banner-2">

				<h1>Landing Page</h1>
				<p>Test Text Lorem ipsum dolor sit amet.</p>
				<a href="#" class="button">Explore</a>
			</div>
		</Container>

    <section class="part-1">
		<div class="-a">
			<p>
				Look at API Section
			</p> 
			<a href="first.html" >Explore</a>
		</div>
		<div class="-b">
			<p>
				About
			</p> 
			<a href="#" >Explore</a>
		</div>
		<div class="-c">
			<p>
				Look at Project Section
			</p>
			<a href="#" >Explore</a>
		</div>
	</section>

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
