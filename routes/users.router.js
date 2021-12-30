const { Router } = require("express");
const {check} = require("express-validator");

const {validateFields} = require("../middlewares/validate-fields");
const {isRoleValid} = require("../helpers/db-validators");

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
    check('role').custom( isRoleValid ),
  validateFields
], usersPost);

router.put("/:id", usersPut);
router.patch("/", usersPatch);
router.delete("/", usersDelete);

module.exports = router;
