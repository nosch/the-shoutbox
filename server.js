/**
 * The Shoutbox
 * Application server
 */
var express = require('express');
var config = require('./config.js');

// Application
var application = express();

// Middleware: static content
application.set('port', process.env.PORT || config.server.port);
application.use(express.static(__dirname + '/' + config.app.dir));
application.use(express.bodyParser());
application.use(express.logger('dev')); //options: default, short, tiny, dev
application.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
}));

// Server
application.listen(application.get('port'), function () {
    'use strict';

    console.log(
        'Application server listening on port %s',
        application.get('port')
    );
});
