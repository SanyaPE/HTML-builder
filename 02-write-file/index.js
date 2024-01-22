const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');

stdout.write("enter text or press 'ctrl+C' to exit and save\n");
stdin.on('data', (data) => {
  let str = data.toString().slice(0, -2);
  if (str === 'exit') {
    console.log('"File saved. Bye!');
    process.exit();
  }
  fs.appendFile(filePath, `${str}\n`, (err) => {
    if (err) {
      throw err;
    }
    console.log('text added');
    process.on('SIGINT', () => {
      console.log('"File saved. Bye!');
      process.exit();
    });
  });
});
