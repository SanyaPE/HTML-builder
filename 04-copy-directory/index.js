const fs = require('node:fs/promises');
const path = require('path');
const pathNewFolder = path.join(__dirname, 'files-copy');
const pathFolder = path.join(__dirname, 'files');

(async () => {
  try {
    await fs.rm(pathNewFolder, { force: true, recursive: true });
    await fs.mkdir(pathNewFolder, { recursive: true });
    const files = await fs.readdir(pathFolder);
    for (const file of files) {
      await fs.copyFile(
        path.join(pathFolder, file),
        path.join(pathNewFolder, file),
      );
    }
  } catch (err) {
    console.error(err.message);
  }
})();
