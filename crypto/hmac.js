const crypto = require('crypto');
const txt = '1234567890';
const salt = 'abcdefghijklmnopqrstuvwxyz';

crypto.pbkdf2(txt, salt, 4096, 256, 'sha256', function(err, hash) {
    if (err) throw err;
    console.log('hash:', hash.toString('hex'));
});

const hmac = crypto.createHmac('sha256', salt);
hmac.update(txt);
console.log('hmac:', hmac.digest('hex'));