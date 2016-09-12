/**
 * Created by cm on 2016/9/2.
 */
var express = require('express');
var dbController = require('../dboperation/dbcontroller.js')
var logger = require("../logSystem/logger");

const success = 200;
const failure = 400;
/**
 * send response with status
 *
 * @response response from db
 * @status success or failure like 200, 400
 * @content json data
 */
var sendJsonResponse = function (response, status, content) {
    response.status(status);
    response.json(content || {});
};

//init router
var app = express();
app.set('port', process.env.PORT || 80);

//allow CROS
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//set router
app.route('/')
    .get(function (req, res) {
        res.send({message:'Welcome to home page!'});
    })
    .post(function (req, res) {
        res.send({message:'This is home page!'});
    });

//get json data from mongodb
app.route('/json').get(function (request, response) {
    try {
        dbController.findAllBooks(function (error, books) {
            if (error) return handleError(error);
            logger.info('find all books successfully');
            sendJsonResponse(response, success, books);
        });
    }
    catch (e) {
        sendJsonResponse(response, failure);
    }
});

//illegal query
app.route('*').get(function (request, response) {
    response.end("404!");
});

//start server
app.listen(app.get('port'));

module.exports = app;