const { response, request, json} = require("express");
const bcryptjs = require('bcryptjs');

const User = require("../models/user");
const {generateJwt} = require("../helpers/generate-jwt");
const {googleVerify} = require("../helpers/google-verify");

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

const googleSignIn = async (req, res = response) => {

  const { id_token } = req.body;

  try {

    const { name, img, email} = await googleVerify( id_token );

    res.json({
      msg: 'Todo bien!',
      id_token
    })

  } catch (error) {
    json.status(400).json({
      ok: false,
      msg: 'El token no se pudo verificar'
    })
  }

}

module.exports = {
  login,
  googleSignIn
};
