const express = require('express');
const patientController = require('../controllers/patient.controller');
const router = express.Router();

router.get('/', patientController.index);

router.post('/', patientController.store);
router.post('/login', patientController.login);

module.exports = router;