// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import { handleError, handleSuccess } from '../utils';
// import Navbar from '../navbar/Navbar';
// import EmployeeEditForm from './EmployeeEdit';


// const Home = () => {

//   const navigate = useNavigate();
//   const [loggedInUser, setLoggedInUser] = useState('');

//   // Function to fetch product data if needed (currently commented out)
//   const fetchProduct = async () => {
//     try {
//       // Uncomment and replace with actual API logic when needed
//       // const url = 'http://localhost:3000/products';
//       // const response = await fetch(url, {
//       //   method: 'GET', // Adjust method as needed (e.g., POST)
//       //   headers: {
//       //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       //     'Content-Type': 'application/json'
//       //   }
//       // });
//       // const result = await response.json();
//       // setProducts(result);
//     } catch (err) {
//       handleError(err);
//     }
//   };

//   // useEffect to set the logged-in user and potentially fetch data
//   useEffect(() => {
//     setLoggedInUser(localStorage.getItem('loggedInUser') || 'Guest');
//     fetchProduct();
//   }, []);

//   // Function to handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('loggedInUser');
//     handleSuccess('User Logged out');
//     setTimeout(() => {
//       navigate('/login');
//     }, 1000);
//   };

//   return (
//     <div>
//       <Navbar handleLogout={handleLogout} />
//       <EmployeeEditForm/>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Home;
