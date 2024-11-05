import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import "./SingleLikeSummary.css"
import { Spinner } from '../Spinner/Spinner';
import { toast } from 'react-toastify';

export const SingleLikeSummary = () => {

    const[loading,setLoading]=useState(true)
    const [searchParams, setSearchParams] = useSearchParams();
    const summary= searchParams.get("summary")
    const bookName = searchParams.get("bookName")
    // const like = searchParams.get("like")
    const bid = searchParams.get("bid")

   const [like,setLike] = useState(searchParams.get("like"))
   const [buttonMode,setButtonMode] = useState("like")
   const [userLikeExists,setUserLikeExists] = useState(false)
    const { id } = useParams();



    // this gives us state of particular slice
    const userSlice =useSelector(state=>state.user)
    const navigate = useNavigate() 


    //check if uer is there or not
     useEffect(()=>{
        if(!localStorage.getItem("token")){
            
            navigate("/")
      
        }else{
            getLike()

        }
    },[])


    useEffect(()=>{
        if(userLikeExists){
          setButtonMode("dislike")
        }else{
          setButtonMode("like")
        }
      },[userLikeExists])






    async function getLike(){
      setLoading(true)
        console.log(summary)
        const res= await fetch(`https://book-backend-vy6c.onrender.com/like?bid=${encodeURIComponent(bid)}&username=${encodeURIComponent(userSlice[0]?.username)}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },  
        });
      
          const response = await res.json()
          console.log("like")
          console.log(response)
          if(response.success==true){
    
            setLike(response.likeValue)
            setUserLikeExists(response.userLikeExists)
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

    async function editLike(){
      setLoading(true)
        const res= await fetch('https://book-backend-vy6c.onrender.com/like', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({bid:bid,username:userSlice[0].username,buttonMode:buttonMode})
            
          });
          
          const response = await res.json()
    
          if(response.success==true){
           setLike(response.likeValue)
           setUserLikeExists(response.userLikeExists)
           if(buttonMode=="like"){
            setButtonMode("dislike")
          }else{
            setButtonMode("like")
          }
          toast.success(`${buttonMode=="dislike"?'disliked':'liked'} the summary`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
    
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
    <div className='SingleLikeSummaryConatiner'>
    <div className='SingleLikeAuthor'>
      {bookName}
  </div>
  <div className='SingleLikeButtonContainer'>

  <div className={`SingleLikeLike ${like>0?"greenSingleLikeLike":like<0?"redSingleLikeLike":""}`}>
    {/* like: {like} */}
    {loading==true?<Spinner loading={loading}/>:`like: ${like}`}

  </div>

  <div className='SingleLikeSummary'>

  {summary}
  </div>

  <div className='NewLikeLikeContainer'>


  {loading==true?<Spinner loading={loading}/>:
<div className={`NewLikelike ${userLikeExists==true?"NewLikegreen":" "}`} onClick={editLike}>
{userLikeExists?"dislike":"like"}
</div>}
</div>
  
  </div>
  </div>
  )
}
