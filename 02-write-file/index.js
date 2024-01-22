const { stdin, stdout } = process;
const { appendFile } = require('node:fs/promises');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');

(async () => {
  try {
    stdout.write("enter text or press 'ctrl+C' to exit and save\n");
    stdin.on('data', (data) => {
      let str = data.toString().slice(0, -2);
      if (str === 'exit') {
        console.log('File saved. Bye!');
        process.exit();
      }
      appendFile(filePath, `${str}\n`);
      console.log('text added');
      process.on('SIGINT', () => {
        console.log('File saved. Bye!');
        process.exit();
      });
    });
  } catch (error) {
    console.error(err.message);
  }
})();
