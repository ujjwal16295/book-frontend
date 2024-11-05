import React, { useEffect } from 'react'
import "./Logout.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { remove } from '../../store/UserSlice'

export const Logout = () => {
    // this gives us state of particular slice
    const userSlice =useSelector(state=>state.user)
    const navigate = useNavigate() 
    const dispatch = useDispatch()



      //check if user is there
      useEffect(()=>{
        if(!localStorage.getItem("token")){
        
          navigate("/")
  
        }
      },[])  
      
      
      function logout(){
        localStorage.removeItem("token")
        dispatch(remove())
        navigate("/")

      }

  return (
<>
  
    <div className='profile'>
  Your Profile:-
    </div>
    <div className='logout'>
        
        <div className='logout-table'>
        <div className='logout-item-1'>
            name
        </div>
        <div className='logout-item-2'>
            {userSlice[0].username}
        </div>
        <div className='logout-item-1'>
            email
        </div>
        <div className='logout-item-2'>
        {userSlice[0].email}

        </div>

        </div>

        <div className='logout-button' onClick={logout}> 

logout
</div>
    </div>


</>
  )
}
