import React from 'react';
import UserHome from "./Customer/UserHome"
import Login from './Customer/Login';
import Room from './Customer/Room';
import Navbar from './Customer/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookRoom from './Customer/BookRoom';
import BookingsList from './Customer/BookingsList';
import Register from './Customer/Register';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import AdminHome from './Admin/AdminHome';
import NavbarAdmin from './Admin/NavbarAdmin';
import UserManage from './Admin/User/UserManage';
import RoomManage from './Admin/Room/RoomManage';
import BookingManage from './Admin/Booking/BookingManage';
import ViewUser from './Admin/User/ViewUser';
import ViewRoom from './Admin/Room/ViewRoom';
import ViewBooking from './Admin/Booking/ViewBooking';
import DeleteUser from './Admin/User/DeleteUser';
import DeleteRoom from './Admin/Room/DeleteRoom';
import CreateRoom from './Admin/Room/CreateRoom';
import EditRoom from './Admin/Room/EditRoom';
import CreateBooking from './Admin/Booking/CreateBooking';
import EditBooking from './Admin/Booking/EditBooking';
import DeleteBooking from './Admin/Booking/DeleteBooking';
import LoginAdmin from './Admin/User/LoginAdmin';
import UserViewBooking from './Customer/UserViewBooking';
import UserViewRoom from './Customer/UserViewRoom';

function App() {

    
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <BrowserRouter>
    <Routes>
    <Route path='/' element = {<Navbar/>}>
      <Route path='/' element = {<UserHome/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/room' element = {<Room/>}/>
      <Route path='/book' element = {<BookRoom/>}/>
      <Route path='/booklist' element = {<BookingsList/>}/>
      <Route path='/userViewBook' element = {<UserViewBooking/>}/>
      <Route path='/userViewRoom' element = {<UserViewRoom/>}/>

    </Route>
    <Route path='/' element = {<NavbarAdmin/>}>
    <Route path='/adminhome' element = {<AdminHome/>}/>
    <Route path='/adminLogin' element = {<LoginAdmin/>}/>
    <Route path='/userManage' element = {<UserManage/>}/>
    <Route path='/userView' element = {<ViewUser/>}/>
    <Route path='/deleteUser' element = {<DeleteUser/>}/>
    <Route path='/roomManage' element = {<RoomManage/>}/>
    <Route path='/roomView' element = {<ViewRoom/>}/>
    <Route path='/roomCreate' element = {<CreateRoom/>}/>
    <Route path='/roomEdit' element = {<EditRoom/>}/>
    <Route path='/roomDelete' element = {<DeleteRoom/>}/>
    <Route path='/bookManage' element = {<BookingManage/>}/>
    <Route path='/bookCreate' element = {<CreateBooking/>}/>
    <Route path='/bookEdit' element = {<EditBooking/>}/>
    <Route path='/bookDelete' element = {<DeleteBooking/>}/>
    <Route path='/bookView' element = {<ViewBooking/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
