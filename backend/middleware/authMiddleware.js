const jwt = require('jsonwebtoken');
const User = require('../models/User');
// Middleware: Authentication Middleware (protect)
// -----------------------------------------------------------------------------
// Middleware: Authentication Middleware (protect)
// This middleware verifies JWT tokens sent from the client. It checks for a
// valid Authorization header, decodes the token, and loads the associated user.
// If authentication fails, the request is blocked with a 401 Unauthorized error.
// Used to safeguard private API routes that require a logged-in user.
// -----------------------------------------------------------------------------

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };