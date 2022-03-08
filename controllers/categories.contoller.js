const { response, request} = require("express");
const { Category } = require("../models");

const createCategory = async (req = request, res = response) => {

  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({name});

  if (categoryDB){
    return res.status(400).json({
      msg: `La categoria ${categoryDB.name}, ya existe`
    })
  }

  // Manipulated data for save in DB
  const data = {
    name,
    user: req.userAuth._id
  }

  const category = new Category(data);

  // Save in DB
  await category.save()

  res.status(201).json(category);

};



module.exports = {
  createCategory
};
