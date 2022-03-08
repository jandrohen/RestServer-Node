const { response } = require("express");
const {User, Category, Product} = require("../models");
const { ObjectId } = require('mongoose').Types

const validsCollections = [
    'users',
    'categories',
    'products',
    'roles'
]

const searchUsers = async (term = '', res = response) =>{
  const isMongoId = ObjectId.isValid( term );

  if ( isMongoId ) {
    const user = await User.findById(term);
    return  res.json({
      results: ( user ) ? [ user ] : []
    })
  }

  const regex = new  RegExp(term, 'i')

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }]
  });

  res.json({
    results: users
  })
}


const search = async (req , res = response) => {
  const { collection, term } = req.params;

  if ( !validsCollections.includes( collection )){
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${validsCollections}`
    })
  }

  switch (collection) {
    case 'users':
      await searchUsers(term,res);
      break;
    case 'categories':
      break;
    case 'products':
      break;
    default:
      res.status(500).json({
        msg: 'Hable con el admin sobre las búsquedas'
      })
  }

};



module.exports = {
  search
};
