const joi = require('joi');
const { Error } = require('mongoose');

const signupValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(50).required(), // Added a valid integer to `max()`
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required(),
    });
    
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error: error.details[0].message }); // Corrected `Error` to `error.details[0].message` for better feedback
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required(),
    });
    
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error: error.details[0].message }); // Corrected `Error` to `error.details[0].message`
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
};
