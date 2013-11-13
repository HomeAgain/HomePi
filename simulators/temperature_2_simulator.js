/*
 * Temperature simulator
 *
 */

exports.id = "TEMP_2";

exports.getValue = function(){
	return Math.round((20 + 5 * Math.random())*100)/100;
}
exports.type = 'temperature';
exports.unit = 'temperature.celsius';