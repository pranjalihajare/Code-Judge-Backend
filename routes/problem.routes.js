const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middlewares/auth.middleware');
const {
  createProblem, getAllProblems, getProblemById, updateProblem
} = require('../controllers/problem.controller');

router.post('/', authenticate, isAdmin, createProblem);
router.get('/', authenticate, getAllProblems);
router.get('/:id', authenticate, getProblemById);
router.put('/:id', authenticate, isAdmin, updateProblem);

module.exports = router;
