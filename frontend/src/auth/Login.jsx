import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

import { handleError, handleSuccess } from '../utils';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {email, password } = login;
    if (!email || !password) {
      return handleError('email, and password are required');
    }

    try {
      const url_login="https://crud-app-1-api.vercel.app/auth/login";
      const response = await fetch(url_login, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login)
      });
      const result = await response.json();
      const{message,success,name,token}=result;
      console.log(name);
    
      if(success){
        handleSuccess(message);
        localStorage.setItem('token',token);
        localStorage.setItem('loggedInUser',name);

        setTimeout(()=>{
          navigate("/dashboard")
        },1000)
       
      }
      else{
        handleSuccess(message);
      }
        
    } catch (err) {
      handleError('err');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f4f7fc',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#333',
          marginBottom: '20px',
          textAlign: 'center'
        }}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{
              display: 'block',
              fontSize: '1rem',
              color: '#555',
              marginBottom: '5px'
            }}>Email</label>
            <input
              type="email"
              onChange={handleChange}
              name='email'
              value={login.email}
              placeholder='Enter your email'
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                marginTop: '5px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password" style={{
              display: 'block',
              fontSize: '1rem',
              color: '#555',
              marginBottom: '5px'
            }}>Password</label>
            <input
              type="password"
              onChange={handleChange}
              name='password'
              value={login.password}
              placeholder='Enter your password'
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                marginTop: '5px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button type='submit' style={{
            width: '100%',
            padding: '14px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#4caf50',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
            transition: 'background-color 0.3s ease'
          }}>Login</button>
          <span style={{
            display: 'block',
            textAlign: 'center',
            marginTop: '15px',
            fontSize: '0.9rem'
          }}>
            Do not have an account? 
            <Link to="/Signup" style={{
              color: '#4caf50',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>Signup</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
