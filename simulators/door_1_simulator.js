/*
 * Temperature simulator
 *
 */

exports.id = "DOOR_1";

exports.getValue = function(){
	return Math.round(Math.random());
}
exports.type = 'door';
exports.unit = 'door.opened';