const express = require('express');
const router = express.Router();
const braceletsController = require('../controllers/braceletsController');

router.get('/:genero', braceletsController.getBraceletsController);
router.post('/', braceletsController.createBraceletsController);
router.put('/:id', braceletsController.updateBraceletsController);
router.delete('/:id', braceletsController.deleteBraceletsController);

module.exports = router;