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

function dateParse(){

}


  return (
    <>
 <Container  style={{marginTop: '150px'}}>

 <table id="basic-data-table" class="table nowrap">
  <thead>
    <tr>
      <th>First name</th>
      <th>Last name</th>
      <th>E-mail</th>
      <th>Last Modified</th>
    </tr>
  </thead>
  <tbody>
    {user.map(p => (
    <tr>
    <td> {p.firstName}</td>
    <td>{p.lastName}</td>
    <td>{p.userEmail}</td>
    <td>{moment(p.lastModified).format('MMMM Do YYYY, h:mm:ss a')}</td>
    <td>  <Button  onClick={() => {
            setContext({userId: p.userId});
      console.log(context.bookId);
       navigate('/userView');
   }}>View</Button>
   </td> 
  </tr>
     ))}
    </tbody>
  </table>
  </Container>
    </>
  )
}
