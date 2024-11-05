import React from 'react'
import "./NavLink.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const NavLink = (props) => {
  const pathname  = useLocation().pathname
  // this gives us state of particular slice
  const userSlice =useSelector(state=>state.user)

  const navigate = useNavigate() 

  const navbarPageClick=()=>{
    // if(props.link=="/login"){
    //   if(userSlice[0]){
    //     navigate("/")
    //   }
    // }else if(props.link=="/usersummary"){
    //   if(!userSlice[0]){
    //     navigate("/")
    //   }
    // }else if(props.link=="/likes"){
    //   if(!userSlice[0]){
    //     navigate("/")
    //   }
    // }


      navigate(props.link)
    


    
  }
  return (
    <div className={`NavLink ${props.navbarClick==1?"NavLink-Transition":""} ${pathname ==props.link?"Navlink-Click":""}`} onClick={navbarPageClick}>
       <div className='NavlinkText'>
       {props.name}

       </div>
    </div>
  )
}
 