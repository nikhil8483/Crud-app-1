const EmployeeModel = require("../Models/Employee");
const mongoose = require("mongoose");  // Use mongoose for validation and ObjectId

const products = async (req, res) => {
  try {
    const { name, email, mobile_no, Designation, Gender, Course, image_Upload } = req.body;

    if (!name || !email || !mobile_no || !Designation || !Gender || !Course || !image_Upload) {
      return res.status(400).json({
        message: "All fields are required: name, email, mobile_no, Designation, Gender, Course, image_Upload",
        success: false
      });
    }

    const newEmployee = new EmployeeModel({
      name,
      email,
      mobile_no,
      Designation,
      Gender,
      Course,
      image_Upload
    });

    try {
      await newEmployee.save();
      res.status(201).json({ message: "Employee data submitted successfully", success: true });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({
          message: `An employee with the email ${email} and mobile ${mobile_no} already exists.`,
          success: false
        });
      }
      throw err;
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    const count = await EmployeeModel.countDocuments();

    if (!employees || employees.length === 0) {
      return res.status(404).json({
        message: "No employees found",
        success: false
      });
    }

    res.status(200).json({
      message: "All employees fetched successfully",
      success: true,
      data: employees,
      count:count
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile_no, Designation, Gender, Course, image_Upload } = req.body;

  try {
    if (!name || !email || !mobile_no || !Designation || !Gender || !Course || !image_Upload) {
      return res.status(400).json({
        message: "All fields are required: name, email, mobile_no, Designation, Gender, Course, image_Upload",
        success: false
      });
    }

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      { name, email, mobile_no, Designation, Gender, Course, image_Upload },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
        success: false
      });
    }

    res.status(200).json({
      message: "Employee data updated successfully",
      success: true,
      data: updatedEmployee
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid employee ID format",
      success: false
    });
  }

  try {
    // Use deleteOne with mongoose to delete the employee by ObjectId
    const deletedEmployee = await EmployeeModel.deleteOne({ _id:id});

    if (!deletedEmployee.deletedCount) {
      return res.status(404).json({
        message: "Employee not found",
        success: false
      });
    }

    res.status(200).json({
      message: "Employee data deleted successfully",
      success: true,
      data: deletedEmployee
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  products,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
};
