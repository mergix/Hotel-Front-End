import { Card, CardContent, CardHeader,CardMedia, Typography,Grid,Stack,CardActions,Button, Container,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useStateContext from '../../useStateContext';
import { useNavigate } from 'react-router'
import axios from 'axios';

export default function BookingManage() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [book,setBook] = useState([])
  let [test,setTest] = useState([])
  const{context,setContext,resetContext} = useStateContext()
  const navigate = useNavigate()

  useEffect(() => {
      axios.get(`https://localhost:7099/api/Booking`,{ withCredentials: true })
      .then(res =>{
        if (res.data == "No cookie") {
          setContext({token: false})
          navigate("/adminhome")
        }
          setBook(res.data.result)
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

  function singleFilter(){
    let single = book.filter(x => x.room.categoryType == 1)
    setTest(single)
  }
  function doubleFilter(){
    let double = book.filter(x => x.room.categoryType == 2)
    console.log(double)
    setTest(double)

  }
  function deluxeFilter(){
    let deluxe = book.filter(x => x.room.categoryType == 3)
    console.log(deluxe)
    setTest(deluxe)
  }
  function presidentialFilter(){
    let president = book.filter(x => x.room.categoryType == 4)
    console.log(president)
    setTest(president)
  }
  function noFilter(){
    let all = book
    console.log(all)
    setTest(all)
  }

  return (
    <>
    <Container  style={{
      marginTop: '140px',
      backgroundColor : '#F5F5F5',
      padding: '20px',
      paddingBottom:'60px',
      marginBottom: '100px',
      height:'80vh'
      }}>

<Typography sx={{fontSize:"23px", fontWeight:"bold",marginLeft:'50px',textDecoration:'underline'}}>
         These are the users registered with the service 
          </Typography>
    <Grid container spacing={3} style={{marginTop: '40px',marginBottom:"50px"}}>
    <Grid item >
    <Button variant="contained" sx ={{mx:'auto',marginLeft:'auto'}} onClick={() => {
          navigate('/bookCreate');
          }}>Create a  New Booking +</Button>
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
          {"Filter By room type"}
        </DialogTitle>
        <DialogContent>
        <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={singleFilter}>Single Rooms</Button>
      <Button variant="contained" onClick={doubleFilter}>Double Rooms</Button>
      <Button variant="contained" onClick={deluxeFilter}>Deluxe Rooms</Button>
      <Button variant="contained" onClick={presidentialFilter}>Presidential Suite </Button>
      <Button variant="contained" onClick={noFilter}>All Types </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </Grid>
    </Grid>

    <table id="basic-data-table" class="table nowrap">
  <thead>
    <tr>
      <th>First name</th>
      <th>Last name</th>
      <th>E-mail</th>
      <th>Type Of Room</th>
      <th>Cost</th>
      <th>Start date</th>
      <th>End date</th>
      <th>Time Booked</th>
    </tr>
  </thead>
  <tbody>
    {test.map(p => (
    <tr>
    <td> {p.user.firstName}</td>
    <td>{p.user.lastName}</td>
    <td>{p.user.userEmail}</td>
    <td>{category(p.room.categoryType)}</td>
    <td>{p.room.cost}</td>
    <td>{p.dateIn}</td>
    <td>{p.dateOut}</td>
    <td>{p.lastModified}</td>
    <td>  <Button  onClick={() => {
            setContext({bookId: p.bookingId});
      console.log(context.bookId);
       navigate('/bookView');
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

// {test.map(p => (
//   <Card sx={{
//      minHeight:300,width: 1000, mx: 'auto', mb: 8,
//      '& .MuiCardHeader-action': { m: 0, alignSelf: 'center',paddingTop:100 }
//  }}>


//      <CardHeader
//          title = { p.user.firstName +'  '+ p.user.lastName+' ' + 'Booked a: ' + category(p.room.categoryType)}
//      />

// <CardMedia
//     component="img"
//     height="194"
//     image={require(`../../img/Rooms/${p.room.roomPicture}`)}
//     alt={p.room.roomPicture.slice(0,-4)}
//   />
//      <CardContent>
//          <Typography variant='h6'>
//          Description: {p.room.roomName}
//          </Typography>
//       <div> Check-In: {p.dateIn}</div>
//       <div> Check-Out: {p.dateOut}</div>
//       <div> Status: {status(p.room.status)}</div>
//       <div> Booking made at: {p.lastModified}</div>
//      </CardContent>
//      <CardActions>
//       <Button  onClick={() => {
//       setContext({bookId: p.bookingId});
//       console.log(context.bookId);
//       navigate('/bookView');
//       }}>View</Button>
//      </CardActions>
//  </Card>
//  ))}