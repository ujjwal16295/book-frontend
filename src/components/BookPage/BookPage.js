import React, { useEffect, useState } from 'react'
import "./BookPage.css"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spinner } from '../Spinner/Spinner';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';







export const BookPage = () => {

const [loading,setLoading]=useState(true)
const [userLoading,setUserLoading]=useState(true)
const [likeLoding,setLikeLoading]=useState(true)
const [summary,setSummary]= useState('')  
const [searchParams, setSearchParams] = useSearchParams();

const [allSummary,setAllSummary] = useState([]);
const [carouselCount,setCaraouselCount]=useState(0)

const [animation,setAmimation]=useState(0)

const [like,setLike] = useState(0)
const [buttonMode,setButtonMode] = useState("like")
const [userLikeExists,setUserLikeExists] = useState(false)

// this gives us state of particular slice
const userSlice =useSelector(state=>state.user)

const navigate = useNavigate() 


// Get a specific query parameter
const pathname = searchParams.get('bookname');   

useEffect(()=>{
    console.log("run")
    getUserBookSummary(pathname)
    getBookSummary(pathname)
    // if(allSummary.length>0){
      console.log("likee")

      // getLike()
    // }

},[pathname])

useEffect(()=>{
   getLike()

},[carouselCount])

useEffect(()=>{
  if(userLikeExists){
    setButtonMode("dislike")
  }else{
    setButtonMode("like")
  }
},[userLikeExists])



//   // this gives us state of particular slice
//   const userSlice =useSelector(state=>state.user)

//function for making next back buttob work
function nextBackButton(button){
    userBookSummaryAnimation()
    if(button=="next"){
        if(allSummary.length!=carouselCount){
            setCaraouselCount(carouselCount+1)

        }
    }else{

        if(carouselCount!=1){
            setCaraouselCount(carouselCount-1)
        }
    }

    console.log("carsousel"+carouselCount)
    
}

 //get all summary written by a user for a book
  async function getUserBookSummary(bookName){
    setUserLoading(true)

    console.log("fhffhhf")
    
    //cannot add body in get use query parameter
    const res= await fetch(`https://book-backend-vy6c.onrender.com/userbooksummary?bookname=${encodeURIComponent(bookName)}`, {
        method: 'GET',
      });
    
        const response = await res.json()

        
        if(response.success==true){


          setAllSummary(response.allBooks)
          console.log("second ujjwal like")
          console.log(response.allBooks.length)
          
          if(response.allBooks.length>=1){
            console.log("666")
            setCaraouselCount(1)
            console.log("caraouselCount"+carouselCount)
            console.log("second like")
        }

     console.log(response)
     console.log("caraouselCount"+carouselCount)

        }else if(response.success==false){
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





     setUserLoading(false)


  }

  async function getBookSummary (bookname){
    setLoading(true)
    console.log("hit")
   fetch(`https://book-backend-vy6c.onrender.com/bookSummary?bookname=${encodeURIComponent(bookname)}`)
  .then(response => response.json())
  .then(data => {setSummary(data.response.response.candidates[0].content.parts[0].text)  
     setLoading(false)
  })
  .catch(error => {console.error('Error:', error) 
  setLoading(false)
  toast.error(error, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    })});

  }

  async function getLike(){
    setLikeLoading(true)
    console.log(summary)
    console.log("like ujjwal")
    console.log(carouselCount)
    const res= await fetch(`https://book-backend-vy6c.onrender.com/like?bid=${encodeURIComponent(allSummary[carouselCount-1]?._id)}&username=${encodeURIComponent(userSlice[0]?.username)}`, {
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


      setLikeLoading(false)


  }

  async function postLike(){
    setLikeLoading(true)
    if(localStorage.getItem("token")){
      const res= await fetch('https://book-backend-vy6c.onrender.com/like', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({bid:allSummary[carouselCount-1]?._id,username:userSlice[0].username,buttonMode:buttonMode})
        
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

  

    }else{
      toast.error("login or signin first", {
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
    setLikeLoading(false)


  }


  
  
  function addSummaryButton(){

    if(!userSlice[0]){
          
      navigate("/")

    }else{

      navigate(`/addsummary?bookname=${pathname}`)
    }
      
        
    }

    function userBookSummaryAnimation(){

        setAmimation(1)

        setTimeout(() => {
            setAmimation(0);
          }, 300);


    }
    
    return (
        <div className='book'>
      <div className='book-title'>
        {pathname}

      </div>
      
      {loading==true?<Spinner loading={loading}/>: <div className='summary'>{summary}</div>}
      

    <div className='addSummaryContainer'>

    <div className={`circular ${carouselCount==1||allSummary.length==0?"backHidden":" "}`} onClick={()=>{nextBackButton("back")}}>
        <FontAwesomeIcon icon={faArrowLeft}/>
      </div>

      <div className="circular" onClick={addSummaryButton}>
      <FontAwesomeIcon icon={faPlus} />
            </div>



      <div className={`circular ${allSummary.length==carouselCount||allSummary.length==0?"nextHidden":" "}`} onClick={()=>{nextBackButton("next")}}>
      <FontAwesomeIcon icon={faArrowRight}/>
      </div>

    </div>

  

    <div className="AllSummaryList">

    {userLoading==true?<Spinner loading={userLoading}/>:null}

        {allSummary.length==0?<div className='noSummary'>no summaries  for now</div>:
        

        <div  className={`userBookSummary ${animation==1?"userBookSummaryHidden":""}`}>{animation==0?allSummary[carouselCount-1]?.summary:""}</div>
        }




    </div>

    {likeLoding==true?<Spinner loading={likeLoding}/>:allSummary.length==0?null:  <div className='LikeContainer'>


<div className={`like ${userLikeExists==true?"green":" "}`} onClick={postLike}>
{userLikeExists?"dislike":"like"}
<div className='count'>
{like}
</div>
</div>
</div>}
  
    </div>

)
}


// import ReactMarkdown from 'react-markdown';
// <ReactMarkdown>{summary}</ReactMarkdown>




