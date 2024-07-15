import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(dirname);

//Create a new directory
fs.mkdirSync(path.resolve(dirname, 'pasta1'));
