const { Router } = require("express");
const {check} = require("express-validator");

const { validateFields } = require('../middlewares')
const { uploadFile, updateImage} = require("../controllers/uploads.contoller");
const {permittedCollection} = require("../helpers");


const router = Router();

router.post('/', uploadFile);

router.put('/:collection/:id',[
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom(c => permittedCollection(c ,['users', 'products'])),
    validateFields
], updateImage);

module.exports = router;
