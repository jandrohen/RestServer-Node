const { Router } = require("express");
const {check} = require("express-validator");

const {login} = require("../controllers/auth.contoller");
const { validateFields } = require('../middlewares/validate-fields');


const router = Router();

router.post("/login",[
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'El password no es valido').notEmpty(),
    validateFields
], login);

module.exports = router;
