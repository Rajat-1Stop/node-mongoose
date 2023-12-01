const express = require('express');
const router = express.Router();
const {
    userValidator,
    addUser,
    getUsers,
    deleteUser
} = require('../../controller/admin/user');

router.post('/list', getUsers);
router.post('/add', userValidator,  addUser);

router.delete('/delete/:id', deleteUser);

module.exports = router;
