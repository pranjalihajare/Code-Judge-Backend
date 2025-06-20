const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  problem:   { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
  code:      String,
  language:  String,
  result: {
    passed: Number,
    failed: Number,
    details: [
      {
        input: String,
        output: String,
        expected: String,
        status: String // "pass" or "fail"
      }
    ]
  },
  status:    { type: String, enum: ['pending', 'completed', 'error'], default: 'pending' },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
