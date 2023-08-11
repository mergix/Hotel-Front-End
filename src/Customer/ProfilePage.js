import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Container } from '@mui/material'

export default function ProfilePage() {
  return (
  <>

    <Container>
        
    <input type='checkbox' id='check'/>
    <label for="check">
    <FontAwesomeIcon icon={faBarsStaggered} id='btn' />
    <FontAwesomeIcon icon={faSquareXmark} id='cancel'/>
    </label>
    <div class ="sidebar">
    <header class="sidebarheader">Profile</header>
    <ul>
        <li><a href='#'><FontAwesomeIcon icon={faCheck} style={{marginRight:"16px"}} />Change Address</a></li>
        <li><a href='#'><FontAwesomeIcon icon={faCheck} style={{marginRight:"16px"}} />Change Phone No</a></li>
        <li><a href='#'><FontAwesomeIcon icon={faCheck}  style={{marginRight:"16px"}}/>Update Payment Info</a></li>
        <li><a href='#'><FontAwesomeIcon icon={faCheck}  style={{marginRight:"16px"}}/>Change Password</a></li>
    </ul>
    </div>



    <div class="display">
    <h2>Profile Details</h2>
    <p> </p>
    </div>
    </Container>
  </>
  )
}
