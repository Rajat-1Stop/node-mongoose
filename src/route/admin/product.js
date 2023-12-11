const express = require('express');
const router = express.Router();
const {
    addProduct,
    getProduct,
    getProducts,
    deleteProduct,
    addInventory,
    deleteInventory,
    productValidator,
    inventoryValidator,
    getProductInventories
} = require('../../controller/admin/product');

router.post('/list', getProducts);
router.post('/add', productValidator,  addProduct);

router.get('/view/:id', getProduct);
router.delete('/delete/:id', deleteProduct);

// ========== Product Inventory ==========

router.post('/inventory/list', inventoryValidator,  getProductInventories);
router.post('/inventory/add', inventoryValidator,  addInventory);
router.delete('/inventory/delete/:id', deleteInventory);

module.exports = router;
