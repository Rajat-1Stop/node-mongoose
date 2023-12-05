const express = require('express');
const router = express.Router();
const {
    addProduct,
    getProduct,
    getProducts,
    deleteProduct,
    productValidator,
} = require('../../controller/admin/product');

router.post('/list', getProducts);
router.post('/add', productValidator,  addProduct);

router.get('/view/:id', getProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
