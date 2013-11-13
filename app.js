/**
 * Module dependencies.
 */

var http = require('http');
var path = require('path');
var httpclient = require('./httpclient/httpclient.js');

var DEBUG = true;

if (DEBUG) {
	var fakeSerialPort = require('./fake_serial/fake_serial.js');
	// Create FakeSerialPort

	fakeSerialPort.init({
		simulators: [
			"../simulators/temperature_1_simulator.js",
			"../simulators/temperature_2_simulator.js",
			"../simulators/temperature_3_simulator.js",
			"../simulators/temperature_4_simulator.js",
			"../simulators/temperature_5_simulator.js",
			"../simulators/door_1_simulator.js",
			"../simulators/door_2_simulator.js"
		],
		interval: 10000,
	});

	fakeSerialPort.on("data", function(data) {
		console.log("Received : " + data);

		data = data.split('=');

		jsonData = {
			sensor_id: data[0],
			value: data[1],
			model: data[2],
			unit: data[3],
			timestamp : Date.now()
		};
		console.dir(jsonData);
		httpclient.send(jsonData);


	});
} else {
	var serialport = require('serialport');
	serialport.list(function(err, ports) {
		ports.forEach(function(port) {
			console.log(port.comName);
			console.log(port.pnpId);
			console.log(port.manufacturer);
		});
	});
}
