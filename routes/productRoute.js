const express = require('express');
const router = express.Router();
const {getAllProducts, createProduct, getProductById, updateProduct, deleteProduct} = require('../controllers/productController');

router.route('/')
    .get(getAllProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;
