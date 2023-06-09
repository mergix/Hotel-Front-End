import { Card, CardContent, CardHeader, Typography,Grid,CardActions,Button, Container,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Stack,CardMedia} from '@mui/material';
import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import useStateContext from '../../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios';
import moment from 'moment';


export default function RoomManage() {


  const [open, setOpen] = React.useState(false);
 
  const [room,setRoom] = useState([])
  let [test,setTest] = useState([])
  const{context,setContext,resetContext} = useStateContext()
  const navigate = useNavigate()

  useEffect(() => {
      axios.get(`https://localhost:7099/api/Room`,{ withCredentials: true })
      .then(res =>{
        if (res.data == "No cookie") {
          setContext({token: false})
          navigate("/adminhome")
        }
          setRoom(res.data.result)
          setTest(res.data.result)
          console.log(res.data)
          }).catch(err => console.log(err))
  },[])
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


function singleFilter(){
    let single = room.filter(x => x.categoryType == 1)
    setTest(single)
  }
  function doubleFilter(){
    let double = room.filter(x => x.categoryType == 2)
    console.log(double)
    setTest(double)

  }
  function deluxeFilter(){
    let deluxe = room.filter(x => x.categoryType == 3)
    console.log(deluxe)
    setTest(deluxe)
  }
  function presidentialFilter(){
    let president = room.filter(x => x.categoryType == 4)
    console.log(president)
    setTest(president)
  }
  function noFilter(){
    let all = room
    console.log(all)
    setTest(all)
  }
  function bookedFilter(){
    let bStatus = room.filter(x => x.status == 1)
    setTest(bStatus)
  }

  function availableFilter(){
    let aStatus = room.filter(x => x.status == 0)
    setTest(aStatus)
  }

  return (
    <>
    <Container  style={{
      marginTop: '140px',
      backgroundColor : '#f0efef',
      padding: '40px',
      paddingBottom:'60px',
      marginBottom: '100px'
      }}>

<Typography sx={{fontSize:"29px", fontWeight:"bold",textDecoration:'underline'}}>
         ROOMS
          </Typography>
          <Typography sx={{fontSize:"25px", fontWeight:"bold",textDecoration:'underline'}}>
         These are all the rooms currently in service
          </Typography>
    <Grid container spacing={5} style={{
      marginTop: '5px',
      marginBottom: '50px',
      }}>
    <Grid item >
    <Button variant="contained" sx ={{mx:'auto',marginLeft:'auto'}} onClick={() => {
          navigate('/roomCreate');
          }}>Create a  New Room +</Button>
          </Grid>
          <Grid item >
          <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Filter the list
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Filter By room type Or by Booked and available rooms"}
        </DialogTitle>
        <DialogContent>
        <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={singleFilter}>Single Rooms</Button>
      <Button variant="contained" onClick={doubleFilter}>Double Rooms</Button>
      <Button variant="contained" onClick={deluxeFilter}>Deluxe Rooms</Button>
      <Button variant="contained" onClick={presidentialFilter}>Presidential Suite </Button>
      <Button variant="contained" onClick={noFilter}>All Types </Button>
          </Stack>
          <br></br>
          <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={bookedFilter}>Booked Rooms</Button>
      <Button variant="contained" onClick={availableFilter}>Available Rooms</Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
    </Grid>
    </Grid>

    <Grid container spacing={3} sx={{height:'80vh'}} >

    <table id="basic-data-table" class="table nowrap" style={{padding:'15px' ,height:'30vh'}}>
  <thead>
    <tr>
      <th>Id</th>
      <th>Type</th>
      <th>Status</th>
      <th>Cost(£)</th>
      <th>Last Modified</th>
    </tr>
  </thead>
  <tbody>
    {test.map(p => (
    <tr>
    <td> {p.roomId}</td>
    <td>{category(p.categoryType)}</td>
    <td>{status(p.status)}</td>
    <td>{p.cost}</td>
    <td>{moment(p.lastModified).format('MMMM Do YYYY, h:mm:ss a')}</td>
    <td>  <Button variant="contained"  onClick={() => {
            setContext({roomId: p.roomId});
      console.log(context.bookId);
       navigate('/roomView');
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

