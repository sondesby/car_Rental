import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/navbar/navbar';
import Login from './components/login/login';
import Register from './components/register/register';
import PostDetails from './components/post-details/post-details';
import Home from './components/home/home';
import { getAllCarPosts } from './services/postsOperations';
import { useEffect, useState } from 'react';
import UserInterface from './components/user-interface/user-interface';
import ResetPassword from './components/resetPassword/resetPassword';
import Dashboard from './components/dashboard/dashboard';
import Profile from './components/profile/profile';

function App() {

  const [carPosts, setCarPosts] = useState([]);
  const [carPost, setCarPost] = useState();
  const [action, setAction] = useState(false);

  const auth = localStorage.getItem("Token") || sessionStorage.getItem("Token") ; 
  const role = localStorage.getItem("role") || sessionStorage.getItem("role") ; 

  const getPosts = () =>{
    getAllCarPosts((cb)=>{
      setCarPosts(cb.data);
    })
  }
  
  useEffect(()=>{
    getPosts();
  },[action])

  const urlSearchParams = new URLSearchParams(window.location.search);
  const token = urlSearchParams.get('token');

  return (
    <Router>
        <NavBar/>
       <Routes>
          <Route path="/" element={<Home carPosts={carPosts} setCarPost={setCarPost} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/Post-details" element={<PostDetails carPost={carPost} />} />
          {token?(
            <Route path="/reset-password" element={<ResetPassword/>} />
          ):(
            <Route path="/reset-password" element={<Navigate to="/login" />} />
          )}
          
          {auth ? (
            <>
            {role === 'admin'? 
           (
             <Route path="/dashboard" element={<Dashboard  setAction={setAction} action={action} carPosts={carPosts} />}/>
           ):(
            <Route path='/dashboard' element={ <Navigate to="/"/> } />
           )}
          <Route path="/profile" element={<Profile action={action} setAction={setAction} />}/>
          <Route path="/user-interface" element={<UserInterface setAction={setAction} action={action} />} />
          </>
        ) : (
          <Route path="/user-interface" element={<Navigate to="/login" />} />
        )}
        </Routes>
    </Router>

  );
}

export default App;
