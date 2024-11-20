const {ensureAuthenticated}=require('../Middlewares/EmpleeVailidation');


const express = require("express");
const router = express.Router();
const { products, getAllEmployees,updateEmployee,deleteEmployee } = require('../Controllers/ProductController');

// Route for creating an employee
router.post("/products", products);
// Route for fetching all employees
router.get("/employees", getAllEmployees);
router.put("/updateEmployee/:id", updateEmployee);
router.delete("/deleteEmployee/:id", deleteEmployee);
module.exports = router;