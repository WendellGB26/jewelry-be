const express = require('express');
const router = express.Router();
const necklacesController = require('../controllers/necklacesController');

router.get('/', necklacesController.getNecklacesController);
router.post('/', necklacesController.createNecklacesController);
router.put('/:id', necklacesController.updateNecklacesController);
router.delete('/:id', necklacesController.deleteNecklacesController);

module.exports = router;