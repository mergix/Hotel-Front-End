import React,{ useReducer,useEffect ,useState,useContext } from 'react'
import { Card, CardContent, TextField, Typography,Alert,AlertTitle,Collapse, Container } from '@mui/material'
import {Button} from '@mui/material'
import { Box, width } from '@mui/system' 
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import Center from '../Center'
import AuthContext from '../AuthProvider'
import useAuth from '../useAuth'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'



const formReducer = (state, event) => {
    if(event.reset) {
        return {
          email: '',
          password: '',
        }
      }
      return {
        ...state,
        [event.name]: event.value
      }
   }
export default function Login() {

    const {auth,setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"


    const [open, setOpen] = React.useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useReducer(formReducer, {});
    

    useEffect(() => {
        // console.log(document.cookie)
    }, [])
    

    async function loginUser(){
          
        const userEmail = Object.entries(formData)[0][1]
        const userPassword = Object.entries(formData)[1][1]
       axios.post('https://localhost:7099/Login', {userEmail,userPassword} ,{ withCredentials: true }).then(res => {
        console.log(res.data.userEmail)
        if (res.data.userEmail == "No User") {
            setOpen(true)
            console.log("to bad")
        } 
        else {
            console.log(res.data.userId)
            const token = res.data.token;
            const role = res.data.roleType;
            setAuth({token,role});
            console.log(auth.token)
            console.log(auth.role)
            navigate(from, {replace: true});
        }
       }).catch(err => console.log(err))
    }

    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);
        console.log(Object.entries(formData)[0][1])
        console.log(Object.entries(formData)[1][1])
        loginUser();
        setTimeout(() => {
          setSubmitting(false);
          setFormData({
            reset: true
          })
        }, 3000)
      }

      const handleChange = event => {
        const isCheckbox = event.target.type === 'checkbox';
        setFormData({
          name: event.target.name,
          value: isCheckbox ? event.target.checked : event.target.value,
        });
      }
  return (
    <>
    <Container sx={{marginTop:'5vh'}}>
    
    {submitting &&
       <div>You are submitting the following:
       <ul>
         {Object.entries(formData).map(([name, value]) => (
           <li key={name}><strong>{name}</strong>:{value.toString()}</li>
         ))}
       </ul></div>
     }
     <div class = "login-wrapper">
      <form class= "formBox"onSubmit={handleSubmit}>
      <h1>Login to your account</h1>
      <fieldset disabled={submitting}>
         <label>
           <p>E-mail Address</p>
           {/* <a><FontAwesomeIcon icon="fa-solid fa-envelope" /></a> */}
           <input name="email" onChange={handleChange} value={formData.email || ''} />
         </label>
       </fieldset>
       <fieldset disabled={submitting}>
         <label>
           <p>Password</p>
           {/* <a><FontAwesomeIcon icon="fa-solid fa-envelope" /></a> */}
           <input name="password" onChange={handleChange} value={formData.password || ''} />
         </label>
       </fieldset>
         <a href='#' class ="forgot"> Forgot Password?</a>
         <p> Don't have an account? <a href='#' class ="forgot">Register here</a></p>
       <button type="submit">Sign In</button>
      </form>

     </div>
    </Container>


        </>
      )
}

