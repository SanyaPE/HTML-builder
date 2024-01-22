const { open } = require('node:fs/promises');
const path = require('path');
let filePath = path.join(__dirname, 'text.txt');

(async () => {
  const file = await open(filePath)
  const stream = file.createReadStream();
  stream.on('data', function (chunk) {
    console.log(chunk.toString());
  });
})();
