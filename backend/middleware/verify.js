const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

dotenv.config();
const Prisma = new PrismaClient();

const Verify = async (req, res, next) => {
    try {
		const token = req.headers.authorization;

		if (!token) {
			return res.status(401).json({ message: "Unauthorized - you must be logged in" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await Prisma.user.findUnique({
			where: { id: decoded.userId },
			select: { id: true }
		});

		if (!user) {
			return res.status(401).json({ message: "User not found" });
		}

		req.user = user;
		req.auth = { userId: user.id };
		next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid token" });
	}
};

module.exports = { Verify };