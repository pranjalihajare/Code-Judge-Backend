const Submission = require('../models/submission.model');
const Problem = require('../models/problem.model');
const runCodeInSandbox = require('../utils/sandbox');


exports.submitCode = async (req, res) => {
  const { problemId, code, language } = req.body;
  const socketId = req.headers['x-socket-id'];

  try {
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    if (socketId && global.io) {
      global.io.to(socketId).emit('submission:started', { problemId });
    }

    const results = await runCodeInSandbox(code, problem.testCases, language);

    const passed = results.filter(r => r.status === 'pass').length;
    const failed = results.length - passed;

    const submission = await Submission.create({
      user: req.user.id,
      problem: problemId,
      code,
      language,
      result: { passed, failed, details: results },
      status: 'completed'
    });

    if (socketId && global.io) {
      global.io.to(socketId).emit('submission:completed', { submission });
    }

    res.json(submission);
  } catch (err) {
    if (socketId && global.io) {
      global.io.to(socketId).emit('submission:error', { error: err.message });
    }
    res.status(500).json({ error: 'Submission failed', details: err.message });
  }
};

exports.getUserSubmissions = async (req, res) => {
  const submissions = await Submission.find({ user: req.params.userId }).populate('problem', 'title');
  res.json(submissions);
};