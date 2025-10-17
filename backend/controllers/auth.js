// import { Prisma } from '@prisma/client';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const Prisma = new PrismaClient();

function ExistingUser(email) {
  return Prisma.user.findUnique({
    where: { email },
  });
}

const Signup = async (req, res) => {
  const { email, name, password } = req.body;

  const existingUser = await ExistingUser(email);
  if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      jwt: token,
      message:"Account Created Successfully"
    });
    console.log(token)
  } catch (e) {
    res.status(411).json({
      message :`Error in Creating Account ${e}`
    });
  }
};

const Signin = async (req, res) => {
  const { email, password } = req.body;
  try{
  const user = await ExistingUser(email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
 res.json({
      jwt: token,
      message:"Login Successfully"
    });
  }catch(e){
   res.status(411).json({
      message :`Error in Login ${e}`
    });
  }
};

const Me = async (req, res) => {
  try {
    const userid = req.auth.userid;
    const user = await Prisma.user.findUnique({
      where: { id: userid },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.json({
      success: true,
      user: user
    });

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid token" 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: "Token expired" 
      });
    }
    
    console.error("Auth verification error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

module.exports = { Signin, Signup, Me };


