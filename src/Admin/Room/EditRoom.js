import { Card,Typography,CardActions,CardContent,Button,TextField,CardMedia,MenuItem,Select,InputLabel,Stack,Grid } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState,useEffect } from 'react'
import useStateContext from '../../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios'
import useForm from '../../useForm';

const getFreshModel = () =>({
  roomName: '',
  cost: 0,
  categoryType:0
})
export default function EditRoom() {

   

  const navigate = useNavigate()
  const{context,setContext,resetContext} = useStateContext()
  const [image,setImage] = useState('')
  const [room,setRoom] = useState([])
  const{
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange
} = useForm(getFreshModel);

function handleImage(e){
  console.log(e.target.files[0])
  setImage(e.target.files[0].name)
}

  function category(p){
    switch (p) {
      case 1:
        return "Single Room"
        case 2:
          return "Double Room"
        case 3:
          return "Deluxe Room"
        case 4:
          return "Presidential Suite"
      default:
        return "no value"
    }
  }

  function status(p){
    switch (p) {
      case 0:
        return "Available"
        case 1:
          return "Booked"
      default:
        return "no value"
    }
  }

  useEffect(() => {
    axios.get(`https://localhost:7099/api/Room/${context.roomId}`,{ withCredentials: true })
    .then(res =>{
        setValues(res.data)   
        }).catch(err => console.log(err))
},[])

  const edit = e =>{
    e.preventDefault();
    console.log(values)
   axios.put(`https://localhost:7099/api/Room/${context.roomId}`,{roomId:context.roomId,roomName:values.roomName,cost: values.cost,
   categoryType:values.categoryType,roomPicture:image},{ withCredentials: true }).then(res => {
    console.log(res.data)
    navigate('/roomManage')
   }).catch(err => console.log(err))
}


  return (
    <>
    <Container  style={{marginTop: '200px'}}>
    <Card sx={{
      height: '500px',
      width: '800px',
       mx: 'auto', 
       mt: 10,
  }}>
 <form noValidate autoComplete='on' onSubmit={edit}>
    <CardContent style={{marginLeft: '50px',
    marginTop:'50px',
    padding: '10px',
    alignItems:'center'
    }}>
      <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
        These are the details of the room you want to edit
      </Typography>
     
      <TextField
      style={{marginRight: 50,marginBottom:30}}
          required
          name = "roomName"
          label="RoomName"
          multiline
          rows={4}
          InputLabelProps={{style: { color: '#25383C' }}}
          value={values.roomName}
          onChange = {handleInputChange}
        />
        <TextField
          required
          name = "cost"
          label="Cost(£)"
          value={values.cost}
          InputLabelProps={{style: { color: '#25383C' }}}
          onChange = {handleInputChange}
        />
         <Grid container spacing={20}>
          <Grid item>
        <InputLabel id="demo-simple-select-autowidth-label" sx={{color: "#25383C"}}>Room Type</InputLabel>
        <Select
          autoWidth
          label="Room Type"
          name = "categoryType"
          onChange = {handleInputChange}
          InputLabelProps={{style: { color: '#25383C' }}}
          value={values.categoryType}
        >
          <MenuItem value="None">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Single Room</MenuItem>
          <MenuItem value={2}>Double Room </MenuItem>
          <MenuItem value={3}>Deluxe Room</MenuItem>
          <MenuItem value={4}>Presidential Suite</MenuItem>
        </Select>
          </Grid>
          <Grid item>
        <InputLabel sx={{color: "#25383C"}}>Room Picture</InputLabel>
        <input  style={{paddingTop:'20px'}}type='file' name= 'roomPicture' label="Room Picture" onChange={handleImage} />
          </Grid>
         </Grid>

    </CardContent>
    <CardActions  style={{marginLeft: '600px', marginTop: '50px',alignItems:'center'}}>
      <Button variant="outlined" sx={{ fontSize: '23px',whiteSpace:'nowrap' }} type = "submit"> Finish Edit</Button>
      
    </CardActions>
      </form>
    </Card>
    </Container>
    </>
  )
}
