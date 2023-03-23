import { Card,Typography,CardActions,CardContent,Button,TextField } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState,useEffect } from 'react'
import useStateContext from '../../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios';

export default function DeleteUser() {
  const navigate = useNavigate()
    const{context,setContext,resetContext} = useStateContext()
    const [user,setUser] = useState([])

    useEffect(() => {
      axios.get(`https://localhost:7099/api/User/${context.userId}`,{headers: {
        'Authorization': 'Bearer ' + context.jwt
      }})
      .then(res =>{
          setUser(res.data)   
          }).catch(err => console.log(err))
  },[])

  const del = e =>{
    e.preventDefault();
      axios.delete(`https://localhost:7099/api/User/${context.userId}`).then(res => {
      console.log(res)
      navigate('/booklist')
       }).catch(err => console.log(err))
  }
  return (
     <>
    <Container  style={{marginTop: '100px'}}>
    <Card sx={{
      minHeight: 600,minWidth: 650, mx: 'auto', mt: 10,
  }}>
    <CardContent style={{marginLeft: 400,marginTop:70,alignItems:'center'}}>
      <Typography sx={{ fontSize: 34 }} color="text.secondary" gutterBottom>
        This is the details of the user you are about to delete{user.firstName}
      </Typography>
      
      <TextField
          disabled
          id="outlined-disabled"
          label="First Name"
          defaultValue={`${user.firstName}`}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Last Name"
          defaultValue="user name"
        />
      <TextField
          disabled
          id="outlined-disabled"
          label="Disabled"
          defaultValue="email"
        />
      <Typography sx={{ fontSize: 34 }} >
        ------------
        <br />
        last lastModified
      </Typography>
    </CardContent>
    <form noValidate autoComplete='on' onSubmit={del}>
    <CardActions  style={{marginLeft: 400,marginTop:70,alignItems:'center'}}>
      <Button sx={{ fontSize: 34 }} type= "submit">Delete</Button>
       
    </CardActions>
    </form>
    </Card>
    </Container>
    </>
  )
}
