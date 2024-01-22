const { createReadStream } = require('fs');
const path = require('path');
let filePath = path.join(__dirname, 'text.txt');

(async () => {
  const stream = createReadStream(filePath, 'utf8');
  stream.pipe(process.stdout);
})();
