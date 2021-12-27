const { response } = require("express");

const usersGet = (req, res = response) => {
  res.json({
    message: "get API - controller",
  });
};

const usersPost = (req, res = response) => {
  const { nombre,edad } = req.body;

  res.json({
    message: "post API - controller",
    nombre,
    edad
  });
};

const usersPut = (req, res = response) => {
  res.json({
    message: "put API - controller",
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
