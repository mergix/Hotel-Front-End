import { Container } from '@mui/system'
import React from 'react'
import { useEffect } from 'react'
import '../Script.js';
import { Outlet, useNavigate } from 'react-router-dom'
import useLogout from '../useLogout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faHome, faHouseChimney } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {

    const navigate = useNavigate();
    const logout = useLogout();

    const login = () =>{
      navigate("/login")
    }
    const register = () =>{
      navigate("/register")
    }
    const home = () =>{
      navigate("/")
    }
    const signOut = () =>{
        logout();
        navigate("/")
    }
    const room = () =>{
      navigate("/room")
  }
  const bookingList = () =>{
    navigate("/booklist")
}

const profilePage = () =>{
  navigate("/profile")
}

  return (
    <>
    <header class="navHeader">
            <FontAwesomeIcon icon={faBed}/>
            <span>Spectrum Hotels</span>
        <nav>
          <div className='left'>

          </div>

          <a onClick={home} className='home-btn'><FontAwesomeIcon icon={faHouseChimney}/></a>
          <div class="dropdown" data-dropdown>
          <button class="link" data-dropdown-button>Rooms</button>
          <div class="dropdown-menu information-grid">
            <div>
            <div class="dropdown-heading">
              Test title
            </div>
             <div class="dropdown-links">
              <a href='#' class="link"> All</a>
              <a href='#' class="link"> None</a>
              <a href='#' class="link"> Half</a>
             </div>
            </div>
            <div>
            <div class="dropdown-heading">
              Test title
            </div>
             <div class="dropdown-links">
              <a href='#' class="link"> All</a>
              <a href='#' class="link"> None</a>
              <a href='#' class="link"> Half</a>
             </div>
            </div>
            <div>
            <div class="dropdown-heading">
              Test title
            </div>
             <div class="dropdown-links">
              <a href='#' class="link">All</a>
              <a href='#' class="link"> None</a>
              <a href='#' class="link"> Half</a>
             </div>
            </div>
            <div>
            <div class="dropdown-heading">
              Test title
            </div>
             <div class="dropdown-links">
              <a href='#' class="link"> All</a>
              <a href='#' class="link"> None</a>
              <a href='#' class="link"> Half</a>
             </div>
            </div>
          </div>
          </div>
          <a onClick={bookingList}>Manage Bookings</a>
          <div className='right'>
          <div class="dropdown" data-dropdown>
          <button class="link" data-dropdown-button>Profile</button>
          <div class="dropdown-menu information-grid">
            <div>
            <div class="dropdown-heading">
              Test title
            </div>
             <div class="dropdown-links">
              <a href='#' class="link"> User name</a>
              <a href='#' class="link" onClick={profilePage}> Manage account/Settings</a>
              <a href='#' class="link"> Sign Out</a>
              <a href='#' class="link" onClick={logout} >Logout</a>
              <a  href='#' class="link" onClick={login} >Login</a>
              <a  href='#' class="link"onClick={register}>Sign Up</a>
             </div>
            </div>
          </div>
          </div>
          </div>

          <button className='nav-btn nav-close-btn'>
            X
          </button>
        </nav>
        <button className='nav-btn'>
        O
        </button>
    </header>
    <Container class = "userContainer">
    <Outlet/>
    </Container>
<footer class="footer">
<div class="container">
  <div class="row">
    <div class ="footer-col">
      <h4> Check me out!!</h4>
      <ul>
        <li>
        <a href='#'>Linkedin</a>
        </li>
        <li>
        <a href='#'> Twitter</a>
        </li>
        <li>
        <a href='#'> Instagram</a>
        </li>
      </ul>
    </div>
    <div class ="footer-col">
      <h4> My Email</h4>
      <ul>
        <li>
        <a href='#'>ismail.fagbenro@yahoo.com</a>
        </li>
      </ul>
    </div>
 
    <div class ="footer-col">
        <h4>
            Ismail Fagbenro
        </h4>
        <ul>
        <li>
        <a href='#'>Copyright 2023© </a>
        </li>
      </ul>
    </div>

    
  </div>
</div>

	</footer>
    </>
  )
}
