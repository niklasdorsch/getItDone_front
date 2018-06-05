const express = require('express');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const https = require('https');
const config = require('./webpack.dev.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

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
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
}));

app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        return res.end();
    });
});

const server = https.createServer(options, app).listen(3000, () => {
    console.log('server started at port 3000');
});

return server;

