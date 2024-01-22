const path = require('path');
const fs = require('fs');
const {
  readdir,
  readFile,
  writeFile,
  mkdir,
  copyFile,
} = require('node:fs/promises');
const pathHTML = path.join(__dirname, 'template.html');
const pathComponents = path.join(__dirname, 'components');
const pathIndex = path.join(__dirname, 'project-dist', 'index.html');
const pathDistFolder = path.join(__dirname, 'project-dist');
const pathStylesFolder = path.join(__dirname, 'styles');
const pathAssets = path.join(__dirname, 'assets');
const pathNewAssets = path.join(__dirname, 'project-dist', 'assets');
(async () => {
  try {
    await mkdir(pathDistFolder, { recursive: true });
    createFileIndex();
    createStyle();
    await mkdir(pathNewAssets, { recursive: true });
    copyAssets();
  } catch (err) {
    console.error(err.message);
  }
})();

async function createFileIndex() {
  try {
    const filesComponents = await readdir(pathComponents);
    let tempHTML = await readFile(pathHTML, 'utf-8');
    for (file of filesComponents) {
      let tagName = path.basename(file, path.extname(file));
      let regExp = new RegExp(`{{${tagName}}}`);
      let contentFile = await readFile(
        path.join(pathComponents, file),
        'utf-8',
      );
      tempHTML = tempHTML.replace(regExp, contentFile);
      fs.createWriteStream(pathIndex).write(tempHTML);
      fs.createWriteStream(pathIndex).end();
    }
  } catch (err) {
    console.error(err.message);
  }
}
async function createStyle() {
  try {
    const files = (await readdir(pathStylesFolder)).filter(
      (file) => path.extname(file) == '.css',
    );
    let styleData = [];
    for (let file of files) {
      styleData.push(await readFile(path.join(pathStylesFolder, file)));
    }
    await writeFile(path.join(pathDistFolder, 'style.css'), styleData);
  } catch (err) {
    console.error(err.message);
  }
}

async function copyAssets() {
  try {
    const files = await readdir(pathAssets, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) {
        copyFolder(file.name);
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}
async function copyFolder(folder) {
  try {
    const pathNewFolder = path.join(pathNewAssets, `${folder}`);
    const pathFolder = path.join(pathAssets, `${folder}`);
    await mkdir(pathNewFolder, { recursive: true });
    const files = await readdir(pathFolder);
    for (const file of files) {
      await copyFile(
        path.join(pathFolder, file),
        path.join(pathNewFolder, file),
      );
    }
  } catch (err) {
    console.error(err.message);
  }
}
