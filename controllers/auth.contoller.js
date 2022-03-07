const { response, request} = require("express");
const bcryptjs = require('bcryptjs');

const User = require("../models/user");
const {generateJwt} = require("../helpers/generate-jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {

    //Verify email exist
    const user = await  User.findOne({email});
    if ( !user ){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - email'
      })
    }

    //State user active
    if ( !user.state ){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - state'
      })
    }

    //Verify password valid
    const validPassword = bcryptjs.compareSync( password, user.password);
    if ( !validPassword ){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password'
      })
    }

    //Generate JWT
    const token = await generateJwt(user.id);


    res.json({
      user,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hable con el administrador"
    });
  }
};

const googleSignIn = (req, res = response) => {

  const { id_token } = req.body;

  res.json({
    msg: 'Todo bien!',
    id_token
  })
}

module.exports = {
  login,
  googleSignIn
};
