import User from "../models/User.js"
import { createError } from "../utils/error.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try{
        const newUser  = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        res.status(201).json(user);
    }catch(err){
        next(err);
    }
}

export const login = async (req, res, next) => {

    try{
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(createError(400, "Invalid credentials"));        
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

    if(!isPasswordCorrect){
        return next(createError(400, "Wrong username or password"));
    }

    const token = JWT.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET);                                                               

    const {password, isAdmin, ...others} = user._doc;
    res.cookie("access_token", token, {
        httpOnly: true,
    }).status(200).json({...others});
    }catch(err){
        next(err);
    }
}