import asyncHanlder from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHanlder(async (req, res) => {
  //console.log(req.body);

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    // set JWT as HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.MODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dages
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc register user
// @route POST /api/users
// @access Public
const registerUser = asyncHanlder(async (req, res) => {
  res.send("register user");
});

// @desc logout user / clear cookie
// @route POST /api/users/logout
// @access private
const logoutUser = asyncHanlder(async (req, res) => {
  res.send("logout user");
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHanlder(async (req, res) => {
  res.send(" get user profile");
});

// @desc Update  user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHanlder(async (req, res) => {
  res.send(" upadate user profile");
});

// @desc GET  users
// @route GET /api/users
// @access Private/admin
const getUsers = asyncHanlder(async (req, res) => {
  res.send("get users");
});

// @desc DELETE  users
// @route DELETE /api/users/:id
// @access Private/admin
const deleteUser = asyncHanlder(async (req, res) => {
  res.send("delete user");
});

// @desc Get user by id
// @route GET /api/users/:id
// @access Private/admin
const getUserById = asyncHanlder(async (req, res) => {
  res.send(" get user by id");
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/admin
const updateUser = asyncHanlder(async (req, res) => {
  res.send(" update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserById,
  getUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  updateUserProfile,
};
