var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
// ( declarar modelo de DB abaixo )

// router.js
var Router = require('router')

// MongoDB - inicialização
var db = function () {
    var conn = null,

        init = function (config) {
            console.log('Trying to connect to ' + config.host + '/' + config.database + ' MongoDB database');
            var options = {
                promiseLibrary: global.Promise,
                useNewUrlParser: true,
                useUnifiedTopology: true
            };

            var connString = `mongodb://${config.host}/${config.database}`;
            mongoose.connect(connString, options);
            conn = mongoose.connection;
            conn.on('error', console.error.bind(console, 'connection error:'));
            conn.once('open', function() {
                console.log('db connection open');
            });
            return conn;
        },

        close = function() {
            if (conn) {
                conn.close(function () {
                    console.log('Mongoose default connection disconnected through app termination');
                    process.exit(0);
                });
            }
        }

    return {
        init:  init,
        close: close
    };

}();

db.init({
    "host": "mongodb",
    "database": "appdb"
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', Router);

module.exports = app;