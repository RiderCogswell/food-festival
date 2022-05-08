const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
// const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  entry: {
    app: './assets/js/script.js',
    events: './assets/js/events.js',
    schedule: './assets/js/schedule.js',
    tickets: './assets/js/tickets.js'
  },
  output: {
    path: path.join(__dirname + '/dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jpg$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              // file-loader defaultly loads files as ES5 modules, which will incorrectly form paths to images (most likely) so we set es modules to false
              esModule: false,
              // and add a key-value pair
              name(file) {
                return '[path][name].[ext]'
              },
              // replaces the '../' in the required assignment URL with 'assets'
              publicPath(url) {
                return url.replace('../', '/assets/')
              }
            }
          },
          {
            // image optimizer loader
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    })
  ],
  mode: 'development'
};

module.exports = config;