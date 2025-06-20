const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number);
const sum = input[0] + input[1];
console.log(sum);