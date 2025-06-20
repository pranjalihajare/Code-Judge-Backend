const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: String,
  expectedOutput: String,
});

const problemSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  String,
  inputFormat:  String,
  outputFormat: String,
  constraints:  String,
  testCases:    [testCaseSchema],
  difficulty:   { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' }
}, { timestamps: true });

module.exports = mongoose.model('Problem', problemSchema);
