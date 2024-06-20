const path = require('path');

const pkg = require('../package.json');

module.exports = {
  // 从 pkg 中获取限定的 node 版本
  nodeVersion: pkg.engines.node.replace(/((^[^\d]*)|([^\d]*$))/g, ''),
  productName: pkg.productName || pkg.name,
  npmRebuild: false,
  asar: true,
  asarUnpack: [
    "dotnet-dll",
    "config",
    "main.js"
  ],
  directories: {
    output: path.join(__dirname, '../dist'),
  },
  mac: {
    icon: path.join(__dirname, '../resources/icon-mac/app.icns'),
    category: 'public.app-category.developer-tools',
    target: [
      'zip',
      'dmg',
    ],
  },
  dmg: {
    icon: path.join(__dirname, '../resources/icon-mac/app.icns'),
  },
  win: {
    icon: path.join(__dirname, '../resources/icon-win/app.ico'),
    requestedExecutionLevel: 'asInvoker',
  },
  nsis: {
    shortcutName: pkg.productName || pkg.name,
  },
  linux: {
    icon: path.join(__dirname, '../resources/icon-linux'),
    target: {
      target: 'deb',
      arch: ['x64', 'arm64'],
    },
    artifactName: '${productName}-${version}-${arch}.${ext}',
  },
  external: {
    nsis: {
      installDir: 'D:\\Program Files\\CrossPlatform.DesktopApp',
    }
  }
};
