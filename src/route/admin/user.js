const express = require('express');
const router = express.Router();
const {
    addUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    userValidator,
} = require('../../controller/admin/user');

router.post('/list', getUsers);
router.post('/add', userValidator,  addUser);
router.post('/update', userValidator,  addUser);

router.get('/view/:id', getUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;
