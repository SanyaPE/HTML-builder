const path = require('path');
const { readdir, readFile, writeFile } = require('node:fs/promises');
const pathDistFolder = path.join(__dirname, 'project-dist');
const pathStylesFolder = path.join(__dirname, 'styles');
(async () => {
  try {
    const files = (await readdir(pathStylesFolder)).filter(
      (file) => path.extname(file) == '.css',
    );
    let styleData = [];
    for (let file of files) {
      styleData.push(await readFile(path.join(pathStylesFolder, file)));
    }
    await writeFile(path.join(pathDistFolder, 'bundle.css'), styleData);
  } catch (err) {
    console.error(err);
  }
})();
