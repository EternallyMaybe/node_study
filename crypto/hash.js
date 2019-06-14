const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const fs = require('fs');

hash.write('write data');
hash.update('update data1');
// hash.update('update data2');
console.log('1:', hash.digest('hex'));