/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// eslint-disable-next-line no-unused-vars
import { handleError, handleSuccess } from '../utils';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');

  // useEffect to set the logged-in user
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser') || 'Guest');
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <>
      <div>
        <div className="navbar-container">
          {/* Left side links */}
          <ul className="navbar-links">
            <li>
              <Link to="/Employeeform">Home</Link>
            </li>
            <li>
              <Link to="/Dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/EmployeeList">Employee List</Link>
            </li>
          </ul>

          {/* Right side user info and logout */}
          <ul className="navbar-user-info">
            <li><bold> {loggedInUser}</bold>
              </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;
