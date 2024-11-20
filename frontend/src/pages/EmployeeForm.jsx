import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils'; // Assuming you have these helper functions for showing toast notifications.
const EmployeeForm = () => {
  // State to store form data
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    Designation: '',
    Gender: '',
    Course: '', 
    image_Upload: '', 
  });

  // Handle changes in form fields (except file input)
  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (type === 'checkbox') {
      // Ensure only one checkbox can be selected at a time for "Course"
      setEmployeeData((prevData) => ({
        ...prevData,
        Course: checked ? value : '', 
      }));
    } else {
      setEmployeeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle image upload (file input)
  const handleImageUpload = (e) => {
    const { files } = e.target;
    const file = files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmployeeData((prevData) => ({
          ...prevData,
          image_Upload: reader.result, // Base64 string of the image
        }));
      };
      reader.readAsDataURL(file); // Read the file as Base64 string
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: check if all required fields are filled
    const { name, email, mobile_no, Designation, Gender, Course, image_Upload } = employeeData;
    if (!name || !email || !mobile_no || !Designation || !Gender || Course.length === 0 || !image_Upload) {
      handleError('Please fill in all fields.');
      return;
    }

    const dataToSend = {
      name,
      email,
      mobile_no,
      Designation,
      Gender,
      Course, // Convert the Course array to a comma-separated string
      image_Upload, // Send the Base64 encoded image
    };

    try {
      const response = await fetch('https://crud-app-1-api.vercel.app/?vercelToolbarCode=QcHcmEBps1qOiNS/products/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend), // Send the data as JSON
      });

      const result = await response.json();

      if (result.success) {
        handleSuccess('Employee added successfully!');
        setEmployeeData({
          name: '',
          email: '',
          mobile_no: '',
          Designation: '',
          Gender: '',
          Course: '',
          image_Upload: '',
        }); 
      } else {
        handleError(result.message);
      }
    } catch (err) {
      handleError('An error occurred while submitting the form.');
    }
  };

  return (
    <>
      <div className="container" style={{ width: '70%', maxWidth: '800px', margin: '50px auto',  padding: '30px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Add Employee</h1>
        <form onSubmit={handleFormSubmit}>
          {/* Name */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Name:</label>
            <input
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Email:</label>
            <input
              type="email"
              name="email"
              value={employeeData.email}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </div>

          {/* Mobile No */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Mobile No:</label>
            <input
              type="text"
              name="mobile_no"
              value={employeeData.mobile_no}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </div>

          {/* Designation */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Designation:</label>
            <select
              name="Designation"
              value={employeeData.Designation}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Other">Sales</option>
            </select>
          </div>

          {/* Gender */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Gender:</label>
            <div>
              <label style={{ marginRight: '10px' }}>
                <input
                  type="radio"
                  name="Gender"
                  value="Male"
                  checked={employeeData.Gender === 'Male'}
                  onChange={handleInputChange}
                  required
                  style={{ marginRight: '5px' }}
                />
                Male
              </label>
              <label style={{ marginRight: '10px' }}>
                <input
                  type="radio"
                  name="Gender"
                  value="Female"
                  checked={employeeData.Gender === 'Female'}
                  onChange={handleInputChange}
                  required
                  style={{ marginRight: '5px' }}
                />
                Female
              </label>
            </div>
          </div>

          {/* Course */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Course:</label>
            <div>
              <label style={{ marginRight: '10px' }}>
                <input
                  type="checkbox"
                  name="Course"
                  value="MCA"
                  checked={employeeData.Course === 'MCA'}
                  onChange={handleInputChange}
                  style={{ marginRight: '5px' }}
                />
                MCA
              </label>
              <label style={{ marginRight: '10px' }}>
                <input
                  type="checkbox"
                  name="Course"
                  value="BCA"
                  checked={employeeData.Course === 'BCA'}
                  onChange={handleInputChange}
                  style={{ marginRight: '5px' }}
                />
                BCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Course"
                  value="BSC"
                  checked={employeeData.Course === 'BSC'}
                  onChange={handleInputChange}
                  style={{ marginRight: '5px' }}
                />
                BSC
              </label>
            </div>
          </div>

          {/* Image Upload */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Image Upload:</label>
            <input
              type="file"
              name="image_Upload"
              accept=".jpg, .png"
              onChange={handleImageUpload}
              required
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </div>

          {/* Display Image Preview */}
          {employeeData.image_Upload && (
            <div style={{ marginTop: '10px' }}>
              <img
                src={employeeData.image_Upload}
                alt="Image Preview"
                style={{ width: '150px', height: '150px', objectFit: 'cover', marginBottom: '15px' }}
              />
            </div>
          )}

          <button
            type="submit"
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              fontSize: '16px',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Add Employee
          </button>
        </form>

        <ToastContainer />
      </div>
    </>
  );
};

export default EmployeeForm;
