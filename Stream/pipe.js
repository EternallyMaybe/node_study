var fs = require('fs');
// var readStream = fs.createReadStream('input.txt');
// var writeStream = fs.createWriteStream('output.txt');

// readStream.pipe(writeStream);
// console.log('执行完毕');
fs.stat('./input.txt', function(err, stat) {
    console.log(err);
    // console.log(stat.isFile());
});