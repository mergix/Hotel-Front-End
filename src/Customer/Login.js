import React,{ useEffect } from 'react'
import { Card, CardContent, TextField, Typography,Alert,AlertTitle,Collapse, Container } from '@mui/material'
import {Button} from '@mui/material'
import { Box, width } from '@mui/system'
import useForm from '../useForm'
import useStateContext from '../useStateContext'
import { useNavigate } from 'react-router'
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import Center from '../Center'




const getFreshModel = () =>({
    userEmail: '',
    userPassword: ''
})
export default function Login() {

    const{context,setContext,resetContext} = useStateContext()
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()

    const{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    useEffect(() => {
        resetContext()
    }, [])
    

    const login = e =>{
        e.preventDefault();
        if(validate())
       axios.post('https://localhost:7099/Login',values,{ withCredentials: true }).then(res => {
        if (res.data.result.userEmail == "No User") {
            setOpen(true)
        } 
        else {
            setContext({currentUserId: res.data.result.userId,token:true})
            console.log(res.data.result.userId)
            navigate('/')
            
        }
       }).catch(err => console.log(err))
    }

    const validate = () => {
        let temp = {}
        temp.userEmail = (/\S+@\S+\.\S+/).test(values.userEmail) ? "" : "Email is not valid."
        temp.userPassword = values.userPassword != "" ? "" : "This field is required."
        setErrors(temp)
        return Object.values(temp).every(x => x == "")
    }
  return (
    <>
    <Container sx={{marginTop:'20vh'}}>
    <Center>
     <Card sx = {{
        width: '400px',
        marginTop:'100px',
        backgroundColor: (theme) => theme.palette.secondary.main,
        }}>
        <CardContent sx={{textAlign:'center'}}>
            <Typography variant='h3' sx={{marginY: 3}}> Login</Typography>
        <Box sx={{
        '& 	.MuiTextField-root':{
            margin: 1,
            width: '90%'
        }
    }}>
    <form noValidate autoComplete='on' onSubmit={login}>
        <TextField
        label = "Email"
        name = "userEmail"
        value={values.userEmail}
        onChange = {handleInputChange}
        InputLabelProps={{style: { color: '#25383C' }}}
        variant = "outlined"
        {...(errors.userEmail && { error: true, helperText: errors.userEmail })}
        />

        <TextField
        label = "Password"
        name = "userPassword"
        value={values.userPassword}
        onChange = {handleInputChange}
        variant = "outlined"
        InputLabelProps={{style: { color: '#25383C' }}}
        sx={{color: (theme) => theme.palette.text.primary}}
        {...(errors.userPassword && { error: true, helperText: errors.userPassword })}
        />

        <Button
        type = "submit"
        variant = "contained"
        size = "large"
        sx = {{width: '90%'}}> Login</Button>
        
    </form>
    <Collapse in={open} sx={{marginTop:"10px"}}>
    <Alert severity="error" action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <IconButton fontSize="inherit" />
            </IconButton>
          }>
<AlertTitle>Something Went wrong</AlertTitle>
 <strong>Your details are incorrect please try again or New User Click here to sign up</strong>
</Alert>
</Collapse>
    </Box>

        </CardContent>
    </Card>

    </Center>

    </Container>
    </>
      )
}
