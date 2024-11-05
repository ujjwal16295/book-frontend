import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./Likes.css"
import { Spinner } from '../Spinner/Spinner'
import { toast } from 'react-toastify'

export const Likes = () => {

    // this gives us state of particular slice
    const userSlice =useSelector(state=>state.user)
    const [userSummaries,setUserSummaries] =useState([])
    const [loading,setLoading] = useState(true)

    const navigate = useNavigate() 
    
    
    
    //check if user is there
    useEffect(()=>{
        if(!localStorage.getItem("token")){
              
            navigate("/")
        
        }else{
            getUserLike()
        }
    },[])  


//get all like  by a user for a book
  async function getUserLike(){

    setLoading(true)

    const res= await fetch(`https://book-backend-vy6c.onrender.com/likeBooks?username=${encodeURIComponent(userSlice[0].username)}`, {
        method: 'GET',    
      });
    
    const response = await res.json()
    if(response.success==true){
      setUserSummaries(response.books)
      console.log(response)

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


  let  clickSummary = (summaryObject)=>{

    navigate(`/likes/${encodeURIComponent(summaryObject._id)}?summary=${encodeURIComponent(summaryObject.book.summary)}&bookName=${encodeURIComponent(summaryObject.book.bookName)}&like=${encodeURIComponent(summaryObject.book.like)}&bid=${encodeURIComponent(summaryObject.book._id)}`)

  }

  return (
    <>
    {loading==true?<div className='like-big-container-usersummary-spinner'><Spinner loading={true}/></div>: <div className='like-big-container-usersummary'>
    <div className='likeuserSummaryText'>
          Your Likes:-
    </div>

    {userSummaries.length==0 && loading==false?<div className='no-likes'>no likes</div>:null}


    <div className='likeuserSummaryContainer'>
      {userSummaries.map((index,item)=>{

        return    <div  className='likeuserSummary' onClick={()=>{clickSummary(index)}} >
             <div className='likesummaryOfUser'> {index.book.summary.length>50?index.book.summary.substring(0,50)+"...":index.book.summary}</div>
             <div className='likeauthor'> {index.book.bookName}</div>
             <div className={`likeuserLike ${index.book.like>0?"likegreenUserLike":index.book.like<0?"likeredUserLike":""}`}> likes:{index.book.like}</div>

        </div>
     
      })}
    </div>
    </div> }

   
    </>
     )
}
