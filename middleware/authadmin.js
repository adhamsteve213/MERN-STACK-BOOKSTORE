import jwt from "jsonwebtoken";

const isAdmin = (req, res, next) => {
  // Check if the user is authenticated
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Check if the user has the admin role
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  // Proceed to the next middleware or route handler
  next();
};

export default isAdmin;
