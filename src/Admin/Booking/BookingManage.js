import { Card, CardContent, CardHeader, Typography,Grid,Stack,CardActions,Button, Container,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions } from '@mui/material';
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
      axios.get(`https://localhost:7099/api/Booking`,{headers: {
        'Authorization': 'Bearer ' + context.jwt
      }})
      .then(res =>{
          setBook(res.data)
          setTest(res.data)  
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
    <Container  style={{marginTop: '160px'}}>

    <Button variant="contained" sx ={{mx:'auto',marginLeft:'auto'}} onClick={() => {
          navigate('/bookCreate');
          }}>Create a  New Booking +</Button>

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
    <Stack  spacing={3} >
    {test.map(p => (
      <Card sx={{
         minWidth: 150, mx: 'auto', mt: 10,
         '& .MuiCardHeader-action': { m: 0, alignSelf: 'center',paddingTop:100 }
     }}>
         <CardHeader
             title = {p.user.firstName +'  '+ p.user.lastName}
         />
         <CardContent>
             <Typography variant='h6'>
             {p.room.roomName}
             </Typography>
             {/* <img src={book.roomPicture}/> */}
          <div> {p.dateIn}</div>
          <div> {p.dateOut}</div>
          <div> {p.room.status}</div>
         </CardContent>
         <CardActions>
          <Button  onClick={() => {
          setContext({bookId: p.bookingId});
          console.log(context.bookId);
          navigate('/bookView');
          }}>View</Button>
         </CardActions>
     </Card>
     ))}
      </Stack>
     </Container>
       </>
  )
}
