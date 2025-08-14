import React, { useState } from "react";
import "./Login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try{
      const response = await axios.post('http://127.0.0.1:8000/api/token/',{
        username,
        password,
      });
      localStorage.setItem('access',response.data.access);
      localStorage.setItem('refresh',response.data.refresh);
      
      alert('Login SuccessFull');
      navigate('/Todopage');
    }catch(error){
      console.log(error.response.data);
      alert('Registration failed: ' + JSON.stringify(error.response.data));
    }
    // Here you can call your API for login
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p className="register-text">
          Don't have an account? <a href="/ragister">Register</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
