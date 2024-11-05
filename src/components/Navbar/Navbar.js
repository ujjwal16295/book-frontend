import React, { useState } from 'react'
import "./Navbar.css"
import { NavLink } from '../NavLink/NavLink'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Navbar = () => {
    const [clickForNavabr,setClickForNavbar] = useState(0)

    // this gives us state of particular slice
    const userSlice =useSelector(state=>state.user)
    const navigate = useNavigate();
    const navLinkArray = {[userSlice[0]?userSlice[0].username:"Login"]:`${userSlice[0]?'/logout':'/login'}`,"Search":"/","Your Summary":"/usersummary","Your Likes":"/likes"}
    let changeClickForNavbar = ()=>{
         if(clickForNavabr==0){
            setClickForNavbar(1)
         }else{
            setClickForNavbar(0)
         }
    }
  return (

    <div className={`Navbar ${clickForNavabr==1?"Navbar-transition":""}`} onClick={changeClickForNavbar}>
      <div onClick={()=>{navigate("/")}} className={`NavTitle ${clickForNavabr==1?"NavTitle-transition":""}`}>
        Navbar
      </div>
      <div className='NavLinks'>
     {/* //index contains name and object .entries convert object into array */}
      {Object.entries(navLinkArray).map((index,item)=>{
          return  <NavLink key={index} name={index[0]} navbarClick={clickForNavabr} link={index[1]}/>
        
      })}
      </div>
    </div>

  )
}
