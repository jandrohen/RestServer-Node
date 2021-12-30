const { Router } = require("express");
const {check} = require("express-validator");
const  Role = require("../models/role");

const {validateFields} = require("../middlewares/validate-fields");

const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require("../controllers/users.contoller");

const router = Router();

router.get("/", usersGet);
router.post("/", [
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({min: 6}),
    check('email', 'El correo no es valido').isEmail(),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( async (role = '') =>{
        const existRole = await Role.findOne({role});
        if (!existRole){
            throw new Error(`El rol ${ role } no existe en la BD`)
        }
    }),
  validateFields
], usersPost);
router.put("/:id", usersPut);
router.patch("/", usersPatch);
router.delete("/", usersDelete);

module.exports = router;
