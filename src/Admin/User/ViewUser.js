import { Card,Typography,CardActions,CardContent,Button } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState,useEffect } from 'react'
import useStateContext from '../../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios';
import moment from 'moment';


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

  const del = e =>{
    e.preventDefault();
      axios.delete(`https://localhost:7099/api/User/${context.userId}`,{ withCredentials: true }).then(res => {
      console.log(res)
      navigate('/userManage')
       }).catch(err => console.log(err))
  }

  function role(p){
    switch (p) {
      case 1:
        return "Customer"
        case 2:
          return "Admin"
      default:
        return "no value"
    }
  }
  return (
    <>
    <Container  style={{marginTop: '140px'}}>
    <Card sx={{
      height: 500,width: 700, mx: 'auto', mt: 10,
  }} >
    <CardContent style={{marginLeft: 50,marginTop:70,alignItems:'center'}}>
      <Typography sx={{ fontSize: 22,fontWeight:"bold",textDecoration:'underline' }}  color="text.primary" gutterBottom>
        Role: {role(user.roleType)}
      </Typography>
      <Typography sx={{ fontSize: 22 }} component="div">
       Name: {user.firstName + ' '+ user.lastName}
       <br/>
       <br/> 
      </Typography> 
      <Typography sx={{ mb: 1.5,fontSize: 22 }}>
       Email: { user.userEmail}
      </Typography >
      <Typography sx={{ fontSize: 22 }} >
        <br />
        Last Modified: {moment(user.lastModified).format('MMMM Do YYYY, h:mm:ss a')}
      </Typography>
    </CardContent>
    <CardActions  style={{marginLeft: 500,marginTop:70,alignItems:'center'}}>
    <form noValidate autoComplete='on' onSubmit={del}>

      <Button sx={{ fontSize: 24 }}  type= "submit">Delete</Button>
    </form>
    </CardActions>
    </Card>
    </Container>
    </>
  )
}
