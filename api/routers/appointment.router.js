const express = require('express');
const appointmentController = require('../controllers/appointment.controller')
const router = express.Router();

router.get('/', appointmentController.index);
router.post('/', appointmentController.store);
router.put('/:id', appointmentController.update);

module.exports = router;