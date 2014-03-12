/*
 * Moisture simulator
 *
 */
module.exports =  function(sensor_id){
    
    var simulator = {};

    simulator.id = sensor_id;
    simulator.type = 'moisture';
    simulator.unit = '%perL';
    
    simulator.getValue = function(){
            return Math.round((60 + 5 * Math.random())*100)/100;
    };
    
    return simulator;
};  
