'use strict';
const fs = require('fs');

fs.writeFile('output.txt', 'hello world', (err, data) => {
    if (err) throw err;
    console.log('file saved');
})