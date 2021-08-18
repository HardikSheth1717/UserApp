const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/users', userController.getUserList);

router.get('/userdetail/:userId', userController.getUserDetails);

router.get('/add-user', userController.addNewUser);

router.post('/saveuser', userController.saveUser);

router.get('/viewuser/:userId', userController.viewUserDetails);

router.post('/deleteuser', userController.deleteUser);

module.exports = router;