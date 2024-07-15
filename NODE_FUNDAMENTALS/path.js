import path from 'path';

// console.log(import.meta.url);

//Get the directory name of the current module
const  dirname = path.dirname(import.meta.url);
// console.log(dirname);

// console.log(path.join(dirname, '..', 'pasta1', 'pasta2', 'ficheiro.js'));

console.log(path.resolve('pasta1', 'pasta2', 'ficheiro.js'));
