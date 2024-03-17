import User from "../models/user.model.js";

export const signup = async (req,res) => {
    
    const{username,email,password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password ==='')
    {
        return res.status(400).json({ message :'All field are required'});
    }
    const newUser = new User({
        username,
        email,
        password,
    });
    try {
        await newUser.save();
        res.json('Signup successful');
      } catch (error) {
        next(error);
      }
    };
