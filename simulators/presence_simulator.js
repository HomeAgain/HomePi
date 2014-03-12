/*
 * Presence simulator
 *
 */
module.exports =  function(sensor_id){
    
    var simulator = {};
    simulator.id = sensor_id;
    simulator.type = 'presence';
    simulator.unit = 'present';
    
    simulator.getValue = function(){
        return Math.round(Math.random());
    };
    
    return simulator;
};
