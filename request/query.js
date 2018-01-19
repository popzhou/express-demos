var http = require('http');
var async = require('async');
var common = require('./common');

function func1(callback) {
    var payloadData = {
        payload: {
            chaincode_id: "transfer",
            args: ["query", "e"]
        }
    }
    common.Encipher(payloadData, callback)
}
function func2(arg1, callback) {
    common.Query(arg1, callback)
}
function func3(arg1, callback) {
    common.Decipher(arg1, callback)
}

var start = Date.now();

var times = 200;
for (let index = 1; index <= times; index++) {
    console.log(index);
    async.waterfall([
        func1,
        func2,
        func3,
    ], function (err, result) {
        console.log(index + " : " +Buffer.from(result).toString());
        if (index == times && result) {
            var interval = Date.now() - start;
            console.log("total interval:" + interval);
        }
    });
}