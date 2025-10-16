
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const { Verify } = require("./middleware/verify");
const blogRoutes = require("./routes/blog.routes");

require('dotenv').config();

const prisma = new PrismaClient();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);

app.post('/test', Verify, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})