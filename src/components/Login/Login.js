import React, { useEffect, useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../store/UserSlice';
import { Spinner } from '../Spinner/Spinner';
import { toast } from 'react-toastify';




export const Login = () => {
    
    const [loading,setLoading]=useState(false)
    const [password,setPassword]=useState("");
    const [username,setUsername] = useState("")


    // this gives us state of particular slice
    const userSlice =useSelector(state=>state.user)

    const navigate = useNavigate() 



    //check if user is there
      useEffect(()=>{
          if(localStorage.getItem("token")){
          
            navigate("/")
    
          }
        },[])    

    
    //to dispatch action to store data in store
    const dispatch = useDispatch()

    const handlePasswordChange=(event)=>{
        setPassword(event.target.value)
    }  
    const handleUsernameChange=(event)=>{
        setUsername(event.target.value)
    }

    const onSubmitSigninForm= async(username,password)=>{
     
      setLoading(true)
    

    const res= await fetch('https://book-backend-vy6c.onrender.com/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password:password,username:username})

  });

    const response = await res.json()
    console.log(response)

    if(response.success==true){

      toast.success("sign in successful", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
      //to store username
      //to redirect to another page
      navigate("/")
      localStorage.setItem("token",response.token)
      //we are storing object inside a array might change it later
      dispatch(add({email:response.email,username:response.username,id:response.id}))
    }else{
      toast.error(response.error, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
    }

    setLoading(false)
    }
  return (
    <div className='login-container'>
    <div className='login-text'>
      Login
    </div>
    <div className='login'>
        <input type='text' value={username} onChange={handleUsernameChange} placeholder='username'></input>
        <input type='password' value={password} onChange={handlePasswordChange} placeholder='password'></input>
        {loading==true?<div className='loginSpinner'><Spinner loading={loading}/></div>:<button onClick={()=>{onSubmitSigninForm(username,password)}}>submit</button>}
        {loading==true?null:<div className='login-link' onClick={()=>{navigate("/signin")}}>dont have an account?</div>}
    </div>

    </div>
  )
}
