const net = require('net');
const client = net.connect({port: 60300});

client.on('data', data => {
    let message = JSON.parse(data);
    console.log(message);
    if (message.type === 'watching') {
        console.log(`Now watching: ${message.file}`);
    } else if (message.type === 'changed') {
        const date = new Date(message.timetamp);
        console.log(`File changed:${date}`);
    } else {
        console.log(`Unrecognized message type: ${message.type}`);
    }
})