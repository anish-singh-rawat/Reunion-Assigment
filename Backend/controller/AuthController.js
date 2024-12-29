import UserModel from "../models/userModel.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const existUser = await UserModel.findOne({ email });

    if (existUser) {
      return res
        .status(400)
        .json({ message: "User already exist with this email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new UserModel({ name, password : hashedPass, email });
    await newUser.save();
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWTKEY);
    return res.status(200).json({ token, message: "user register successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(password)
    console.log(user.password)

    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(isValidPassword)
    if (!isValidPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWTKEY);

    return res.status(200).json({
      token,
      message: "User logged in successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
