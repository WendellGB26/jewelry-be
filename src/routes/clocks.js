const express = require('express');
const router = express.Router();
const clockController = require('../controllers/clockController');

router.get('/:genero', clockController.getClocksController);
router.post('/', clockController.createClocksController);
router.put('/:id', clockController.updateClocksController);
router.delete('/:id', clockController.deleteClocksController);

module.exports = router;