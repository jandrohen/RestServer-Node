const { response, request} = require("express");
const bcryptjs = require("bcryptjs");
const {validationResult} = require("express-validator");

const User = require("../models/user");

const usersGet = (req = request, res = response) => {

  const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
  res.json({
    message: "get API - controller",
    q,
    nombre,
    apikey,
    page,
    limit
  });
};

const usersPost = async (req, res = response) => {

  const { name, email, password, role } = req.body;
  const user = new User({name, email, password, role});

  // Check if the email exists
  const existEmail = await User.findOne({email});
  if ( existEmail ){
    return res.status(400).json({
      msg: 'Ese correo ya está registrado'
    })
  }

  // Password hashed
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save in the DB
  await user.save();

  res.json({
    user
  });
};

const usersPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    message: "put API - controller",
    id
  });
};

const usersPatch = (req, res = response) => {
  res.json({
    message: "patch API - controller",
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    message: "delete API - controller",
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
