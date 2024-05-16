import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "employee"
    },
    position: {
        type: String,
    },
    basicSlary:{
        type:Number,
    }
}, {timestamps: true});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;