const { Router } = require("express");
const {check} = require("express-validator");

const {validateFields} = require("../middlewares/validate-fields");
const {validateJWT} = require("../middlewares/validate-jwt");
const {isAdminRole} = require("../middlewares/validate-roles");

const {isRoleValid, existEmail, existUserId} = require("../helpers/db-validators");

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
    check('name', 'El name es obligatorio').notEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({min: 6}),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom( existEmail ),
    check('role').custom( isRoleValid ),
  validateFields
], usersPost);

router.put("/:id",[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existUserId ),
    check('role').custom( isRoleValid ),
    validateFields
], usersPut);

router.patch("/", usersPatch);

router.delete("/:id",[
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existUserId ),
    validateFields
], usersDelete);

module.exports = router;
