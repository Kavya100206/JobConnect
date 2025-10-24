import genToken from "../config/token.js";
import bcrypt from "bcryptjs";
import { Applicant, Recruiter, User } from "../models/user.model.js";

//signUp

export const signUp = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    skills,
    resume,
    company,
    location,
  } = req.body;
  try {
    //all fields are required
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    //password length should be atleast 6 characters
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be atleast 6 characters" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    if (role === "applicant") {
      const formattedSkills = Array.isArray(skills)
        ? skills
        : skills?.split(",").map((skill) => skill.trim());

      newUser = await Applicant.create({
        name,
        email,
        password: hashedPassword,
        skills: formattedSkills,
        resume,
      });
    } else if (role === "recruiter") {
      newUser = await Recruiter.create({
        name,
        email,
        password: hashedPassword,
        company,
        location,
      });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    const token = genToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.send(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//login

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //all fields are required
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    //conmpare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Password Incorrect" });
    }
    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });
    res.status(200).json({
      message: "Login successful",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
