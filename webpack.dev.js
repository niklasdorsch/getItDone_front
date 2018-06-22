const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
    entry: {
        app: ['babel-polyfill', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
            './src/index.jsx'],
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        historyApiFallback: true,
    },
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
});
