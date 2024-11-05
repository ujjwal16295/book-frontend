import React, { useEffect, useState } from 'react'
import "./UserSummary.css"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';
import { toast } from 'react-toastify';



export const UserSummary = () => {

    // this gives us state of particular slice
    const userSlice =useSelector(state=>state.user)
    const [userSummaries,setUserSummaries] =useState([])
    const navigate = useNavigate() 
    const [loading,setLoading] = useState(true)



    //check if uer is there or not
      useEffect(()=>{
          if(!localStorage.getItem("token")){
          
            navigate("/")
    
          }else{
            getUserSummary(userSlice[0].id)

          }
        },[])


     //get all summary written by a user for a book
  async function getUserSummary(id){

    setLoading(true)


    const res= await fetch(`http://localhost:8000/usersummary?id=${encodeURIComponent(id)}`, {
        method: 'GET',    
      });
    
        const response = await res.json()
        if(response.success==true){
          setUserSummaries(response.userSummaries)
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

    navigate(`/usersummary/${encodeURIComponent(summaryObject._id)}?summary=${encodeURIComponent(summaryObject.summary)}&bookName=${encodeURIComponent(summaryObject.bookName)}&like=${encodeURIComponent(summaryObject.like)}`)

  }

  return (
 <>
{loading==true?<div className='big-container-usersummary-spinner'><Spinner  loading={true}/></div>: <div className='big-container-usersummary'>

<div className='userSummaryText'>
          Your Summaries:-
    </div>
    
    {userSummaries.length==0 && loading==false?<div className='no-summary'>no Summaries</div>:null}


    <div className='userSummaryContainer'>
      {userSummaries.map((index,item)=>{

        return    <div onClick={()=>{clickSummary(index)}} className='userSummary'>
             <div className='summaryOfUser'> {index.summary.length>50?index.summary.substring(0,50)+"...":index.summary}</div>
             <div className='author'> {index.bookName}</div>
             <div className={`userLike ${index.like>0?"greenUserLike":index.like<0?"redUserLike":""}`}> likes:{index.like}</div>

        </div>
     
      })}
    </div>

    
    </div>}

   
    
 </>
  )
}
