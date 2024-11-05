import './App.css';
import { Input } from './components/Input/Input';

import {BrowserRouter,Route,Routes, useLocation} from "react-router-dom"
import { BookPage } from './components/BookPage/BookPage';
import { SignIn } from './components/SignIn/SignIn';
import { Login } from './components/Login/Login';
import { UserSummary } from './components/UserSummary/UserSummary';
import { Navbar } from './components/Navbar/Navbar';
import { AddSummary } from './components/AddSummary/AddSummary';
import { SingleUserSummary } from './components/SignleUserSummary/SingleUserSummary';
import { EditSummary } from './components/EditSummary/EditSummary';
import { Likes } from './components/Likes/Likes';
import { SingleLikeSummary } from './components/SingleLikeSummary/SingleLikeSummary';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from './store/UserSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logout } from './components/Logout/Logout';



function App() {

      //to dispatch action to store data in store
      const dispatch = useDispatch()

      const location = useLocation();


      const userSlice =useSelector(state=>state.user)




      useEffect(() => {
        // Function to run on every page load or route change
        const handlePageChange = () => {
          if(!localStorage.getItem("token")){
            if(userSlice[0]){
              dispatch(remove())
            }
          }
          // Your function logic here
        };
    
        handlePageChange(); // Call the function on initial load and every route change
      }, [location]);



  useEffect(()=>{
   
    const verify = async()=>{
      if(localStorage.getItem("token")){
        const res= await fetch('http://localhost:8000/verify', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}` // Include token in Authorization header
          },      
        });
      
          const response = await res.json()
          console.log(response)
  
          if(response.success==true){
            //to store username
            //to redirect to another page
            // navigate("/")
            localStorage.setItem("token",response.token)
            //we are storing object inside a array might change it later
            dispatch(remove())
            dispatch(add({email:response.email,username:response.username,id:response.id}))

          }
  
      }


    }

    verify()

    

  },[])



  return (
    <div className='Bigcontainer'>

    <Navbar/>
      <Routes>
        <Route exact path="/" element={<Input/>}/>
      </Routes>
      <Routes>
        <Route exact path="/book" element={<BookPage/>}/>
      </Routes>
      <Routes>
        <Route exact path='/signin' element={<SignIn/>}/>
      </Routes>
      <Routes>
        <Route exact path='/login' element={<Login/>}/>
      </Routes>
      <Routes>
        <Route exact path='/usersummary' element={<UserSummary/>}/>
      </Routes>
      <Routes>
        <Route exact path='/addsummary' element={<AddSummary/>}/>
      </Routes>
      <Routes>
        <Route exact path='/usersummary/:id' element={<SingleUserSummary/>}/>
      </Routes>
      <Routes>
        <Route exact path='/editsummary/:id' element={<EditSummary/>}/>
      </Routes>
      <Routes>
        <Route exact path='/likes' element={<Likes/>}/>
      </Routes>
      <Routes>
        <Route exact path='/likes/:id' element={<SingleLikeSummary/>}/>
      </Routes>
      <Routes>
        <Route exact path='/logout' element={<Logout/>}/>
      </Routes>
      <ToastContainer />

      
    </div>



  );
}

export default App;
