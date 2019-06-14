const crypto = require('crypto');
const cipher = crypto.createCipher('aes192', 'a password');
const fs = require('fs');
const input = fs.createReadStream('test.js');
const output = fs.createWriteStream('test.enc');

input.pipe(cipher).pipe(output);