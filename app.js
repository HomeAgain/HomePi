/**
 * Module dependencies.
 */

var http = require('http');
var path = require('path');
var httpClient = require('./httpclient/httpclient.js');

/**
 *
 * Change here if you use custom value for the HomeAgainApi
 *
 */
httpClient.init({
	hostname: '127.0.0.1',
    port: 4000
});
// Simulators
var TemperatureSimulator = require('./simulators/temperature_simulator.js');
var DoorSimulator = require('./simulators/door_simulator.js');
var MoistureSimulator = require('./simulators/moisture_simulator.js');


var DEBUG = true;

var hub_id = "HUB_1";


if (DEBUG) {
	var fakeSerialPort = require('./fake_serial/fake_serial.js');
	// Create FakeSerialPort
	fakeSerialPort.init({
		simulators: [
			TemperatureSimulator("TEMP_1"),
			TemperatureSimulator("TEMP_2"),
			TemperatureSimulator("TEMP_3"),
			//TemperatureSimulator("TEMP_4"),
			//TemperatureSimulator("TEMP_5"),

			DoorSimulator("DOOR_1"),
			DoorSimulator("DOOR_2"),
			DoorSimulator("DOOR_3"),

			MoistureSimulator("MOISTURE_1"),
			MoistureSimulator("MOISTURE_2"),
			MoistureSimulator("MOISTURE_3"),

		],
		interval: 10000,
	});

	fakeSerialPort.on("data", function(data) {
		console.log("Received : " + data);

		data = data.split('=');

		jsonData = {
			hub_id : hub_id,
			sensor_id: data[0],
			value: data[1],
			modelName: data[2],
			unitName: data[3],
			timestamp : Date.now()
		};
		httpClient.send(jsonData);


	});
} else {
	var serialport = require("serialport");
	var SerialPort = serialport.SerialPort
	var serialPort = new SerialPort("/dev/tty.usbmodem1411", {
  		baudrate: 9600,
  		parser: serialport.parsers.readline("\n")
	});
	
	serialPort.on("open", function(){
		serialPort.on("data", function(data) {
		console.log("Received : " + data);

		data = data.split('=');

		jsonData = {
			hub_id : hub_id,
			sensor_id: data[0],
			value: data[2],
			model: data[1].split('.')[0],
			unit: data[1],
			created_on : Date.now()
		};
		httpClient.send(jsonData);


	});
	});
	
}
