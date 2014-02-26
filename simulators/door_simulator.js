/*
 * Door simulator
 *
 */
module.exports =  function(sensor_id){
    
    var simulator = {};
    simulator.id = sensor_id;
    simulator.type = 'door';
    simulator.unit = 'opened';
    
    simulator.getValue = function(){
        return Math.round(Math.random());
    };
    
    return simulator;
};
