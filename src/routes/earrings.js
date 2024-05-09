const express = require('express');
const router = express.Router();
const earringsController = require('../controllers/earringsController');

router.get('/', earringsController.getEarringsController);
router.post('/', earringsController.createEarringsController);
router.put('/:id', earringsController.updateEarringsController);
router.delete('/:id', earringsController.deleteEarringsController);

module.exports = router;