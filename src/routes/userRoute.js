const express = require("express");
const userRoute = express.Router();
const {signup, signin, deleteAccount} = require("../controllers/userController");
const { sign } = require("crypto");

userRoute.post("/signup", signup)

userRoute.post("/signin", signin)
userRoute.delete("/delete", deleteAccount)

module.exports = userRoute;