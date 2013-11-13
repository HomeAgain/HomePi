/*
 * Temperature simulator
 *
 */

module.exports =  function(sensor_id){
    
    var simulator = {};

    simulator.id = sensor_id;
    simulator.type = 'temperature';
    simulator.unit = 'temperature.celsius';
    
    simulator.getValue = function(){
        return Math.round((20 + 5 * Math.random())*100)/100;
    };

    return simulator;
};