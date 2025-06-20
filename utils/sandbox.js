const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports = async function runCodeInSandbox(code, testCases, language) {
  const filePath = path.join(__dirname, 'tempCode.js');
  fs.writeFileSync(filePath, code);

  const results = await Promise.all(testCases.map(tc => {
    return new Promise((resolve) => {
      exec(`node ${filePath}`, { input: tc.input }, (err, stdout, stderr) => {
        const output = stdout.trim();
        const expected = tc.expectedOutput.trim();
        resolve({
          input: tc.input,
          output,
          expected,
          status: output === expected ? 'pass' : 'fail',
          error: stderr || err?.message || null
        });
      });
    });
  }));

  fs.unlinkSync(filePath);
  return results;
};
