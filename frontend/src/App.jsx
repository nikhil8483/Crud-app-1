/* eslint-disable react/prop-types */
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Login from './auth/Login';
import Signup from './auth/Signup';
import EmployeeForm from './pages/EmployeeForm';
import Dashboard from './dashboard/Dashboard';
import ParentRout from './pages/ParentRout';
import EmployeeList from './pages/EmpoyeeList';
import EmployeeEditForm from './pages/EmployeeEdit';
import RefresHandler from './RefresHandler/RefresHandler';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <RefresHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Nested Protected Routes */}
        <Route path="/" element={<ParentRout />}>
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="Employeeform"
            element={
              <PrivateRoute>
                <EmployeeForm />
              </PrivateRoute>
            }
          />
          <Route
            path="employeeList"
            element={
              <PrivateRoute>
                <EmployeeList />
              </PrivateRoute>
            }
          />
          <Route
            path="EditForm"
            element={
              <PrivateRoute>
                <EmployeeEditForm />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
