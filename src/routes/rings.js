const express = require('express');
const router = express.Router();
const ringsController = require('../controllers/ringsController');

router.get('/', ringsController.getRingsController);
router.post('/', ringsController.createRingsController);
router.put('/:id', ringsController.updateRingsController);
router.delete('/:id', ringsController.deleteRingsController);

module.exports = router;