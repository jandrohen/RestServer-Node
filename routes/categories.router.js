const { Router } = require("express");
const {check} = require("express-validator");

const { validateFields } = require('../middlewares')


const router = Router();

// Get all categories
router.get("/", (req, res) => {
    res.json('get');
});

// Get one category for id-public
router.get("/:id", (req, res) => {
    res.json('get-id');
} );

// Create category - private - any person with token validated
router.post("/", (req, res) => {
    res.json('post');
} );

// Update category - private - any person with token validated
router.put("/:id", (req, res) => {
    res.json('put');
} );

// Delete one category - private - Admin user
router.delete("/:id", (req, res) => {
    res.json('delete');
} );



module.exports = router;
