const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server/lib/Server');

const config = require('./webpack.config');

const PORT = 3000;
const serveOptions = {
  hot: true,
  port: PORT,
  open: false,
  allowedHosts: 'all',
};
const compiler = webpack({
  ...config,
  mode: 'development',
});
const server = new webpackDevServer(serveOptions, compiler);

server.startCallback(() => {
  console.info();
  console.info(`dev server listening on ${PORT}`);
  console.info();
});
