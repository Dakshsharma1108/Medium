const { OAuth2Client } = require('google-auth-library');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = async (req, res) => {
  try {
    const { credential, token } = req.body;
    const googleToken = credential || token; // Accept both field names

    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user exists in database
    let user = await prisma.user.findUnique({
      where: { email }
    });

    // If user doesn't exist, create a new one
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          googleId,
          avatar: picture,
          password: null, // Google users don't have passwords
        }
      });
    } else {
      // Update user's Google info if they already exist
      user = await prisma.user.update({
        where: { email },
        data: {
          googleId,
          avatar: picture,
          name,
        }
      });
    }

    // Generate JWT token for our application
    const appToken = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        name: user.name 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Google authentication successful',
      token: appToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({
      success: false,
      message: 'Google authentication failed',
      error: error.message
    });
  }
};

module.exports = { googleAuth };