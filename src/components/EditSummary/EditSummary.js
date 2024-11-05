import React, { useEffect, useState } from 'react'
import "./EditSummary.css"
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';
import { toast } from 'react-toastify';

export const EditSummary = () => {
    
    const [loading,setLoading] = useState(false)
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [summary,setSummary]=useState(searchParams.get("summary"))
    const bookName = searchParams.get("bookName")
    const navigate = useNavigate()


         //check if user is there
         useEffect(()=>{
          if(!localStorage.getItem("token")){
          
            navigate("/")
           
    
          }
        },[])   

    let handleUserSummaryChange =(event)=>{

        setSummary(event.target.value)
    }


// get all summary written by a user for a book
  async function editSummary(){

    setLoading(true)
    console.log("edit summary"+summary)
    const res= await fetch(`http://localhost:8000/usersummary`, {
        method: 'PUT',   
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id:id,summary:summary}) 
      });
    
        const response = await res.json()
   
        console.log(response)


        setLoading(false)

        if(response.success==true){
          toast.success("edited the summary", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
            setSummary("")
            navigate("/")

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


  }
  return (
    <div className='EditSummaryContianer'>

    <div className='EditSummaryText'>
      {bookName}
     </div>
<div className='EditTextArea'>
  <textarea rows='20' cols='50' onChange={handleUserSummaryChange} value={summary}></textarea>
  {loading==true?<div className='editSummarySpinner'><Spinner loading={loading}/></div>:  <button onClick={()=>{editSummary()}}>Edit</button>
}
</div> 
    </div>  )
}
