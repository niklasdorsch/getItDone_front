const express = require('express');
const webpack = require('webpack');
const fs = require('fs');
const https = require('https');
const config = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");

const app = express();
const compiler = webpack(config);


const options = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt'),
    requestCert: false,
    rejectUnauthorized: false,
};

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler, {
    publicPath: config.output.publicPath,
}));

const server = https.createServer(options, app).listen(3000, () => {
    console.log('server started at port 3000');
});

return server;

