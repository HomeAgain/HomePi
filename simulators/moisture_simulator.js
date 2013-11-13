/*
 * Moisture simulator
 *
 */

exports.id = "MOISTURE_1";

exports.getValue = function(){
	return Math.round((60 + 5 * Math.random())*100)/100;
};

exports.type = 'humidity';
exports.unit = 'humidity.%perL';