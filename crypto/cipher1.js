const crypto = require('crypto');
const cipher = crypto.createCipher('aes192', 'a password');

let encrypted = '';
cipher.on('readable', () => {
    const data = cipher.read();
    console.log(data);
    if (data) {
        encrypted += data.toString('hex');
    }
});
cipher.on('end', () => {
    console.log(encrypted);
})

cipher.write('some text');
cipher.end();