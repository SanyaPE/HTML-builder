const fs = require('fs');
const path = require('path');
let filePath = path.join(__dirname, 'text.txt');
let readableStream = fs.createReadStream(filePath, 'utf8');
readableStream.on('data', function (chunk) {
  console.log(chunk);
});
