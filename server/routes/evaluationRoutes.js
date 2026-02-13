const express = require('express');
const router = express.Router();
const { evaluate, getEvaluation } = require('../controllers/evaluationController');
const auth = require('../middleware/auth');

router.post('/', auth, evaluate);
router.get('/', auth, getEvaluation);

module.exports = router;
