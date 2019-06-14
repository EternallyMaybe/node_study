const crypto = require('crypto');
const fs = require('fs');

function signer(algorithm, key, data) {
    let sign = crypto.createSign(algorithm);

    sign.update(data);
    sign = sign.sign(key, 'hex');

    return sign;
}

function verify(algorithm, pub, sign, data) {
    const verify = crypto.createVerify(algorithm);

    verify.update(data);
    return verify.verify(pub, sign, 'hex');
}

const algorithm = 'RSA-SHA256';
const data = 'abcdef';
const privatePem = fs.readFileSync('server.pem');
const key = privatePem.toString();
const sign = signer(algorithm, key, data);
console.log('sign:', sign);
const publicPem = fs.readFileSync('cert.pem');
const pub = publicPem.toString();
console.log(verify(algorithm, pub, sign, data));
console.log(verify(algorithm, pub, sign, `${data}2`));