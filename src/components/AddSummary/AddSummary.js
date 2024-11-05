import React, { useEffect, useState } from 'react'
import "./AddSummary.css"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spinner } from '../Spinner/Spinner';
import { toast } from 'react-toastify';


export const AddSummary = () => {
    
    const [loading,setLoading]=useState(false)
    const[userSummary,setUserSummary]=useState("")
    const [searchParams, setSearchParams] = useSearchParams();

    //check if uer is there or not
    useEffect(()=>{
      if(!localStorage.getItem("token")){
      
        navigate("/")

      }
    },[])

    const navigate = useNavigate() 

    // this gives us state of particular slice
    const userSlice =useSelector(state=>state.user)

    // Get a specific query parameter 
    const pathname = searchParams.get('bookname');   


    let handleUserSummaryChange =(event)=>{

        setUserSummary(event.target.value)
    }


    async function postBookSummary(name,bookName,summary){
        
      setLoading(true)
        console.log(userSlice)
    
    
        const res= await fetch('http://localhost:8000/summary', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:name,bookName:bookName,summary:summary,id:userSlice[0].id})
        
          });
        
            const response = await res.json()
    
            console.log(response)
            if(response.success==true){
              toast.success("summary added succesfully", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                })
              setUserSummary("")
              navigate("/usersummary")
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
  <div className='AddSummaryContianer'>

    <div className='AddSummaryText'>
      {pathname}
     </div>
<div className='TextArea'>
  <textarea rows='20' cols='50' onChange={handleUserSummaryChange} value={userSummary}></textarea>
  {loading==true?<div className='addSummarySpinner'><Spinner loading={loading}/></div>:  <button onClick={()=>{postBookSummary(userSlice[0].username,pathname,userSummary)}}>submit</button>
}
</div> 
    </div>
  )
}
