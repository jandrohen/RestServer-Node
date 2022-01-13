const {response} = require("express");
const jwt = require("jsonwebtoken");

const validateJwt = (req, res = response, next) => {
    const token = req.header('x-token');

    if ( !token ){
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);

        req.uid = uid;

        next();
    }catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token no válido"
        })
    }
}

module.exports = {
    validateJwt
}
