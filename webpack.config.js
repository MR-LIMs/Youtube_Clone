const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, 'assets', 'js', 'main.js'); // __dirname은 nodejs에 전역 변수
const OUTPUT_DIR = path.join(__dirname, 'static'); // static이라는 폴더로 보내라

const config = {
  devtool: 'source-map',
  entry: ['@babel/polyfill', ENTRY_FILE],
  mode: MODE, // development, production 차이?
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(scss)$/,
        // sass -> css -> 다루는 방법? -> 추출
        use: [
          {
            // css를 추출한다.
            loader: MiniCssExtractPlugin.loader,
          },
          {
            // css의 text를 가져와준다.
            loader: 'css-loader',
          },
          {
            // 특정 plugins를 css에 대해 실행시켜주고
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins() {
                  return [autoprefixer({ browsers: 'cover 99.5%' })];
                },
              },
            },
          },
          {
            // sass를 css로 바꿔준다.
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    // filename: '[name].[format]',
    filename: '[name].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};

module.exports = config;
