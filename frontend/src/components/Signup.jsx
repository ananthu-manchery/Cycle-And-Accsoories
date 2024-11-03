//signup.jsx
import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios';



export default function Signup() {
  const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState("");
    const [popUpVisible, setPopupVisible] = useState(false);
    const navigate = useNavigate();


    const handleSubmit=(e)=>{
      e.preventDefault();
      setLoading(true);
      axios.post('http://localhost:5000/api/users/signup',{name,email,password})
      .then(res=>{
        console.log(res.data);
        setPopupVisible(true)
        setShowPopup(`${name} has been registred successfullly !! you will be redirected to Login page`)
        setTimeout(()=>{
          setPopupVisible(false)
          navigate('/signin')
        },3000)
      })
      .catch(err=>{
        console.log(err);
        setShowPopup("Error: failed to registred user. please try again")
        setPopupVisible(true);
        setTimeout(() => {
          setPopupVisible(false)
          
        }, 3000);
        
      })
      .finally(()=>setLoading(false));

    }
  return (
    <>
    <div id="signin-container">
      <div id="header">
        <h1 id="signin-title">Sign up</h1>
      </div>
      <div id="form-container">
        <form id="signin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            name='name'
            required
            onChange={(e)=>setName(e.target.value)}
            value={name}
            id="name-input"
          />
          
          <input
            type="email"
            placeholder="Enter your email id"
            id="email-input"
            name='email'
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            name='password'
            id="password-input"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            required
          />
          <button className='signup-btn'>Sign up</button>
        </form>
       
      </div>
      <p><h6>Already Have an Account? please log in here </h6> <Link to="/signin" className='log-in'>
                    Login
                </Link>
      </p>
               
    </div>
    
       
    </>
    )
}
