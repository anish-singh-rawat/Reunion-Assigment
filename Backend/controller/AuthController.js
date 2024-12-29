import UserModel from "../models/userModel.js";
import dotenv from "dotenv";
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

    const newUser = new UserModel({ name, password, email });
    await newUser.save();
    return res.status(200).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
