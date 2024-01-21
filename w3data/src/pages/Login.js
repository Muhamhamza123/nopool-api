import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Welcom.css'; // Make sure the path to your CSS file is correct
import AuthService from '../api-services/AuthService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(null);

  const handleLogin = async () => {
    const { success } = await AuthService.login(username, password);

    if (success) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  if (success) {
    return <Navigate to={`/home/${username}`} />;
  }
  return (
    <div className="welcome-container">
      <ToastContainer />
      <div className="login_form">
        <h1>Login</h1>
        <input 
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>          
      </div>
    </div>
  );
};

export default Login;