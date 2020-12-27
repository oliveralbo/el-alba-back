const express = require("express");
const app = express();
const Usuario = require("../models/user");
const login =require('../controllers/loginController')



app.post("/login", (req,res) => login(req, res, Usuario));

module.exports = app;
