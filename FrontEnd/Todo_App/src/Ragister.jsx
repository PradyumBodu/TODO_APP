import React, { useState } from 'react';
import './Ragister.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const submitHandle = async (e) => {
    e.preventDefault();

   

    try{
      const response = await axios.post('http://127.0.0.1:8000/api/register/',{
        username,
        email,
        password
      })
      alert(response.data.message);
      navigate('/login');
    }catch(error){
      console.log(error.response.data);
      alert('Registration failed: ' + JSON.stringify(error.response.data));
      
    }

  }
  
  return (
    <div className="register-container">
      <h2>Create Account</h2>
      <form onSubmit={submitHandle} className="register-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <p className="redirect-text">
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default Register;
