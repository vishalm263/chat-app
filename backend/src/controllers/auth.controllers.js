import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { v2 as cloudinary } from "cloudinary";  

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if(!fullName || !email || !password) {
      return res.status(400).json({message: "All fields are required"});
    }
    if(password.length < 6) {
      return res.status(400).json({message: "Password must be at least 6 characters long"});
    }
    const existingUser = await User.findOne({email});
    if(existingUser) {
      return res.status(400).json({message: "User already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password:hashedPassword,
    })
    if(newUser) {
      generateToken(res, newUser._id);
      await newUser.save();

      

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res.status(400).json({message: "Invalid user data"});
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({message: "All fields are required"});
    }
    const user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({message: "Invalid Credentials"});
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) {
      return res.status(400).json({message: "Invalid Credentials"});
    }
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {maxAge: 0});
    res.status(200).json({message: "Logged out successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.user._id;
    if(!profilePicture) {
      return res.status(400).json({message: "Profile picture is required"});
    }
    const uploadedResponse = await cloudinary.uploader.upload(profilePicture, {
      folder: "profile-pictures",
    });
    const updatedUser = await User.findByIdAndUpdate(userId, {
      profilePicture: uploadedResponse.secure_url,
    }, {new: true});
    res.status(200).json({message: "Profile updated successfully", updatedUser});
  } catch (error) {
    console.log("Error in updateProfile controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({message: "Internal server error"});
  }
};


export default { signup, login, logout, updateProfile, checkAuth };
