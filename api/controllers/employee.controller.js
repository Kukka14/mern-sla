import Employee from "../models/employee.model.js";
import bcryptjs from 'bcryptjs';
import Jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const add = async (req, res, next) => {

    const { name, nic, email, mobile } = req.body;

    // Generate password (4-digit number combination)
    // const generatePass = name + Math.floor(1000 + Math.random() * 9000).toString();
    // const password = bcryptjs.hashSync(generatePass,10);

    const password = name + Math.floor(1000 + Math.random() * 9000).toString();

    const newEmployee = new Employee({ name, nic, email, mobile, password });
    
    try {
        await newEmployee.save();
        res.status(201).json('Employee added');
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {

    const { email, password } = req.body;
    try {
        const validemployee = await Employee.findOne({email});
        if(!validemployee) return next(errorHandler(404, 'User not found'));
        if(!password == validemployee.password) return next(errorHandler('401', 'Wrong Credentials!'));
        const token = Jwt.sign({id: validemployee._id}, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validemployee._doc;
        res
            .cookie('access_token', token, {httpOnly: true})
            .status(200) 
            .json(rest);
    } catch (error) {
        next(error);
    }
};
