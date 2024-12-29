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
    req.body.password = hashedPass;

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

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json({ message: "please provide all data" });
  }
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        return res.status(401).json({ message: "wrong password" });
      } else {
        const token = jwt.sign(
          {
            username: user.username,
            admin: user.isAdmin,
            email: user.email,
            id: user._id,
          },
          process.env.JWTKEY
        );
        return res
          .status(200)
          .json({
            user,
            token,
            message: "user login successfully",
            success: true,
          });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
