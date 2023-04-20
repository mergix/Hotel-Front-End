import { Card,Typography,CardActions,CardContent,Button } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState,useEffect } from 'react'
import useStateContext from '../../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios';


export default function ViewUser() {
  const navigate = useNavigate()
    const{context,setContext,resetContext} = useStateContext()
    const [user,setUser] = useState([])

    useEffect(() => {
      axios.get(`https://localhost:7099/api/User/${context.userId}`,{ withCredentials: true })
      .then(res =>{
          setUser(res.data.result)
          console.log(res)   
          }).catch(err => console.log(err))
  },[])
  return (
    <>
    <Container  style={{marginTop: '100px'}}>
    <Card sx={{
      minHeight: 600,minWidth: 650, mx: 'auto', mt: 10,
  }} >
    <CardContent style={{marginLeft: 250,marginTop:70,alignItems:'center'}}>
      <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
        Header
      </Typography>
      <Typography sx={{ fontSize: 34 }} component="div">
       Name: {user.firstName + ' '+ user.lastName}
       <br/>
       <br/> 
      </Typography> 
      <Typography sx={{ mb: 1.5,fontSize: 34 }}>
       Email: { user.userEmail}
      </Typography >
      <Typography sx={{ fontSize: 34 }} >
        ------------
        <br />
        Last Modified: {user.lastModified}
      </Typography>
    </CardContent>
    <CardActions  style={{marginLeft: 400,marginTop:70,alignItems:'center'}}>
      <Button sx={{ fontSize: 34 }} onClick={() => {
        setContext({userId: user.userId});
       navigate('/deleteUser');
       }}>Delete</Button>
    </CardActions>
    </Card>
    </Container>
    </>
  )
}
