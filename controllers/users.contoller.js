const { response, request} = require("express");

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

const usersPost = (req, res = response) => {
  const { nombre,edad } = req.body;

  res.json({
    message: "post API - controller",
    nombre,
    edad
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
