import { createServer } from 'node:http';
import path from 'node:path';
import { promises as fs } from 'node:fs';

const pathToWorkDir = path.join(process.cwd());
const newFileName = 'new_file.txt';
console.log('pathToWorkDir: ', pathToWorkDir);
const newFilePath = path.join(pathToWorkDir, 'src', 'db', newFileName);
const startedFileData = 'Hello, this is a new file!';
const appendedFileData = '\nAddition file data';
const renamedFilePath = path.join(pathToWorkDir, 'src', 'db', 'newFile.txt');

const createFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, data, 'utf8');
    console.log(`File created at ${filePath}`);
  } catch (error) {
    console.error('Error creating file:', error);
  }
};

const appendToFile = async (filePath, data) => {
  try {
    await fs.appendFile(filePath, data);
    console.log(`Data appended to file ${filePath}`);
  } catch (error) {
    console.error('Error appending to file:', error);
  }
};

const moveFile = async (oldPath, newPath) => {
  try {
    await fs.rename(oldPath, newPath);
    console.log(`Moved or renamed file to ${newPath}`);
  } catch (error) {
    console.error(`Error moving or renaming file: ${error}`);
  }
};

const removedFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log(`Removed file from ${filePath}`);
  } catch (error) {
    console.error(`Error removed file: ${error}`);
  }
};

const readDir = async (dirPath) => {
  try {
    const response = await fs.readdir(dirPath);
    console.log(`Readdir directory: ${response}`);
  } catch (error) {
    console.error(`Error to write directory: ${error}`);
  }
};

const accessDir = async (path) => {
  try {
    const response = await fs.access(path);
    console.log(`Access directory: ${response}`);
  } catch (error) {
    console.error(`Error to write directory: ${error}`);
  }
};

const main = async () => {
  await createFile(newFilePath, startedFileData);
  await appendToFile(newFilePath, appendedFileData);
  await moveFile(newFilePath, renamedFilePath);
  await readDir('src/db');
  await accessDir('src/db');

  try {
    const buffer = await fs.readFile(renamedFilePath);
    console.info('buffer: ', buffer.toString());
  } catch (error) {
    console.error('Error reading file:', error);
  }

  // await removedFile(renamedFilePath);
};

main();

const buffer = await fs.readFile('src/db/new_file.txt');

console.log('buffer: ', buffer.toString());

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
