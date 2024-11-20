import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './employee-list.css'; // Import the CSS file

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [count, setCount] = useState(0); // State for the count
  const [searchKeyword, setSearchKeyword] = useState(''); // State for search keyword

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://crud-app-1-api.vercel.app/?vercelToolbarCode=QcHcmEBps1qOiNS/products/employees', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const { data, count } = await response.json();
        setEmployees(data);
        setFilteredEmployees(data); // Initialize with all employees
        setCount(count); // Set the count
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchKeyword(keyword);

    // Filter employees by name, email, or any other field
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(keyword) ||
      employee.email.toLowerCase().includes(keyword) ||
      employee.mobile_no.toLowerCase().includes(keyword)
    );
    setFilteredEmployees(filtered);
  };

  const EditEmployee = (employeeId) => {
    navigate('/EditForm', { state: { employeeId: employeeId } });
  };

  const deleteEmployee = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:3000/products/deleteEmployee/${employeeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== employeeId)
        );
        setFilteredEmployees((prevFiltered) =>
          prevFiltered.filter((employee) => employee._id !== employeeId)
        );
        setCount((prevCount) => prevCount - 1); // Update count
      } else {
        const errorData = await response.json();
        console.error('Error deleting employee:', errorData.message);
      }
    } catch (err) {
      console.error('Network error or server failure:', err);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options).replace(/ /g, '-');
  };

  return (
    <div className="container">
      <h1>Employee List</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h2>
          <Link to="/Employeeform" style={{ color: 'white', textDecoration: 'none' }}>
            Create Employee
          </Link>
        </h2>
        <h2>Total Count: {count}</h2>
        </div>
        <div>
      <input
        type="text"
        placeholder="Search by name, email, or mobile..."
        value={searchKeyword}
        onChange={handleSearch}
        className="search-input"
      />
      <div>
        
      </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Unique id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{employee._id}</td>
                <td>
                  {employee.image_Upload ? (
                    <img src={employee.image_Upload} alt={`Employee ${index}`} />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile_no}</td>
                <td>{employee.Designation}</td>
                <td>{employee.Gender}</td>
                <td>{employee.Course}</td>
                <td>{formatDate(employee.createdAt)}</td>
                <td>
                  <button className="edit" onClick={() => EditEmployee(employee._id)}>
                    Edit
                  </button>
                  <button className="delete" onClick={() => deleteEmployee(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
  );
};

export default EmployeeList;
