import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { useLocation } from 'react-router-dom';

const EmployeeEditForm = () => {
  const location = useLocation();
  const { state } = location;

  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    Designation: '',
    Gender: '',
    Course: [],
    image_Upload: '',
  });

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    if (type === 'checkbox') {
      setEmployeeData((prevData) => {
        const updatedCourses = checked
          ? [...prevData.Course, value]
          : prevData.Course.filter((course) => course !== value);
        return { ...prevData, Course: updatedCourses };
      });
    } else {
      setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmployeeData((prevData) => ({ ...prevData, image_Upload: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

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
      Course: Course.join(', '),
      image_Upload,
    };

    try {
      const response = await fetch(`https://crud-app-1-api.vercel.app/?vercelToolbarCode=QcHcmEBps1qOiNS/products/updateEmployee/${state.employeeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        handleSuccess('Employee updated successfully!');
        setEmployeeData({
          name: '',
          email: '',
          mobile_no: '',
          Designation: '',
          Gender: '',
          Course: [],
          image_Upload: '',
        });
      } else {
        handleError(result.message || 'Failed to update employee.');
      }
    } catch (error) {
      handleError('An error occurred while updating the employee.');
    }
  };

  return (
    <div className="container" style={{ width: '70%', maxWidth: '800px', margin: '30px auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Edit Employee</h1>

      <form onSubmit={handleFormSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Name:</label>
          <input
            type="text"
            name="name"
            value={employeeData.name}
            onChange={handleInputChange}
            placeholder="Enter employee name"
            required
            style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleInputChange}
            placeholder="Enter employee email"
            required
            style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Mobile No:</label>
          <input
            type="text"
            name="mobile_no"
            value={employeeData.mobile_no}
            onChange={handleInputChange}
            placeholder="Enter employee mobile number"
            required
            style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Designation:</label>
          <select
            name="Designation"
            value={employeeData.Designation}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
          >
            <option value="" disabled>Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

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

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Course:</label>
          <div>
            <label style={{ marginRight: '10px' }}>
              <input
                type="checkbox"
                name="Course"
                value="MCA"
                checked={employeeData.Course.includes('MCA')}
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
                checked={employeeData.Course.includes('BCA')}
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
                checked={employeeData.Course.includes('BSC')}
                onChange={handleInputChange}
                style={{ marginRight: '5px' }}
              />
              BSC
            </label>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Image Upload:</label>
          <input type="file" name="image_Upload" accept="image/*" onChange={handleImageUpload} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }} />
        </div>

        {employeeData.image_Upload && (
          <div style={{ marginTop: '10px' }}>
            <img
              src={employeeData.image_Upload}
              alt="Preview"
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}
            />
          </div>
        )}

        <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '12px 20px', fontSize: '16px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>Update Employee</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default EmployeeEditForm;
