import path = require('path');

const baseDir = process.cwd();
const isDev = process.env.NODE_ENV === 'development';
const mainWindowUrl = isDev ? 'http://localhost:3000/home.html' : path.join(baseDir, 'render-process/home.html');

export default mainWindowUrl;
