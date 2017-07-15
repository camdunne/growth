import { resolve, join } from 'path';

module.exports = () => ({
// <<<<<<< HEAD
  entry: './client/client.jsx',
  output: {
    path: resolve('public/build'),
// =======
//   entry: resolve(__dirname, './client/client.jsx'),
//   output: {
//     path: resolve(__dirname, './public/build'),
// >>>>>>> refactor(auth): ejs login/signup pages
    filename: 'bundle.js',
    publicPath: '/public/build/',
    pathinfo: true,
  },
  devtool: 'source-map',
  watch: true,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'],
    modules: [
      join(__dirname, 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['stage-2'],
          plugins: ['transform-decorators-legacy'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
});
