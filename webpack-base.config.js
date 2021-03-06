import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin'
import Config from 'webpack-config';

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, 'src/index.html'),
  filename: "index.html",
  inject: "body"
});

module.exports = new Config().merge({
  context: path.resolve(__dirname, 'src'),
  entry: './main.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 8080,
      historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel-loader'
      },
      { test: /\.css/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      },
      {
        exclude: path.resolve(__dirname, 'node_modules'),
        test: /\.s?css$/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: './asset/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    HTMLWebpackPluginConfig
  ]
});
