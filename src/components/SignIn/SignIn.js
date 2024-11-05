import React, { useEffect, useState } from 'react'
import "./Signin.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../store/UserSlice';
import { Spinner } from '../Spinner/Spinner';
import { toast } from 'react-toastify';



export const SignIn = () => {
  const [loading,setLoading]=useState(false)

    const [password,setPassword]=useState("");
    const [email,SetEmail]=useState("")
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

    const handleEmailChange = (event) => {
        SetEmail(event.target.value)
      };

    const handlePasswordChange=(event)=>{
        setPassword(event.target.value)
    }  
    const handleUsernameChange=(event)=>{
        setUsername(event.target.value)
    }

    const onSubmitSigninForm= async(username,email,password)=>{
      setLoading(true)

    const res= await fetch('http://localhost:8000/signin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email: email, password:password,username:username})

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
    <div className='signin-container'>
        <div className='signin-text'>
      Signin
    </div>

    <div className='signin'>
        <input type='text' value={username} onChange={handleUsernameChange} placeholder='username'></input>
        <input type="text" value={email} onChange={handleEmailChange} placeholder='email'></input>
        <input type='password' value={password} onChange={handlePasswordChange} placeholder='password'></input>
        {loading==true?<div className='siginSpinner'><Spinner loading={loading}/></div>:<button onClick={()=>{onSubmitSigninForm(username,email,password)}}>submit</button>}
        {loading==true?null:<div className='signin-link' onClick={()=>{navigate("/login")}}> have an account?</div>}

    </div>
    </div>
  )
}
