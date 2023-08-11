import React,{ useEffect,useReducer,useState } from 'react'
import { Card, CardContent, TextField, Typography,Container } from '@mui/material'
import useStateContext from '../useStateContext'
import { useNavigate } from 'react-router'
import axios from 'axios'
import useForm from '../useForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const getFreshModel = () =>({
    firstName: '' ,
    lastName: '' ,
    userEmail: '',
    userPasswordHash: '',
    address:'',
    address2:'',
    address3:'',
    phoneNo:'',
})
export default function Register() {



    
    useEffect(() => {
      resetContext()
    }, [])
    
    
    const{context,setContext,resetContext} = useStateContext()
    const navigate = useNavigate()
    const [submitting, setSubmitting] = useState(false);


    const{
      values,
      setValues,
      errors,
      setErrors,
      handleInputChange
  } = useForm(getFreshModel);
    

    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);
        console.log(values)
        register();
        setTimeout(() => {
          setSubmitting(false);
          // setFormData({
          //   reset: true
          // })
        }, 3000)
      }


      const handleChange = event => {
        const isCheckbox = event.target.type === 'checkbox';
        // setFormData({
        //   name: event.target.name,
        //   value: isCheckbox ? event.target.checked : event.target.value,
        // });
      }

      async function register(){
       axios.post('https://localhost:7099/api/User',values,{ withCredentials: true }).then(res => {
        setContext({userId: res.data.userId,token:true})
        console.log(res.data.userId)
        console.log(values)
        navigate('/')
       }).catch(err => console.log(err))
    }

  return (
    <>
        <Container sx={{marginTop:'5vh'}}>
        <div class = "register-wrapper">
   <form class= "formBox" onSubmit={handleSubmit}>
   <h1>Create Account</h1>
    <div class = "twobytwo">

<fieldset disabled={submitting}>
         <label>
           <p>First Name</p>
           {/* <a><FontAwesomeIcon icon="fa-solid fa-envelope" /></a> */}
           <input name="firstName" onChange={handleInputChange} value={values.firstName || ''} />
         </label>
       </fieldset>
<fieldset disabled={submitting}>
         <label>
           <p>Last Name</p>
           {/* <a><FontAwesomeIcon icon="fa-solid fa-envelope" /></a> */}
           <input name="lastName" onChange={handleInputChange} value={values.lastName || ''} />
         </label>
       </fieldset>
    </div>
    <div class = "twobytwo">

<fieldset disabled={submitting}>
         <label>
           <p>E-mail Address</p>
           {/* <a><FontAwesomeIcon icon="fa-solid fa-envelope" /></a> */}
           <input name="userEmail" onChange={handleInputChange} value={values.userEmail || ''} />
         </label>
       </fieldset>
<fieldset disabled={submitting}>
         <label>
           <p>Password</p>
           {/* <a><FontAwesomeIcon icon="fa-solid fa-envelope" /></a> */}
           <input name="userPasswordHash" onChange={handleInputChange} value={values.userPasswordHash || ''} />
         </label>
       </fieldset>
    </div>

<div class = "twobytwo">

       <fieldset disabled={submitting}>
         <label>
           <p>Address</p>
           {/* <a><FontAwesomeIcon icon="fa-solid fa-envelope" /></a> */}
           <input name="address" onChange={handleInputChange} value={values.address || ''} />
           <input name="address2" onChange={handleInputChange} value={values.address2 || ''} />
           <input name="address3" onChange={handleInputChange} value={values.address3 || ''} />
         </label>
       </fieldset>
       <fieldset disabled={submitting}>
         <label>
           <p>Phone No</p>
           {/* <a><FontAwesomeIcon icon="fa-solid fa-envelope" /></a> */}
           <input name="phoneNo" onChange={handleInputChange} value={values.phoneNo || ''} />
         </label>
       </fieldset>
</div>
       <p> Already have an account? <a href='#' class ="forgot">Login here</a></p>
       <button type="submit">Sign Up</button>
   </form>

        </div>


        </Container>
    </>

    
  )
}
