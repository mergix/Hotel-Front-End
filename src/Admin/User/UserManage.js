import { Card, CardContent, CardHeader, Typography,Grid,CardActions,Button, Container, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useStateContext from '../../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios';
import moment from 'moment';

export default function UserManage() {


  const [user,setUser] = useState([])
  const{context,setContext,resetContext} = useStateContext()
  const navigate = useNavigate()


  useEffect(() => {
      axios.get(`https://localhost:7099/api/User`,{ withCredentials: true })
      .then(res =>{
        if (res.data == "No cookie") {
          setContext({token: false})
          navigate("/adminhome")
        }
          setUser(res.data.result)   
          }).catch(err => console.log(err))
  },[])

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
 <Container  style={{
      marginTop: '140px',
      backgroundColor : '#f0efef',
      padding: '40px',
      paddingBottom:'60px',
      marginBottom: '100px',
      height:'80vh'
      }}>
 <Typography sx={{fontSize:"29px", fontWeight:"bold",textDecoration:'underline'}}>
         USERS
          </Typography>
 <Typography sx={{fontSize:"23px", fontWeight:"bold",textDecoration:'underline'}}>
         These are the users registered with the service 
          </Typography>
 <Grid container spacing={1} style={{marginTop:'20px'}} >
 <table id="basic-data-table" class="table nowrap" style={{padding:'15px' ,height:'30vh'}}>
  <thead>
    <tr>
      <th>Role</th>
      <th>First name</th>
      <th>Last name</th>
      <th>E-mail</th>
      <th>Last Modified</th>
    </tr>
  </thead>
  <tbody>
    {user.map(p => (
    <tr>
    <td> {role(p.roleType)}</td>
    <td> {p.firstName}</td>
    <td>{p.lastName}</td>
    <td>{p.userEmail}</td>
    <td>{moment(p.lastModified).format('MMMM Do YYYY, h:mm:ss a')}</td>
    <td>  <Button variant="contained" onClick={() => {
            setContext({userId: p.userId});
       navigate('/userView');
   }}>View</Button>
   </td> 
  </tr>
     ))}
    </tbody>
  </table>
  </Grid>
  </Container>
    </>
  )
}
