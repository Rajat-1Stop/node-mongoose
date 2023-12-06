const express = require('express');
const router = express.Router();
const {
    addBrand,
    getBrand,
    getBrands,
    deleteBrand,
    brandValidator,
} = require('../../controller/admin/brand');

router.post('/list', getBrands);
router.post('/add', brandValidator,  addBrand);

router.get('/view/:id', getBrand);
router.delete('/delete/:id', deleteBrand);

module.exports = router;
