import { Card,Typography,CardActions,CardContent,Button,TextField,CardMedia,MenuItem,Select,InputLabel,Grid } from '@mui/material';
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
export default function CreateRoom() {

    const navigate = useNavigate()
    const{context,setContext,resetContext} = useStateContext()
    const [image,setImage] = useState('')
    const{
      values,
      setValues,
      errors,
      setErrors,
      handleInputChange,
  } = useForm(getFreshModel);

    function handleImage(e){
        console.log(e.target.files[0])
        setImage(e.target.files[0].name)
    }

    const create = e =>{
      e.preventDefault();
      console.log(values)
      console.log(image)
     axios.post('https://localhost:7099/api/Room',{roomName:values.roomName,cost: values.cost,
     categoryType:values.categoryType,roomPicture:image} ,{ withCredentials: true }).then(res => {
      console.log(res.data)
      navigate('/roomManage')
     }).catch(err => console.log(err))
  }



  return (
    <>
    <Container  style={{marginTop: '140px'}}>
    <Card sx={{
      height: 550,width: 800, mx: 'auto', mt: 10,
  }}>
 <form noValidate autoComplete='on' onSubmit={create}>
    <CardContent style={{marginLeft: '50px',marginTop:70,alignItems:'center'}}>
      <Typography sx={{ fontSize: 34 }} color="text.primary" gutterBottom>
        This is the room you want to create
      </Typography>
     
      <TextField
      style={{marginRight: 50,marginBottom:30}}
          required
          name = "roomName"
          label="Description"
          multiline
          rows={5}
          InputLabelProps={{style: { color: '#25383C' }}}
          value={values.roomName}
          onChange = {handleInputChange}
        />
        <TextField
          required
          name = "cost"
          label="Cost(£)"
          InputLabelProps={{style: { color: '#25383C' }}}
          value={values.cost}
          onChange = {handleInputChange}
        />

<Grid container spacing={20}>
<Grid item>
<InputLabel id="demo-simple-select-autowidth-label" sx={{color: "#25383C"}}>Room Type</InputLabel>
        <Select
          autoWidth
          label="Type"
          name = "categoryType"
          InputLabelProps={{style: { color: '#25383C' }}}
          onChange = {handleInputChange}
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
    <CardActions  style={{marginLeft: '600px',marginTop:'30px',alignItems:'center'}}>
      <Button  variant="outlined" sx={{ fontSize: '23px' }} type = "submit">Create</Button>
      
    </CardActions>
      </form>
    </Card>
    </Container>
    </>
  )
}
