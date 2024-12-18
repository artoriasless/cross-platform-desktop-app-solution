const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 添加一个入口
const entry = {
  home: path.resolve(__dirname, './render-process/home.tsx'),
  appLayout: path.resolve(__dirname, './render-process/app-layout.tsx'),
};

const createHtmlWebpackPluginList = () => {
  const list = [];

  const keyList = Object.keys(entry);
  for (const key of keyList) {
    list.push(
      new HtmlWebpackPlugin({
        chunks: [key],
        filename: `${key}.html`,
        template: path.join(__dirname, './index.html'),
      })
    );
  }

  return list;
};

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, '../render-process'),
    filename: chunkData => {
      return `${chunkData.chunk.name}/[name].js`;
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__dirname, '../.babelrc'),
            },
          },
          {
            loader: 'ts-loader',
            options: { configFile: path.resolve(__dirname, '../tsconfig.render.json') },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(less|css)/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets',
            },
          },
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), ...createHtmlWebpackPluginList()],
};
