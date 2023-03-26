import { Card, CardContent, CardHeader, Typography,Grid,CardActions,Button, Container, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useStateContext from '../../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios';

export default function UserManage() {


  const [user,setUser] = useState([])
  const{context,setContext,resetContext} = useStateContext()
  const navigate = useNavigate()


  useEffect(() => {
      axios.get(`https://localhost:7099/api/User`,{headers: {
        'Authorization': 'Bearer ' + context.jwt
      }})
      .then(res =>{
          setUser(res.data)   
          }).catch(err => console.log(err))
  },[])




  return (
    <>
 <Container  style={{marginTop: '150px'}}>



 {user.map(p => (
   <Card sx={{
      maxWidth: 650, mx: 'auto', mt: 10,
  }} key = {p.userId}>
      <CardHeader
          title = {"Customer Name: "+p.firstName + "   "+ p.lastName}
      />
      <CardContent>
          <Typography variant='h6'>
              Email: {p.userEmail}
          </Typography>
          <div> Last Modifed At:{p.lastModified}</div>
      </CardContent>
      <CardActions>
        <Button  onClick={() => {setContext({userId: p.userId});
       navigate('/userView');
       }}>View</Button>
      </CardActions>
  </Card>
  ))}
  </Container>
    </>
  )
}
