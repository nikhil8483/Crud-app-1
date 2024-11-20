const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,  // Ensure uniqueness at the database level
    required: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'] // Regex for email validation
  },
  mobile_no: {
    type: String,
    unique: true,  // Ensure uniqueness at the database level
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']  // Simple phone number validation (adjust as needed)
  },
  Designation: {
    type: String,
    required: true
  },
  Gender: {
    type: String,
    required: true
  },
  Course: {
    type: String,
    required: true
  },
  image_Upload: {
    type: String, // Assuming it's a file path or URL as a string
    required: true
  }
}, { timestamps: true }); // Automatically add `createdAt` and `updatedAt` fields

// Create model from schema
const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

module.exports = EmployeeModel;
