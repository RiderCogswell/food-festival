const webpack = require('webpack');
const path = require('path');

// webpack NEEDS three properties entry, output, and mode
module.exports = {
    // entry
    entry: './assets/js/script.js',
    // output
    output: {
        // best practice to put your bundled code into a folder named 'dist' short for distribution
        path: path.join(__dirname + '/dist'),
        filename: 'main.bundle.js'
    },
    // devtool: 'eval-cheap-source-map',
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ],
    // mode - could be production, development, etc.
    mode: 'development'
};