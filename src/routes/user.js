const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/getUser', userController.getUserController);
router.post('/createUser', userController.createUserController);
router.put('/:id', userController.updateUserController);
router.delete('/:id', userController.deleteUserController);

module.exports = router;