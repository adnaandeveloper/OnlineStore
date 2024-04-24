import jwt from "jsonwebtoken";

import asyncHanlder from "./asyncHandler.js";

import User from "../models/userModel.js";

//Protect routes

const protect = asyncHanlder(async (req, res, next) => {
  let token;
  // read the jwt from the coopie
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Authentication, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Authentication, no token");
  }
});

// admin middleware

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin !");
  }
};

export { protect, admin };
