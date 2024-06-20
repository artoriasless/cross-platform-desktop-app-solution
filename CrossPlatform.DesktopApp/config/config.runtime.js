const path = require('path');

const pkg = require('../package.json');

module.exports = {
  icon: path.join(__dirname, '../resources/logo.png'),
  name: pkg.productName || pkg.name,
  description: pkg.description,
  author: pkg.author.name,
  email: pkg.author.email,
  // 其他配置，可能会通过远程下发，或者本地轮询获取
};
