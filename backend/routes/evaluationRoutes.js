const express = require('express');
const router = express.Router();
const { evaluate, getEvaluation, getHistory } = require('../controllers/evaluationController');
const auth = require('../middleware/auth');

router.post('/', auth, evaluate);
router.get('/', auth, getEvaluation);
router.get('/history', auth, getHistory);

module.exports = router;
