/**
 * Created by cm on 2016/9/3.
 */
const winston = require('winston');

//set logger only show error info, save logs into logs.log file.
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({level: 'debug'}),
        new (winston.transports.File)({
            filename: 'logs.log',
            level: 'info'
        })
    ]
});

module.exports = logger;