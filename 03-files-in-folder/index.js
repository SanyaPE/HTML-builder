const fs = require('node:fs/promises');
const path = require('path');

(async () => {
  try {
    const files = await fs.readdir(path.join(__dirname, 'secret-folder'), {
      withFileTypes: true,
    });
    for (const file of files)
      if (!file.isDirectory()) {
        const fileName = path.basename(file.name);
        const fileExt = path.extname(file.name).slice(1);
        const pathFile = path.join(__dirname, 'secret-folder', file.name);
        fs.stat(pathFile).then((res) =>
          console.log(
            `${fileName.split('.')[0]} - ${fileExt} - ${res.size}bytes`,
          ),
        );
      }
  } catch (err) {
    console.error(err);
  }
})();
