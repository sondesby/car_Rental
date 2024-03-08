require('dotenv').config()
const jwt = require('jsonwebtoken');

//verify reset password token
exports.verifyResetPassword = (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || req.headers.Authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.FORGOT_PASS_KEY, (err, decoded) => {
          if (err) {
            res.status(401).json({ error: "Token expired" });
          }
          req.userId = decoded.id;
          next();
        });
      } else {
        res.status(401).json({
          error: "Authorization header missing or not formatted correctly",
        });
      }
    } catch (error) {
      next(error);
    }
  };