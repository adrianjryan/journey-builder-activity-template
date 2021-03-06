'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var util = require('util');
const request = require('request');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
    console.log("Activity: Edit");
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    console.log(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    console.log("Activity: Save");
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    console.log(req);
    res.send(200, 'Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {
    console.log("Activity: Execute");
    // example on how to decode JWT
    JWT(req.body, process.env.jwtSecret, (err, decoded) => {

        // verification error -> unauthorized request
        if (err) {
            console.error(err);
            return res.status(401).end();
        }
        console.log("------ABC--------");
        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            
            // decoded in arguments
            var decodedArgs = decoded.inArguments[0];
            
            logData(req);

            //-- OK SO this is what get called whne this bugger is executed in the Journey

            var options = {
                uri: 'https://www.googleapis.com/urlshortener/v1/url',
                method: 'POST',
                json: {
                    "longUrl": "http://www.google.com/"
                }
            };


            console.log("------123AAA--------");


            request(options, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                console.log(body.id) // Print the shortened url.
              } else
                console.log(error)
            });

            // request.post({
            //   headers: {'content-type' : 'application/json'},
            //   url:     'http://httpbin.org/post',
            //   body:   { 'name':'vABCD' }
            // }, function(error, response, body){
            //   console.log(body);
            // });


            console.log("------123--------");
            // This is a returmn of positive when sh's done.
            res.send(200, 'Execute');
        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
        }
    });
};


/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
    console.log("Activity: Publish");
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    console.log(req);
    res.send(200, 'Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
    console.log("Activity: Validate");
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    console.log(req);
    res.send(200, 'Validate');
};