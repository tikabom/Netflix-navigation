var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: "./js/index.js",
  plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          handlebarsLoader: {}
        }
      })
  ],
  module: {
    rules: [
      { test: /\.hbs$/, loader: 'handlebars-loader' },
      {
        test: /\.css$/,
        loaders: ['style-loader','css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader'
       }
    ]
  },
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
  }
};
