const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;


const webpack = require("webpack")
const path = require("path");

module.exports = {
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist",
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
              name (file) {
                return '[path][name].[ext]'
              },
              // replaces the '../' in the required assignment URL with 'assets'
              publicPath: function(url) {
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
    $: "jquery",
    jQuery: "jquery"
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: "static",
  })
  ],
  mode: "development"
};